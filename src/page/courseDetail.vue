<template>
    <div class="mainContainer">
        <breadCrumb class="bread-div">
        </breadCrumb>
        <div class="contentContainer-div">
        <div class="selectContainer-div">
            <div class="courseFace-img" :style="background">
            </div>
            <div class="btnNest-div">
                <button class="selectButton-button topButton pointer" :class="{selectedColor: showMode=='notify'}" @click="showMode='notify'">
                    公告
                </button>
                <button class="selectButton-button pointer" :class="{selectedColor: showMode=='videoes'}" @click="showMode='videoes'">
                    课件
                </button>
                <button class="selectButton-button pointer">
                    测验与作业
                </button>
                <button class="selectButton-button pointer">
                    考试
                </button>
                <button class="selectButton-button bottomButton pointer">
                    讨论区
                </button>
            </div>
        </div>
        <div class="container-div">
            <div class="notification-div" v-show="showMode=='notify'">
                <div class="notiManage-div" v-show="manageMode.is == true">
                    <div class="nmTitle-p">
                        新建公告
                    </div>
                    <input class="newNotiTitle-input" placeholder="请输入标题" v-model="newTitle">
                    </input>
                    <input class="newNotiBody-input" placeholder="请输入正文" v-model="newNotice">
                    </input>
                    <button class="deleverNotiButton-button" @click="doUploadNotice()">
                        发布
                    </button>
                </div>
                <div class="notifyTitle-p">
                    公告
                </div>
                <div class="notificationContent-div" v-for="(item,index) in notifications">
                    <div class="notificationHead-div">
                        <div class="notificationTitle-p">
                            {{item.title}}
                        </div>
                        <div class="editNoti-p">
                            <span>编辑</span>
                            <span>/</span>
                            <span>删除</span>
                        </div>
                    </div>
                    <div class="notificationBody-p">
                        {{item.body}}
                    </div>
                    <div class="notiDate-p">
                        {{item.date}}
                    </div>
                    <div class="line">
                    </div>
                </div>
            </div>
            <div class="videoList-div" v-show="showMode=='videoes'">
                <div class="kejian">
                    <div class="kejian-p">
                    课件
                    </div>
                    <button class="manageButton-button" v-show="manageMode.is==true" @click="$router.push('/videoManage')">
                        管理视频
                    </button>
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
        </div>
    </div>
</template>
<script>
import { join_course , get_course_by_id} from '../fetch/course'
import { getVideoListByCourseID } from '../fetch/video'
import breadCrumb from '../components/breadCrumb.vue'
import {getAllNotice,uploadNotice} from '../fetch/notice'
import App from '../App.vue'
export default {
    inject:{
        manageMode: {
            default:()=>{}
        }
    },
    components:{
        breadCrumb,
        App
    },
    data(){
        return{
            backgroundN: {
                backgroundImage: 'url('+require('../assets/not.png')+')'
            },
            background: {
                backgroundImage: 'url('+require('../assets/cr1.jpg')+')'
            },
            courseName: "test",
            courseIntro: "test",
            showMode: 'notify',
            courseID: 3,
            totVideo: 4,
            videoPage: 1,
            videoes: [
                {
                    id: 1,
                    title: 2
                }
            ],
            chapter: [

            ],
            notifications:[{
                title:'test',
                body: 'test',
                date:'2021/9/11 13:00'
            },
            {
                title:'test',
                body: 'test',
                date:'2021/9/11 13:00'
            },
            {
                title:'test',
                body: 'test',
                date:'2021/9/11 13:00'
            },
            {
                title:'test',
                body: 'test',
                date:'2021/9/11 13:00'
            }],
            monitor: true,
            newNotice: ''
        }
    },
    mounted(){
        //this.monitor = localStorage.getItem('monitor');
        console.log(this.manageMode);
        setInterval(()=>{
            console.log(this.manageMode.is)
        },1000)
        this.courseID = "";
        if(this.$route.query.id != "undefined"){
            this.courseID = this.$route.query.id;
            localStorage.setItem("curCourseID", this.courseID);
        }
        
        this.renderc().then(
            (data) => {
                if(data){
                    this.courseName = data.data.courseName;
                    this.courseIntro = data.data.courseIntro;
                }
            }
        ),
        this.render();
    },
    methods:{
        getNoticeList: async function(){
            let response = await getAllNotice({
                courseId: this.courseID
            })
            if(response.code==200){
                this.notifications = response.data
            }
            else {
                this.$message({
                    message:'获取公告失败',
                    type:'error'
                })
            }
             
        },
        doUpLoadNotice: async function(){
            let response = await uploadNotice({
                courseId: this.courseID,
                detail: this.newNotice,
                title: this.newTitle
            })
            if(response.code==200) {
                this.$message({
                    message:'发布公告成功',
                    type: 'success'
                })
            }
            else{
                this.$message({
                    message: '发布公告失败',
                    type: 'error'
                })
            }
        },
        handleCommand(command){
            console.log(command)
            this.toVideo(command);
        },
        joinCourse: async function(){
            console.log(typeof(parseInt(this.courseID)))
            let response = await join_course(parseInt(this.courseID));
            console.log(response)
        },
        renderc:async function(){
            let response = await get_course_by_id(this.courseID);
            console.log(response)
            if(response.code == 200){
                
                return response;
            }
            return false;
        },
        toCourse: async function(id){
            this.$router.push(`course/?id=${id}`);
        },
        getCourses: async function(){
            let response = await get_all_courses();
            if(response.code == 200){
                return response;
            }
            return false;
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
        }
    }
}
</script>
<style scoped>
.kejian{
    display: flex;
    flex-flow: row;
}
.kejian-p{margin-top:23px;
margin-left:21px;
line-height:27px;
color:rgba(16,16,16,100);
font-size:18px;
text-align:left;
font-family:SourceHanSansSC-medium;
}.manageButton-button{margin-top:23px;
margin-left:487px;
width:76px;
line-height:27px;
border-radius:4px;
background-color:rgba(255,5,47,100);
color:rgba(255,255,255,100);
font-size:10px;
text-align:center;
font-family:MicrosoftYahei;
}
.notiManage-div{margin-top:26px;
margin-left:21px;
width:601px;
display:flex;
flex-flow:column;
}.nmTitle-p{width:75px;
line-height:27px;
color:rgba(16,16,16,100);
font-size:18px;
text-align:left;
font-family:SourceHanSansSC-bold;
}.newNotiTitle-input{margin-top:14px;
width:601px;
height:26px;
border-radius:2px;
color:rgba(189,189,189,100);
font-size:8px;
text-align:left;
font-family:MicrosoftYahei;
border:0px solid rgba(224,224,224,100);
}.newNotiBody-input{margin-top:5px;
width:601px;
height:76px;
line-height:12px;
border-radius:2px;
color:rgba(189,189,189,100);
font-size:8px;
text-align:left;
font-family:MicrosoftYahei;
border:0px solid rgba(224,224,224,100);
}.deleverNotiButton-button{margin-left:auto;
margin-top:14px;
width:76px;
height:27px;
border-radius:4px;
background-color:rgba(255,5,47,100);
color:rgba(255,255,255,100);
font-size:10px;
text-align:center;
font-family:MicrosoftYahei;
}
.line{width:601px;
height:0px;
border-top:solid rgba(158,158,158,100) 0px;
}.notifyTitle-p{margin-top:23px;
margin-left:21px;
line-height:27px;
color:rgba(16,16,16,100);
font-size:18px;
text-align:left;
font-family:SourceHanSansSC-regular;
}.notificationContent-div{margin-left:21px;
height:55px;
width:601px;
margin-top:11px;
display:flex;
flex-flow:column;
}.notificationHead-div{display:flex;
flex-flow:row;
}.notificationTitle-p{line-height:18px;
color:rgba(97,97,97,100);
font-size:13px;
text-align:left;
font-family:SourceHanSansSC-regular;
}.notificationBody-p{margin-top:5px;
line-height:15px;
color:rgba(158,158,158,100);
font-size:10px;
text-align:left;
font-family:SourceHanSansSC-regular;
}.editNoti-p{margin-left:auto;
line-height:13px;
color:rgba(199,199,204,100);
font-size:8px;
font-family:SourceHanSansSC-regular;
}.deleteNoti-p{margin-left:auto;
line-height:13px;
color:rgba(199,199,204,100);
font-size:8px;
font-family:SourceHanSansSC-regular;
}.notiDate-p{margin-left:auto;
line-height:13px;
color:rgba(158,158,158,100);
font-size:8px;
font-family:SourceHanSansSC-regular;
}
button{
    outline:none;
    border:none;
}
.videoList{
    background-color: #f7f7f7;
    height: 100%;
    text-align: center;
    width: 100%;
}
.title{
    background-color: #f7f7f7;
    border-radius: 8px;

    height: 40px;
    margin-left: 10px;
    text-align: center;
    width: 600px;
}
.videoItem{
}
.mainContainer{
    margin: auto;
    margin-top:85px;
display:flex;
width:1400px;
height:3645px;
min-height: 2000px;
flex-flow:column;
}
.contentContainer-div{
    display: flex;
    flex-flow: row;
}
.bread-div{
    margin-top: 12px;
    margin-left: 262px;
}
.selectContainer-div{margin-left:262px;
display:flex;
flex-flow:column;
}.courseFace-img{width:217px;
height:116px;
border-radius:8px;
background-color:rgba(250,250,250,100);
border-radius:18px18px0px0px;
background:no-repeatcentertop;
background-size:100%100%;
}.btnNest-div{display:flex;
flex-flow:column;
}.selectButton-button{width:218px;
height:41px;
line-height:20px;
background-color:rgba(255,255,255,100);
color:rgba(66,66,66,100);
font-size:13px;
text-align:center;
font-family:Roboto;
border:0px solid rgba(238,238,238,100);
}.topButton{border-radius:8px 8px 0px 0px;
}.bottomButton{border-radius:0px 0px 8px 8px;
}.container-div{margin-left:43px;
display:flex;
flex-flow:column;
}.notification-div{width:645px;
min-height:228px;
line-height:14px;
border-radius:8px;
color:rgba(16,16,16,100);
background-color:#ffffff;
font-size:10px;
text-align:center;
font-family:Roboto;
padding-bottom:35px;
}.videoList-div{width:645px;
min-height: 300px;
border-radius:8px;
background-color:rgba(255,255,255,100);
}
.selectedColor{
    background-color: rgba(255, 5, 47, 100);
    color: rgba(250, 250, 250, 100);
}
.pointer{

}
.pointer:hover{
      cursor:pointer;
      /*光标呈现为指示链接的指针（一只手）*/
}
.collapsTitle-div{margin-top:6px;
margin-left:10px;
width:613px;
height:20px;
border-radius:3px;
background-color:rgba(245,245,245,100);
color:rgba(65,80,88,100);
font-size:12px;
text-align:center;
font-family:MicrosoftYahei;
}.videoItem-div{width:573px;
line-height:20px;
text-align:center;
}
</style>
