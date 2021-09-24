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
            <button class="classifyButton-button" v-for="(item,index) in sizhengCoursesClassify">
                {{item}}
            </button>
        </div>
        </div>
        <div class="buttonContainer-div">
        <div class="classsizheng-p">
            课程思政:
        </div>
        <div class="buttonNest-div">
            <button class="classifyButton-button" v-for="(item,index) in kechengsizhengClassify">
                {{item}}
            </button>
        </div>
        </div>
        <div class="classList-p">
            课程列表
        </div>

        <div class="classContainer-div">
            <div class="classCard-div" v-for="(index,item) in courses">
                <div class="classFace-img">
                </div>
                <div class="classInfo-div">
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
<style scoped>/*
.mainContainer{
    display: flex;
    flex-flow: row;
}
.left{
    height: 500px;
    width: 500px;
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
}
.right{
    height: 400px;
    width: 500px;
}
.btnNest{
    display: flex;
    flex-flow: row;
}
.btn{
    width: 100px;
    height: 50px;
    background-color: #fe0000;
    color: #ffff01; 
}
.courseTitle{
    font-size: 100px;
}
.introNest{
    width: 500px;
    height: 400px;
    background-color: #fe0000;
    color: #ffff01;
}
.dang{
    height: 300px;
    width: 500px;
    background:#fff url('../assets/cr1.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: 0 0 25px aquamarine;
}
*/
/*
.crusol-div{
    left: 360px;
    top: 167px;
    width: 1200px;
    height: 400px;
}
.class-classify{
    left: 360px;
    top: 627px;
    width: 144px;
    height: 52px;
    color: rgba(16, 16, 16, 100);
    font-size: 36px;
    text-align: left;
    font-family: SourceHanSansSC-light;
}
.sizhengclass-p{
    left: 360px;
    top: 706px;
    width: 140px;
    height: 41px;
    color: rgba(16, 16, 16, 100);
    font-size: 28px;
    text-align: left;
    font-family: SourceHanSansSC-regular;
}
.classsizheng-p{
    left: 360px;
    top: 854px;
    width: 140px;
    height: 41px;
    color: rgba(16, 16, 16, 100);
    font-size: 28px;
    text-align: left;
    font-family: SourceHanSansSC-regular;
}
.classList-p{
    left: 360px;
    top: 963px;
    width: 144px;
    height: 52px;
    color: rgba(16, 16, 16, 100);
    font-size: 36px;
    text-align: left;
    font-family: SourceHanSansSC-light;
}
.classCard-div{
    left: 360px;
    top: 963px;
    width: 144px;
    height: 52px;
    color: rgba(16, 16, 16, 100);
    font-size: 36px;
    text-align: left;
    font-family: SourceHanSansSC-light;
}
.classFace-img{
    left: 360px;
    top: 1042px;
    width: 279px;
    height: 158px;
    border-radius: 26px 26px 0px 0px;
}
.classInfo-div{
    left: 360px;
    top: 1042px;
    width: 279px;
    height: 158px;
    border-radius: 26px 26px 0px 0px;
}*/
.mainContainer{
    margin: auto;
    margin-top: 50px;
    display: flex;
    flex-flow: column;
}
.crusol-div{
    margin-left: 360px;
    width: 1200px;
    height: 400px;
}
.class-classify{
    margin-left: 360px;
    margin-top: 60px;
    line-height: 52px;
    color: rgba(16, 16, 16, 100);
    font-size: 36px;
    text-align: left;
    font-family: SourceHanSansSC-light;
}
.buttonContainer-div{
    margin-top: 27px;
    margin-left: 360px;
    display: flex;
    flex-flow: row;
}
.buttonNest-div{
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    margin-top: -21px;
}
.sizhengclass-p{
    line-height: 41px;
    min-width: 140px;
    color: rgba(16, 16, 16, 100);
    font-size: 28px;
    text-align: left;
    font-family: SourceHanSansSC-regular;
}
.classsizheng-p{
    line-height: 41px;
    min-width: 140px;
    color: rgba(16, 16, 16, 100);
    font-size: 28px;
    text-align: left;
    font-family: SourceHanSansSC-regular;
}
.classifyButton-button{
    height: 54px;
    margin-left: 28px;
    margin-top: 21px;
    min-width: 148px;
    line-height: 29px;
    border-radius: 68px;
    background-color: rgba(255, 255, 255, 100);
    color: rgba(117, 117, 117, 100);
    font-size: 20px;
    text-align: center;
    font-family: Roboto;
}
.classList-p{
    margin-left: 360px;
    margin-top: 68px;
    line-height: 52px;
    color: rgba(16, 16, 16, 100);
    font-size: 36px;
    text-align: left;
    font-family: SourceHanSansSC-light;
}
</style>