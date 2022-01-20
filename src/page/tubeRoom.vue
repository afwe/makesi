<template>
    <div class="mainContainer">
        <div class="videoContainer">
            <video id="tubeVideo" autoplay playsinline></video>
        </div>
    </div>
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
            },
            socket: '',
            localStream: '',
            localVideo: '',
            pc: '',
            peerConnectionCollection:{},
            state: '',
        }
    },
    mounted(){
        this.roomId = this.$route.params.roomId;
        console.log(this.roomId);
        this.socket = this.SocketIO(this.socketApi);
        this.socket.emit('join',this.roomId);
        this.localVideo = document.querySelector('video#tubeVideo');
        this.connectSignalServer();
        console.log('join');
    },
    beforeDestroy(){
        this.disconnectSignalServer();
    },
    methods:{
        handleErr(err){
            console.error(err);
        },
        sendMessage(id,data){
            if(this.socket){
                this.socket.emit('message',id,data);
            }
        },
        getOffer(desc,masterId){
            this.pc.setLocalDescription(desc);
            this.sendMessage(masterId,desc);
        },
        call(masterId){
            if(this.pc){
                console.log('pcsurvive');
                let options = {
                    offerToReceiveAudio: 1,
                    offerToReceiveVideo: 1
                }
                if(this.state == 'slave'){
                    console.log('offercall');
                    this.pc.createOffer(options)
                    .then((desc)=>{
                        this.getOffer(desc,masterId);
                    })
                    .catch(this.handleErr)
                }
            }
        },

        getMediaStream(stream){
            this.localStream = stream;
            this.localVideo.srcObject = this.localStream;
        },
        masterGetOffer(id,message){
            console.log(id);
            this.peerConnectionCollection[id].setRemoteDescription(new RTCSessionDescription(message));
            this.peerConnectionCollection[id].createAnswer().then((answer)=>{this.getAnswer(answer,id)}).catch(this.handleErr);
        },
        masterAddCandidate(id,candidate){
            this.peerConnectionCollection[id].addIceCandidate(candidate).catch();
        },
        getAnswer(desc,id){
            this.peerConnectionCollection[id].setLocalDescription(desc);
            this.sendMessage(id,desc);
        },
        initSocketIO(){
            this.socket.on('newSlave',(id)=>{
                this.masterCreatePeerConnection(id);
            })
            this.socket.on('masterId',(id)=>{
                console.log(id);
                this.call(id);
            })
            this.socket.on('identify',(identity, id)=>{
                console.log(identity);
                this.state = identity;
                if(identity == "master") {
                    this.socket.on('message',(id, message)=>{
                        console.log(message);
                        if(message){
                            if(message.type==='offer'){
                                console.log("offermessage");
                                this.masterGetOffer(id,message);
                            }else if (message.type==='candidate'){
                                console.log("candidatemessage");
                                let candidate = new RTCIceCandidate({
                                    sdpMLineIndex: message.label,
                                    candidate: message.candidate
                                })
                                this.masterAddCandidate(id,candidate);
                            }
                        }
                    })
                }
                this.start();
            })

            this.socket.on('leave',(roomId, id)=>{
                this.socket.disconnected();
                closePeerConnection();
                this.closeLocal();
                console.log('leave');
            })

            this.socket.emit('join',this.roomId);
            return;
        },
        slaveCreatePeerConnection(){
            if(!this.pc){
                this.pc = new RTCPeerConnection(this.pcConfig);
                this.pc.onicecandidate = (e)=> {
                    if(e.candidate){
                        console.log("candidateOn");
                        this.sendMessage('slave',{
                            type:'candidate',
                            label: e.candidate.sdpMLineIndex,
                            id: e.candidate.sdpMid,
                            candidate: e.candidate.candidate
                        })
                    }
                }
                this.pc.ontrack = (e)=>{
                    console.log("track");
                    console.log(e);
                    this.localVideo.srcObject = e.streams[0];
                }
                this.socket.on('message',(id, message)=>{
                    console.log(message);
                    if(message){
                        if(message.type==='answer'){ 
                            console.log("answermessage");
                            this.pc.setRemoteDescription(new RTCSessionDescription(message));
                        }else if (message.type==='candidate'){
                            console.log("candidatemessage");
                            let candidate = new RTCIceCandidate({
                                sdpMLineIndex: message.label,
                                candidate: message.candidate
                            })
                            this.pc.addIceCandidate(candidate).catch();
                        }
                    }
                })
            }
        },

        masterCreatePeerConnection(slaveId){
            console.log(slaveId);
            this.peerConnectionCollection[slaveId] = new RTCPeerConnection(this.pcConfig);
            this.pc = this.peerConnectionCollection[slaveId];
            this.pc.onicecandidate = (e)=> {
                if(e.candidate){
                    console.log("candidateOn");
                    this.sendMessage('slave',{
                        type:'candidate',
                        label: e.candidate.sdpMLineIndex,
                        id: e.candidate.sdpMid,
                        candidate: e.candidate.candidate
                    })
                }
            }
            if(this.localStream){
                this.localStream.getTracks().forEach((track)=>{
                    this.pc.addTrack(track,this.localStream);
                })
            }
            this.socket.emit('slaveStart',slaveId);
        },

        closePeerConnection(){
            if(this.pc){
                this.pc.close();
                this.pc=null;
            }
        },


        closeLocal(){
            if(this.localStream&&this.localStream.getTracks()){
                this.localStream.getTracks().forEach((track)=>{
                    track.stop();
                })
                this.localStream=null;
            }
        },

        connectSignalServer(){
            this.initSocketIO();
        },
        disconnectSignalServer(){
            if(this.socket){
                this.socket.emit('leave',this.roomId);
            }
        },
        start(){
            if(this.state=='master'){
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
                    navigator.mediaDevices.getUserMedia(constraints).then(this.getMediaStream).catch(this.handleErr);
                }
            } else if(this.state=='slave'){
                this.slaveCreatePeerConnection();
                this.socket.emit('ready',this.roomId);
            }
        }

    },
}
</script>
<style scoped>
.mainContainer{
    margin: auto;
    margin-top:85px;
    display:flex;
    width:1400px;
    height:3645px;
    min-height: 2000px;
    flex-flow:column;
}
#tubeVideo{
    width:800px;
    height:600px;
    margin:auto;
}
</style>