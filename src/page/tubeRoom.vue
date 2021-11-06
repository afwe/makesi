<template>
    <video id="tubeVideo" autoplay playsinline></video>
</template>
<script>
export default {
    data(){
        return{
            roomId: '11111',
            pcConfig: {
                iceServers:[
                    {
                        urls: ["stun:afweshuaige.ltd:3478"]
                    },
                    {
                        urls: ['turn:afweshuaige.ltd:3478?transport=udp'],
                        credential: '1234',
                        username: 'afwe',
                    }
                ],
            }
        }
    },
    mounted(){
        this.$socket.emit('join', this.roomId);
        console.log('join');
    },
    methods:{
        handleErr(err){
            console.error(err);
        },
        sendMessage(id,data){
            if(socket){
                socket.emit('message',id,data);
            }
        },
        getOffer(desc,masterId){
            pc.setLocalDescription(desc);
            sendMessage(masterId,desc);
        },
        call(masterId){
            if(pc){
                console.log('pcsurvive');
                let options = {
                    offerToReceiveAudio: 1,
                    offerToReceiveVideo: 1
                }
                if(state == 'slave'){
                    console.log('offercall');
                    pc.createOffer(options)
                    .then((desc)=>{
                        getOffer(desc,masterId);
                    })
                    .catch(handleErr)
                }
            }
        },

        getMediaStream(stream){
            localStream = stream;
            localVideo.srcObject = localStream;
        },
        masterGetOffer(id,message){
            console.log(id);
            peerConnectionCollection[id].setRemoteDescription(new RTCSessionDescription(message));
            peerConnectionCollection[id].createAnswer().then((answer)=>{getAnswer(answer,id)}).catch(handleErr);
        },
        masterAddCandidate(id,candidate){
            peerConnectionCollection[id].addIceCandidate(candidate).catch();
        },
        getAnswer(desc,id){
            peerConnectionCollection[id].setLocalDescription(desc);
            sendMessage(id,desc);
        },
        initSocketIO(){

            socket.on('newSlave',(id)=>{
                masterCreatePeerConnection(id);
            })
            socket.on('masterId',(id)=>{
                console.log(id);
                call(id);
            })
            socket.on('identify',(identity, id)=>{
                console.log(identity);
                state = identity;
                socketId = id;
                if(identity == "master") {
                    socket.on('message',(id, message)=>{
                        console.log(message);
                        if(message){
                            if(message.type==='offer'){
                                console.log("offermessage");
                                masterGetOffer(id,message);
                            }else if (message.type==='candidate'){
                                console.log("candidatemessage");
                                let candidate = new RTCIceCandidate({
                                    sdpMLineIndex: message.label,
                                    candidate: message.candidate
                                })
                                masterAddCandidate(id,candidate);
                            }
                        }
                    })
                }
                start();
            })

            socket.on('leave',(roomId, id)=>{
                socket.disconnected();
                closePeerConnection();
                closeLocal();
                console.log('leave');
            })

            socket.emit('join',roomId);
            return;
        },
        slaveCreatePeerConnection(){
            if(!pc){
                pc = new RTCPeerConnection(pcConfig);
                pc.onicecandidate = (e)=> {
                    if(e.candidate){
                        console.log("candidateOn");
                        sendMessage('slave',{
                            type:'candidate',
                            label: e.candidate.sdpMLineIndex,
                            id: e.candidate.sdpMid,
                            candidate: e.candidate.candidate
                        })
                    }
                }
                pc.ontrack = (e)=>{
                    console.log("track");
                    console.log(e);
                    remoteVideo.srcObject = e.streams[0];
                }
                socket.on('message',(id, message)=>{
                    console.log(message);
                    if(message){
                        if(message.type==='answer'){ 
                            console.log("answermessage");
                            pc.setRemoteDescription(new RTCSessionDescription(message));
                        }else if (message.type==='candidate'){
                            console.log("candidatemessage");
                            let candidate = new RTCIceCandidate({
                                sdpMLineIndex: message.label,
                                candidate: message.candidate
                            })
                            pc.addIceCandidate(candidate).catch();
                        }
                    }
                })
            }
        },

        masterCreatePeerConnection(slaveId){
            console.log(slaveId);
            peerConnectionCollection[slaveId] = new RTCPeerConnection(pcConfig);
            pc = peerConnectionCollection[slaveId];
            pc.onicecandidate = (e)=> {
                if(e.candidate){
                    console.log("candidateOn");
                    sendMessage('slave',{
                        type:'candidate',
                        label: e.candidate.sdpMLineIndex,
                        id: e.candidate.sdpMid,
                        candidate: e.candidate.candidate
                    })
                }
            }
            if(localStream){
                localStream.getTracks().forEach((track)=>{
                    pc.addTrack(track,localStream);
                })
            }
            socket.emit('slaveStart',slaveId);
        },

        closePeerConnection(){
            if(pc){
                pc.close();
                pc=null;
            }
        },


        closeLocal(){
            if(localStream&&localStream.getTracks()){
                localStream.getTracks().forEach((track)=>{
                    track.stop();
                })
                localStream=null;
            }
        },

        connectSignalServer(){
            initSocketIO();
        },
        disconnectSignalServer(){
            if(socket){
                socket.emit('leave',roomId);
            }
        },
        start(){
            if(state=='master'){
                if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                    console.error("请使用新版浏览器");
                    return;
                } else {
                    let constraints = {
                        video:true,
                        audio: {
                            echoCancellation: true
                        }
                    }
                    navigator.mediaDevices.getUserMedia(constraints).then(getMediaStream).catch(handleErr);
                }
            } else if(state=='slave'){
                slaveCreatePeerConnection();
                socket.emit('ready',roomId);
            }
        }

    },
}
</script>
<style scoped>

</style>