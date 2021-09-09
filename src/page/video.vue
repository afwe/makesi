<template>
    <div class="mainContainer">
        <div class="title">
            {{videoName}}
        </div>
        <div class="videoLayer">
            <div class="mask" v-show="showMask==true">
                <div class="layerNest">
                <div class='btnLayer'></div>
                </div>
            </div>
            <video id="example_video_1" class="video-js vjs-default-skin" controls preload="none" width="1600" height="900">
                <source id="videoSrc" src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4">
            </video>
        </div>
        <!--<div class="videoBody">
            </div>
            <figure>
                <figcaption>视频案例</figcaption>
                <div class="palyer">
                    <video id="playwindow" src=""></video>
                    <div class="controls">
                        <a href="#" class="switch  icon-play"></a>
                        <div class="progress">
                            <div class="curr-progress"></div>
                        </div>
                        <div class="time">
                            <span class="curr-time">00:00:00</span>/<span class="total-time">00:00:00</span>
                        </div>
                        <a href="#" class="extend  icon-resize-full"></a>
                    </div>
                </div>
            </figure>
        </div>
        -->
        <div class="discussNav">
            点击进入讨论区
        </div>
        
    </div>
</template>
<script>
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import {getPartByID} from '../fetch/video';
import {logVisit, logTime, get_time_status, logPick, get_pick_status} from '../fetch/status';
export default {
    data(){
        return{
            courseID: 3,
            videoID: 3,
            treeData: {},
            edge: [],
            videoName: "",
            videoID: "",
            showMask: false,
            clock: "",
            /*treeData:{
                id: 0,
                url: "http://www.w3school.com.cn/i/movie.mp4",
                name: "根节点",
                videoID: "",
                children: [
                    {
                        id: 1,
                        url: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
                        name: "选项1",
                        videoID: "",
                        children: [

                        ]
                    },
                    {
                        id: 2,
                        url: "http://vjs.zencdn.net/v/oceans.mp4",
                        name: "选项2",
                        videoID: "",
                        children: [

                        ]
                    }
                ]
            }*/
        }
    },
    mounted(){
        let statusResponse;
        
        this.courseID = this.$route.query.id;
        this.videoID = this.$route.query.vid;
        /*logVisit({
            courseId: this.courseID,
            videoId: this.videoID
        }).then(data => {
            console.log(data);
        });*/
        this.clock = setInterval(() => {
            logTime({
                videoId: this.videoID,
                courseId: this.courseID,
                mtime: 5000,
            }).then(data => {
                console.log(data);
            });
            /*get_time_status({
                videoId: this.videoID,
                courseId: this.courseID
            }).then(data => {
                console.log(data);
            });*/
            get_pick_status({videoId: 7,courseId:5}).then(data=>{
                console.log(data)
            })
        }, 5000);
        this.render();
        this.buildTreeData();
        let self = this;
        let options = {
            controls : true,      
                height:630, 
                width:1120,
        }
        var player = videojs('example_video_1', options, function onPlayerReady() {
            videojs.log('播放器已经准备好了!');
            let video = document.getElementById('videoSrc');
            video.src = self.treeData.url;
            // In this context, `this` is the player that was created by Video.js.<br>  // 注意，这个地方的上下文， `this` 指向的是Video.js的实例对像player
            this.play();
            let videoBody = this;
            // How about an event listener?<br>  // 如何使用事件监听？
            this.on('ended', function() {
                if(self.treeData.children != undefined && self.treeData.children != []){
                    self.treeData.children.forEach(element => {
                        let newButton = document.createElement("button");
                        newButton.className = 'choice';
                        newButton.style.background="rgba(255, 0, 0, 0.5)";
                        newButton.style.color="yellow";
                        newButton.style.height="50px";
                        newButton.style.width="200px";
                        newButton.innerText = element.name;
                        newButton.data = element;
                        
                        newButton.onclick = function(){
                            logPick({
                                courseId: self.courseID,
                                videoId: this.data.videoID,
                            }).then(data => {
                                console.log('!');
                                console.log(data);
                            })
                            self.treeData = this.data;
                            video.src = self.treeData.url;
                            console.log(video.src);
                            self.showMask = false;
                            videoBody.play();
                            let btnArray = Array.from(document.getElementsByClassName('choice'));
                            console.log(btnArray);
                            btnArray.forEach(
                                btn => {
                                    document.querySelector('.btnLayer').removeChild(btn);
                                }
                            )
                        };
                        document.querySelector('.btnLayer').appendChild(newButton);
                    });
                    self.showMask = true;
                }
                else{
                    self.$message({
                        message: "恭喜你完成了视频学习",
                        type: "success"
                    })
                }
            });
        });
    },
    beforeDestroy(){
        clearInterval(this.clock);
    },
    methods:{
        doLogVisit(){

        },
        doLogPick(){

        },
        doLogTime(){

        },
        connectEdge(node){
            let self = this;
            this.getVideoByID(node.videoID).then(url =>{
                console.log(url);
                node.url = url;
                this.edge.forEach(
                    Edge => {
                        if(Edge.fatherID == node.id){
                            if(node.children == undefined) node.children = [];
                            if(Edge.childID != undefined)
                            node.children.push({
                                id: Edge.childID,
                                videoID: Edge.childVideoID,
                                name: Edge.name
                                } 
                            );
                        }
                    }
                )
                if(node.children != undefined && node.children != []){
                    node.children.forEach(
                        next => {
                            this.connectEdge(next);
                        }
                    )
                }
                if(node.id == 0){
                    let  video=document.querySelector('video');
                    video.src =this.treeData.url;
                    console.log(video.src);
                }
            });
        },
        buildTreeData: function(){
            let Data = {};
            let idVideoIDMap = new Map();
            this.edge.forEach(
                Edge => {
                    idVideoIDMap.set(Edge.fatherID, Edge.fatherVideoID);
                    idVideoIDMap.set(Edge.childID, Edge.childVideoID);
                }
            )
            this.edge.forEach(
                Edge => {
                    idVideoIDMap.delete(Edge.childID);
                }
            )
            idVideoIDMap.forEach(
                (value, key) => {
                    Data.id = key;
                    Data.videoID = value;
                }
            )
            this.connectEdge(Data);
            this.treeData = Data;
        },
        getVideoByID: async function(id){
            console.log(id);
            let response = await getPartByID({
                courseID: this.courseID,
                videoID:id
                });
                console.log(response);
            if(response.code == 200){
                return response.data;
            }
            /*else{
                this.$message({
                    type :'error',
                    message: '视频url获取失败'
                    }
                )
            }*/
        },
        render: function(){
            this.edge = JSON.parse(localStorage.getItem('edge'));
            this.edge = JSON.parse(this.edge);
        }
    }
}
</script>

<style scoped>
.choice{
    opacity: 10;
    outline: none;
}
.videoBody{
    width: 1000px;
    height: 600px;
    background-color: aqua;
}
figcaption{
    text-align: center;
    line-height: 150px;
    font-family: "Microsoft Yahei";
    font-size:24px;
}

/* 播放器*/
.palyer{
    width: 720px;
    height: 360px;
    margin:10px auto;
    border: 1px solid #000;
    background: url(../assets/logo.png) center no-repeat #000;
    background-size:auto 100%;
    position: relative;
    border-radius: 20px;

}

.palyer video{
    height:100%;
    display: block;
    margin:0 auto;
    /*display: none;*/
}

/* 控制条*/

.controls{
    width: 700px;
    height:40px;
    background-color: rgba(255, 255, 0, 0.3);
    position: absolute;
    bottom:10px;
    left:10px;
    border-radius: 10px;
}
/*开关*/
.switch{
    position: absolute;
    width: 20px;
    height: 20px;
    left:10px;
    top:10px;

    text-align: center;
    line-height: 20px;
    color:yellow;

}
/*进度条*/
.progress{
    width: 432px;
    height: 10px;
    position: absolute;
    background-color: rgba(255,255,255,0.4);
    left:40px;
    top:15px;
    border-radius: 4px;
    overflow: hidden;
}
/* 当前进度*/
.curr-progress{
    width: 0%;
    height: 10px;
    background-color: #fff;
}
/* 时间模块*/
.time{
    width: 120px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    color:#fff;
    position: absolute;
    left:510px;
    top:10px;
    font-size:12px;

}
/*全屏*/
.extend{
    position: absolute;
    width: 20px;
    height: 20px;

    right:20px;
    top:10px;

    text-align: center;
    line-height: 20px;
    color:yellow;
}
.icon-play{
    background: url(../assets/logo.png);
}
.icon-resize-full{
    background: url(../assets/logo.png);
}
.mask{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1005;
}
.layerNest{
    height: 50%;
    width: 100%;
    margin-top: 20%;
}
.btnLayer{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    justify-content: space-around;
}
.videoLayer{
    position: relative;
    width: 800px;
    height: 600px;
}
.video-js{
    width: 100%;
    height: 100%;
    object-fit: fill;
}
</style>