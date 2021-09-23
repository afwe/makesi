<template>
    <!--<div class="mainContainer">
        <div class="course-list">
            <div class="course-content">
                <span class="title">课程列表</span>
                <el-card class="course" v-for="(item,index) in courses.slice((currentPage-1)*pagesize,currentPage*pagesize)" @click.native="toCourse(item.courseId)">
                        {{item.courseName}}
                </el-card>
            </div>
            <div class="course-pager">
                <el-pagination
                    v-if="totCourse > 0"
                    background
                    layout="prev, pager, next"
                    :page-size="pagesize"
                    :total="courses.length"
                    :current-page="currentPage"
                    @current-change="page_change"
                />
            </div>
        </div>
        <div class="welcome">
            <span class="title">欢迎学习马克思主义</span>
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
    </div>-->
<div class="mainContainer">
    <div class="mainPic-img">
        <p class="proLog-p">
            红色育人，精准施教
        </p>
        <button onClick="toCourseList()" class="start-button">
            开启学习之旅
        </button>
    </div>


    <p class="chossenClass-p">
        精选课程
    </p>


    <div class="classDiv-div1">
        <div class="faceImg-img1">
        </div>
        <div class="classInfo-div">
        </div>
    </div>
    <div class="classDiv-div2">
        <div class="faceImg-img2">
        </div>
        <div class="classInfo-div">
        </div>
    </div>
    <div class="classDiv-div3">
        <div class="faceImg-img3">
        </div>
        <div class="classInfo-div">
        </div>
    </div>
    <div class="classDiv-div4">
        <div class="faceImg-img4">
        </div>
        <div class="classInfo-div">
        </div>
    </div>

    <div class="classRanking-p">
        课程排行
    </div>

    <div class="ranking-div1">
        <div class="rankingTitle-div">
            热门排行
        </div>
        <div v-for="(index,item) in courseList" class="classRankingCard-div">
            <div class="rankingFace-img">
            </div>
            <div class="infoContainer-div">
                <p class="courseTitle-p">{{item.title}}</p>
                <p class="courseJoins-p">{{item.joing}}</p>
            </div>
        </div>
    </div>
    <div class="ranking-div2">
        <div class="rankingTitle-div">
            最新排行
        </div>
        <div v-for="(index,item) in courseList" class="classRankingCard-div">
            <div class="rankingFace-img">
            </div>
            <div class="infoContainer-div">
                <p class="courseTitle-p">{{item.title}}</p>
                <p class="courseJoins-p">{{item.joing}}</p>
            </div>
        </div>
    </div>
    <div class="ranking-div3">
        <div class="rankingTitle-div">
            推荐排行
        </div>
        <div v-for="(index,item) in courseList" class="classRankingCard-div">
            <div class="rankingFace-img">
            </div>
            <div class="infoContainer-div">
                <p class="courseTitle-p">{{item.title}}</p>
                <p class="courseJoins-p">{{item.joing}}</p>
            </div>
        </div>
    </div>

    <div class="classJudge-p">
    </div>
    
    <div class="judgeContainer-div">
    </div>


</div>
</template>
<script>
import { checkLogin_Student } from '../fetch/student_data'
import { checkLogin_Teacher } from '../fetch/teacher_data'
import {get_all_courses} from '../fetch/course'
export default {
    data(){
        return{
            courses:[
                {
                    id:1,
                    name:"k1"
                },
                {
                    name:"k1"
                },
            ],
            pagesize: 4,
            currentPage: 1,
            totCourse: 2,
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
    mounted(){
        this.getCourses().then(
            (data) => {
                if(data){
                    console.log(data);
                    this.courses = data.data;
                }
        })
    },
    methods:{
        page_change(page){
            this.currentPage = page;
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
/*
ol{
    list-style:none;;
}
.mainContainer{
    display: flex;
    flex-flow: row;
}
.course-list{
    width:250px;
    height: 600px;
}
.course{
    margin-top: 10px;
    width:200px;
    height:100px;
    box-shadow:10px;
    border-radius: 10px;
    color: blue;
    cursor:pointer;
}
.welcome{
    margin-left: 100px;
    height: 500px;
    width: 600px;
}*/
.mainContainer{
    left: 0px;
    top: 0px;
    width: 1920px;
    height: 5000px;
    line-height: 20px;
    background-color: rgba(242, 242, 247, 100);
    text-align: center;
}
.mainPic-img{
    left: 0px;
    top: 0px;
    width: 1920px;
    height: 800px;
    line-height: 20px;
    background-color: rgba(0, 0, 0, 0.49);
    color: rgba(16, 16, 16, 100);
    font-size: 14px;
    text-align: center;
    font-family: Roboto;
}
.proLog-p{
    left: 671px;
    top: 289px;
    width: 576px;
    height: 140px;
    color: rgba(242, 242, 247, 100);
    font-size: 72px;
    text-align: left;
    font-family: SourceHanSansSC-light;
}
.start-button{
    left: 807px;
    top: 472px;
    width: 307px;
    height: 87px;
    line-height: 35px;
    border-radius: 60px;
    background-color: rgba(255, 23, 68, 100);
    color: rgba(250, 250, 250, 100);
    font-size: 24px;
    text-align: center;
    font-family: Roboto;
}
.chossenClass-p{
    left: 360px;
    top: 860px;
    width: 144px;
    height: 52px;
    color: rgba(16, 16, 16, 100);
    font-size: 36px;
    text-align: left;
    font-family: SourceHanSansSC-light;
}
.classInfo-div1{
    left: 360px;
    top: 946px;
    width: 279px;
    height: 320px;
    line-height: 20px;
    border-radius: 26px;
    text-align: center;
}
.classInfo-div2{
    left: 667px;
    top: 946px;
    width: 279px;
    height: 320px;
    line-height: 20px;
    border-radius: 26px;
    text-align: center;
}
.classInfo-div3{
    left: 974px;
    top: 946px;
    width: 279px;
    height: 320px;
    line-height: 20px;
    border-radius: 26px;
    text-align: center;
}
.classInfo-div4{
    left: 1281px;
    top: 946px;
    width: 279px;
    height: 320px;
    line-height: 20px;
    border-radius: 26px;
    text-align: center;
}
.faceImg-img1{
    left: 360px;
    top: 946px;
    width: 279px;
    height: 158px;
    border-radius: 26px 26px 0px 0px;
}
.faceImg-img2{
    left: 667px;
    top: 946px;
    width: 279px;
    height: 158px;
    border-radius: 26px 26px 0px 0px;
}
.faceImg-img3{
    left: 667px;
    top: 946px;
    width: 279px;
    height: 158px;
    border-radius: 26px 26px 0px 0px;
}
.faceImg-img3{
    left: 667px;
    top: 946px;
    width: 279px;
    height: 158px;
    border-radius: 26px 26px 0px 0px;
}
.classRanking-p{
    left: 360px;
    top: 1326px;
    width: 144px;
    height: 52px;
    color: rgba(16, 16, 16, 100);
    font-size: 36px;
    text-align: left;
    font-family: SourceHanSansSC-light;
}
.ranking-div1{
    left: 360px;
    top: 1415px;
    width: 382px;
    height: 486px;
    border-radius: 26px;
}
.ranking-div2{
    left: 769px;
    top: 1412px;
    width: 382px;
    height: 486px;
    border-radius: 26px;
}
.ranking-div3{
    left: 1178px;
    top: 1412px;
    width: 382px;
    height: 486px;
    border-radius: 26px;
}
.classJudge-p{
    left: 360px;
    top: 1961px;
    width: 144px;
    height: 52px;
    color: rgba(16, 16, 16, 100);
    font-size: 36px;
    text-align: left;
    font-family: SourceHanSansSC-light;
}
.judgeContainer-div{
    left: 360px;
    top: 2050px;
    width: 1200px;
    height: 500px;
    line-height: 20px;
    border-radius: 26px;
    text-align: center;
}
</style>