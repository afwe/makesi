<template>
    <div class="mainContainer">
        <div class="title">
            {{videoName}}
        </div>
        <div class="videoBody-div">
            <div class="videoLayer">
                <div class="mask" v-show="showMask==true">
                    <div class="layerNest">
                    <div class='btnLayer'></div>
                    </div>
                </div>
                <video id="example_video_1" class="video-js vjs-default-skin" controls preload="auto" data-setup='{}' width="985" height="554">
                    <source id="videoSrc" src="http://vjs.zencdn.net/v/oceans.mp4" type="application/x-mpegURL">
                </video>
            </div>
            <div class="videoes">
            </div>
        </div>
        <div class="funcBar-div">
        </div>
        <div class="discussion">
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
import {get_all_courses} from '../fetch/course'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import {getPartByID} from '../fetch/video';
import {logVisit, logTime, get_time_status, logPick, get_pick_status} from '../fetch/status';
import { getVideoListByCourseID } from '../fetch/video'
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
            courses: []
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
        this.courseID = this.$route.query.id;
        this.render();
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
                height:554, 
                width:985,
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
                            player.src({
                                src:self.treeData.url
                            });
                            console.log("change");
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
                toVideo: async function(id){
            console.log()
            let index = 0;

            this.videoes.forEach(
                (element, i) => {
                    if(element.id == id) index = i; 
                }
            )
            console.log(id);
            console.log(index);
            localStorage.setItem("edge", JSON.stringify(this.videoes[index].edge));
            this.$router.push({
                path: `/video/?id=${this.courseID}&vid=${this.videoes[index].id}`
            });
        },
        render: async function(){
            let response = await getVideoListByCourseID(this.courseID);
            console.log(response);
            if(response.code == 200){
                let array = response.data;
                array.forEach(element => {
                    let videoName = element.title;
                    let sPosition = videoName.indexOf('S');
                    element.c = parseInt(videoName.substr(1,sPosition - 1));
                    element.s = parseInt(videoName.substr(sPosition + 1, videoName.length - sPosition));
                    element.title = "第" + element.c + "章" + "第" + element.s + "节";
                });
                let Sort = function(val1, val2){
                    if(val1.c == val2.c) return val1.s - val2.s;
                    else return val1.c - val2.c;
                }
                array.sort(Sort);
                for(let i = 1; i <= array[array.length-1].c; i++){
                    this.chapter.push([]);
                }
                array.forEach(
                    element => {
                        this.chapter[element.c-1].push(element);
                    }
                )
                this.videoes = array;
            }
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
.mainContainer{
    display: flex;
    flex-flow: column;
    margin: auto;
}
.title{
    margin-top: 36px;
    margin-left: 360px;
    line-height: 35px;
    color: rgba(16, 16, 16, 100);
    font-size: 24px;
    text-align: left;
    font-family: SourceHanSansSC-medium;
}
.choice{
    opacity: 10;
    outline: none;
}
.videoBody-div{
    margin-left: 360px;
    margin-top: 12px;
    display: flex;
    flex-flow: row;
}
.videoLayer{
    width: 985px;
    height: 554px;
    background-color: aqua;
}
.videoes{
    width: 216px;
    height: 554px;
    line-height: 20px;
    background-color: rgba(66, 66, 66, 100);
    text-align: center;
}
.funcBar-div {
    margin-top: 36px;
    width: 1200px;
    height: 165px;
    line-height: 20px;
    border-radius: 26px;
    background-color: rgba(255, 255, 255, 100);
    text-align: center;
}
.disscussion{
    margin-top: 36px;
    width: 1200px;
    height: 3481px;
    line-height: 20px;
    border-radius: 26px;
    background-color: rgba(255, 255, 255, 100);
    text-align: center;
}
figcaption{
    text-align: center;
    line-height: 150px;
    font-family: "Microsoft Yahei";
    font-size:24px;
}
/*
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
}*/
/*
.videoTitle-p{
    left: 360px;
    top: 189px;
    width: 535px;
    height: 35px;
    color: rgba(16, 16, 16, 100);
    font-size: 24px;
    text-align: left;
    font-family: SourceHanSansSC-medium;
}
.video-video{
    left: 360px;
    top: 236px;
    width: 985px;
    height: 554px;
}
.videoList-div{
    left: 1345px;
    top: 236px;
    width: 216px;
    height: 554px;
    line-height: 20px;
    background-color: rgba(66, 66, 66, 100);
    text-align: center;
}
.functionNest-div{
    left: 360px;
    top: 826px;
    width: 1200px;
    height: 165px;
    line-height: 20px;
    border-radius: 26px;
    background-color: rgba(255, 255, 255, 100);
    text-align: center;
}
.disscussion-div{
    left: 360px;
    top: 1027px;
    width: 1200px;
    height: 3481px;
    line-height: 20px;
    border-radius: 26px;
    background-color: rgba(255, 255, 255, 100);
    text-align: center;
}*/
</style>