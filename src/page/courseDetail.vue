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
            <div class="notification-div" v-show="showMode=='notify'" :style="backgroundN">
            </div>
            <div class="videoList-div" v-show="showMode=='videoes'">
                <div class="kejian-p">
                    课件
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
export default {
    components:{
        breadCrumb
    },
    data(){
        return{
            backgroundN: {
                backgroundImage: 'url('+require('../assets/not.png')+')'
            },
            background: {
                backgroundImage: 'url('+require('../assets/classface2.png')+')'
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

            ]
        }
    },
    mounted(){
        this.courseID = "";
        if(this.$route.query.id != "undefined"){
            this.courseID = this.$route.query.id;
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
border:0pxsolidrgba(238,238,238,100);
}.topButton{border-radius:8px 8px 0px 0px;
}.bottomButton{border-radius:0px 0px 8px 8px;
}.container-div{margin-left:43px;
display:flex;
flex-flow:column;
}.notification-div{width:645px;
height:318px;
border-radius:8px;
background:no-repeatcentertop;
background-size:100%100%;
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
