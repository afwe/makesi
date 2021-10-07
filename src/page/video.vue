<template>
 <div class="mainContainer">
        <breadCrumb class="bread-div">
        </breadCrumb>
        <div class="video-title">
            {{videoName}}
        </div>
        <div class="videoPanContainer-div">
            <div class="input_video">
                <div class="mask" v-show="showMask==true">
                    <div class="btnNest">
                        <div class='btnLayer'></div>
                    </div>
                </div>
                <video-player  class="video-player vjs-custom-skin"
                            ref="videoPlayer"
                            @ended="onPlayerEnded($event)"
                            :playsinline="true"
                            :options="playerOptions"
                ></video-player>
            </div>
            <div class="videoes">
                <div class="kejian-p">
                    视频列表
                </div>
                <el-dropdown v-for="(item,cindex) in chapter" trigger="click" @command="handleCommand">
                    <div class="el-dropdown-link btn send time-send small-hand collapsTitle-div pointer">
                        第{{cindex+1}}章
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item class="videoItem-div pointer" v-for="(item,sindex) in chapter[cindex]" :command="item.id">
                            {{item.title}}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="funcBar-div">
        </div>
        <div class="discussion">
        </div>
    </div>
</template>
<script>
import breadCrumb from '../components/breadCrumb.vue';
import {get_all_courses} from '../fetch/course'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import {getPartByID} from '../fetch/video';
import {logVisit, logTime, get_time_status, logPick, get_pick_status} from '../fetch/status';
import { getVideoListByCourseID } from '../fetch/video'
export default {
    components:{
        breadCrumb
    },
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
            courses: [],
            videoes: [
                {
                    id: 1,
                    title: 2
                }
            ],
            chapter: [

            ],
            events: ['end'],
            playerOptions : {
                playbackRates : [ 0.5, 1.0, 1.5, 2.0 ], //可选择的播放速度
                autoplay : false, //如果true,浏览器准备好时开始回放。
                muted : false, // 默认情况下将会消除任何音频。
                loop : false, // 视频一结束就重新开始。
                preload : 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language : 'zh-CN',
                width: 718,
                height: 403, // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                 // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources : [ {
                    type : "",
                    src : ''//url地址
                } ],
                poster : "", //你的封面地址
                // width: document.documentElement.clientWidth,
                notSupportedMessage : '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar : {
                    timeDivider : true,//当前时间和持续时间的分隔符
                    durationDisplay : true,//显示持续时间
                    remainingTimeDisplay : false,//是否显示剩余时间功能
                    fullscreenToggle : true  //全屏按钮
                }
            }
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
        }, 5000);
        this.renderv();
        this.buildTreeData();
        //this.loadVideo();
        this.playerOptions['sources'][0]['src'] = this.treeData.url;
        console.log("!");
        console.log(this.playerOptions['sources'][0]['src']);
    },
    beforeDestroy(){
        clearInterval(this.clock);
    },
    methods:{
        handleCommand(command){
            console.log(command)
            this.toVideo(command);
        },
        onPlayerEnded: function(){
            console.log('end');
            let self = this;
            console.log(self.treeData);
            if(self.treeData.children != undefined && self.treeData.children.length!=0){

                if(self.treeData.children.length==1&&self.treeData.children[0].name.substr(0,4)=='skip'){
                    console.log("sk");
                    self.treeData=self.treeData.children[0];
                    self.playerOptions['sources'][0]['src'] = self.treeData.url;
                    console.log(self.playerOptions['sources'][0]['src'])
                    self.$refs.videoPlayer.player.play();
                }
                else{
                    self.treeData.children.forEach(element => {
                        let newButton = document.createElement("button");
                        newButton.className = 'choice';
                        newButton.style.background="rgba(255, 0, 0, 0.5)";
                        newButton.style.color="yellow";
                        newButton.style.height="50px";
                        newButton.style.width="250px";
                        newButton.style.fontSize="15px";
                        newButton.style.lineHeight="25px";
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
                            self.showMask = false;
                            self.playerOptions['sources'][0]['src'] = self.treeData.url;
                            console.log(self.playerOptions['sources'][0]['src'])
                            self.$refs.videoPlayer.player.play();
                            let btnArray = Array.from(document.getElementsByClassName('choice'));
                            console.log(btnArray);
                            btnArray.forEach(
                                btn => {
                                    document.querySelector('.btnLayer').removeChild(btn);
                                }
                            )
                        };
                        document.querySelector('.btnLayer').appendChild(newButton);
                    })
                    self.showMask = true;
                }
            
            
            } else{
                this.$message({
                    message:'已完成视频观看',
                    type: 'success'
                })
            }
        },
        doLogVisit(){

        },
        doLogPick(){

        },
        doLogTime(){

        },
        toVideo: async function(id){
            console.log("toVideo")
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
        renderv: async function(){
            console.log("renderv")
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
            console.log("connectEdge");
            let self = this;
            this.getVideoByID(node.videoID).then(url =>{
                console.log(url);
                node.url = url;
                if(node.id==0) {
                    this.playerOptions['sources'][0]['src'] = node.url;
                    this.$refs.videoPlayer.player.play();
                }
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
            console.log("buildTree")
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
            console.log("getvideoByid")
            console.log(id);
            if(id==undefined) return undefined;
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
            console.log("render")
            this.edge = JSON.parse(localStorage.getItem('edge'));
            this.edge = JSON.parse(this.edge);
        }
    }
}
</script>

<style scoped>
.bread-div{
    margin-top: 97px;
    margin-left: 262px;
}
.videoPanContainer-div{margin-left:262px;
display:flex;
flex-flow:row;
}.input_video{width:718px;
height:403px;
background-color:aqua;
position:relative;
}.mask{position:absolute;
width:100%;
height:100%;
z-index:1005;
}.mainContainer{display:flex;
margin-top:85px;
flex-flow:column;
margin:auto;
width: 1400px;
min-height: 2000px;
}.title{margin-top:26px;
margin-left:262px;
line-height:25px;
color:rgba(16,16,16,100);
font-size:17px;
text-align:left;
font-family:SourceHanSansSC-medium;
}.videoes{width:157px;
height:403px;
line-height:14px;
background-color:rgba(66,66,66,100);
text-align:center;
display:flex;
flex-flow:column;
}.funcBar-div{margin-left:262px;
margin-top:26px;
width:875px;
height:120px;
line-height:14px;
border-radius:18px;
background-color:rgba(255,255,255,100);
text-align:center;
}.disscussion{margin-top:26px;
width:875px;
height:2538px;
line-height:14px;
border-radius:18px;
background-color:rgba(255,255,255,100);
text-align:center;
}.kejian-p{margin-left:10px;
width:46px;
height:17px;
color:rgba(250,250,250,100);
font-size:11px;
text-align:left;
font-family:SourceHanSansSC-light;
}.videoItem{background-color:#fe0000;
color:#ffff01;
}.title{background-color:#fe0000;
color:#ffff01;
}.videoList{width:157px;
min-height:218px;
display:flex;
flex-flow:column;
}.title{width:137px;
height:21px;
margin-left:10px;
margin-top:7px;
}
.collapsTitle-div{margin-top:7px;
margin-left:10px;
width:137px;
line-height:21px;
border-radius:2px;
background-color:rgba(97,97,97,100);
color:white;
font-size:12px;
text-align:center;
font-family:Roboto;
}.videoItem-div{width:117px;
line-height:21px;
text-align:center;

}
.btnLayer{
    display: flex;
    flex-flow: column;
    align-items:center;
    justify-content: end;
    
}
.btnNest{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: end;
}
.pointer{

}
.pointer:hover{
      cursor:pointer;
      /*光标呈现为指示链接的指针（一只手）*/
}
</style>