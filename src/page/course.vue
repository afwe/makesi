<template>
    <div class="mainContainer">
        <!--
        <div class="left">
            <div class='dang'>
            </div>
            <div class='btnNest'>
                <el-button @click.native="joinCourse()" class="btn">加入课程</el-button>
                <el-button @click.native="toVideo(courseID)" class="btn">课程视频</el-button>
            </div>
        </div>
        <div class="right">
            <div class="courseTitle">
                {{courseName}}
            </div>
            <div class="course">
                <span>课程简介</span>
                <div class='introNest'>{{courseIntro}}</div>
            </div>
        </div>
        -->
        <div class="crusol-div">
            <el-carousel
            :interval="7500"
            trigger="click"
            >
            <el-carousel-item v-for="(item,index) in carousels" :key="index">
                <img
                class="carouselImg"
                :src="carousels[index].url"
                :alt="carousels[index].title"
                :title="carousels[index].title"
                style="height:100%; width:100%;" 
                />
            </el-carousel-item>
            </el-carousel>
        </div>

        <div class="class-classify">
            课程分类
        </div>
        <div class="buttonContainer-div">
        <div class="sizhengclass-p">
            思政课程:
        </div>
        <div class="buttonNest-div">
            <button class="classifyButton-button pointer" v-for="(item,index) in sizhengCoursesClassify">
                {{item}}
            </button>
        </div>
        </div>
        <div class="buttonContainer-div">
        <div class="classsizheng-p">
            课程思政:
        </div>
        <div class="buttonNest-div">
            <button class="classifyButton-button pointer" v-for="(item,index) in kechengsizhengClassify">
                {{item}}
            </button>
        </div>
        </div>
        <div class="classList-p">
            课程列表
        </div>

        <div class="classContainer-div ">
    
            <div class="classDiv-div1 pointer">
                <div class="faceImg-img" :style="background">
                </div>
                <div class="className-p">
                    中国近代史
                </div>
                <div class="schoolName-p">
                    北京大学
                </div>
                <div class="joins-p">
                    114514人参加
                </div>
                <div class="into-p">
                    北大名师精讲"中国近代史"
                </div>
            </div>
            <div class="classDiv-div2 pointer" @click="">
                <div class="faceImg-img" :style="background">
                </div>
                <div class="className-p">
                    中国近代史
                </div>
                <div class="schoolName-p">
                    北京大学
                </div>
                <div class="joins-p">
                    114514人参加
                </div>
                <div class="into-p">
                    北大名师精讲"中国近代史"
                </div>
            </div>
            <div class="classDiv-div3 pointer" @click="">
                <div class="faceImg-img" :style="background">
                </div>
                <div class="className-p">
                    中国近代史
                </div>
                <div class="schoolName-p">
                    北京大学
                </div>
                <div class="joins-p">
                    114514人参加
                </div>
                <div class="into-p">
                    北大名师精讲"中国近代史"
                </div>
            </div>
            <div class="classDiv-div4" @click="">
                <div class="faceImg-img" :style="background">
                </div>
                <div class="className-p">
                    中国近代史
                </div>
                <div class="schoolName-p">
                    北京大学
                </div>
                <div class="joins-p">
                    114514人参加
                </div>
                <div class="into-p">
                    北大名师精讲"中国近代史"
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
import { join_course , get_course_by_id} from '../fetch/course'
import {get_all_courses} from '../fetch/course'
export default {
    data(){
        return{
            sizhengCoursesClassify: ['思想道德修养与法律基础','中国近代史纲要','马克思主义基本原理概述','毛泽东思想和中国特色社会主义理论体系概论'],
            kechengsizhengClassify: ['计算机','外语','理学','艺术设计','法学'],
            courseID: "1",
            courseName: "test",
            courseIntro: "test",
            courses: [],
            totCourse: 0,
            coursePage: 0,
            carousels: [
                {
                    url: require('../assets/cr1.jpg'),
                    alt: 'test',
                    title: 'test'
                },
                {
                    url: require('../assets/cr2.jpg'),
                    alt: 'test1',
                    title: 'test1'
                }
            ]
        }
    },
    mounted(){/*
        this.courseID = "";
        if(this.$route.query.id != "undefined"){
            this.courseID = this.$route.query.id;
        }
        
        this.render().then(
            (data) => {
                if(data){
                    this.courseName = data.data.courseName;
                    this.courseIntro = data.data.courseIntro;
                }
            }
        )*/
        this.getCourses().then(
            (data) => {
                if(data){
                    console.log(data);
                    this.courses = data.data;
                }
        })
    },
    methods:{
        joinCourse: async function(){
            console.log(typeof(parseInt(this.courseID)))
            let response = await join_course(parseInt(this.courseID));
            console.log(response)
        },
        getCourses: async function(){
            let response;
            response = await get_course_by_id(this.courseID);
            if(response.code == 200){
                console.log(response);
            } else{
                this.$message({
                    message: '获取课程失败',
                    type: 'error'
                })
            }
        },
        toVideo: async function(id){
            this.$router.push({
                path: `/videoes/?id=${id}`
            });
        },
        render:async function(){
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
    }
}
</script>
<style scoped>
.mainContainer{margin:auto;
width:1400px;
height:3645px;
margin-top:36px;
display:flex;
flex-flow:column;
}.crusol-div{margin-left:262px;
width:875px;
height:291px;
}.class-classify{margin-left:262px;
margin-top:43px;
line-height:37px;
color:rgba(16,16,16,100);
font-size:26px;
text-align:left;
font-family:SourceHanSansSC-light;
}.buttonContainer-div{margin-top:18px;
margin-left:262px;
display:flex;
flex-flow:row;
}.buttonNest-div{display:flex;
flex-flow:row;
flex-wrap:wrap;
margin-top:-15px;
}.sizhengclass-p{line-height:28px;
min-width:101px;
color:rgba(16,16,16,100);
font-size:20px;
text-align:left;
font-family:SourceHanSansSC-regular;
}.classsizheng-p{line-height:28px;
min-width:101px;
color:rgba(16,16,16,100);
font-size:20px;
text-align:left;
font-family:SourceHanSansSC-regular;
}.classifyButton-button{height:38px;
margin-left:20px;
margin-top:15px;
min-width:107px;
line-height:20px;
border-radius:48px;
background-color:rgba(255,255,255,100);
color:rgba(117,117,117,100);
font-size:13px;
text-align:center;
font-family:Roboto;
}.classList-p{margin-left:262px;
margin-top:48px;
line-height:37px;
color:rgba(16,16,16,100);
font-size:26px;
text-align:left;
font-family:SourceHanSansSC-light;
}.classContainer-div{margin-top:23px;
margin-left:262px;
display:flex;
flex-flow:row;
}.classDiv-div1{width:202px;
height:232px;
display:flex;
flex-flow:column;
border-radius:18px;
background-color:#ffffff;
}.faceImg-img{width:202px;
height:115px;
background-color:black;
border-radius:20px 20px 0px 0px;
background:no-repeat center top;
background-size:100% 100%;
}.className-p{margin-left:8px;
margin-top:8px;
font-size:11px;
line-height:17px;
color:rgba(16,16,16,100);
text-align:left;
}.schoolName-p{margin-left:8px;
line-height:12px;
color:rgba(142,142,147,100);
font-size:8px;
text-align:left;
font-family:Source HanSansSC-light;
}.joins-p{margin-left:8px;
margin-top:33px;
line-height:15px;
color:rgba(199,199,204,100);
font-size:10px;
text-align:left;
font-family:Source HanSansSC-light;
}.into-p{margin-left:8px;
line-height:15px;
color:rgba(97,97,97,100);
font-size:10px;
text-align:left;
font-family:SourceHanSansSC-regular;
}.classDiv-div2{margin-left:20px;
width:202px;
height:232px;
display:flex;
flex-flow:column;
border-radius:18px;
background-color:#ffffff;
}.classDiv-div3{margin-left:20px;
width:202px;
height:232px;
display:flex;
flex-flow:column;
border-radius:18px;
background-color:#ffffff;
}.classDiv-div4{margin-left:20px;
width:202px;
height:232px;
display:flex;
flex-flow:column;
border-radius:18px;
background-color:#ffffff;
}
.choosen{
    line-height: 29px;
    background-color: rgba(255, 5, 47, 100);
    color: rgba(250, 250, 250, 100);
    font-size: 20px;
    text-align: center;
    font-family: Roboto;
    border: 1px solid rgba(255, 5, 47, 100);
}
.pointer{

}
.pointer:hover{
      cursor:pointer;
      /*光标呈现为指示链接的指针（一只手）*/
}
</style>