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
        <div class="proLog-p">
            打通专业教育与思政教育紧密融合“最后一公里”
        </div>
        <button @click="toCourseList()" class="start-button">
            开启学习之旅
        </button>
    </div>


    <div class="chossenClass-p">
        精选课程
    </div>

    <div class="classContainer-div">
    
        <div class="classDiv-div1">
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
        <div class="classDiv-div2" @click="">
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
        <div class="classDiv-div3" @click="">
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
    <div class="classRanking-p">
        课程排行
    </div>
    <div class="rankingContainer-div">
        <div class="ranking-div1">
            <div class="rankingTitle-div">
                热门排行
            </div>
            <div v-for="(item,index) in courses" class="classRankingCard-div" @click="toCourse(item.courseId)">
                <div class="courseRanking-p">{{index}}</div>
                <div class="rankingFace-img">
                </div>
                <div class="infoContainer-div">
                    <div class="courseTitle-p">{{item.courseName}}</div>
                    <div class="courseJoins-p">{{item.joins}}</div>
                </div>
            </div>
        </div>
        <div class="ranking-div2">
            <div class="rankingTitle-div">
                最新排行
            </div>
            <div v-for="(item,index) in courses" class="classRankingCard-div" @click="toCourse(item.courseId)">
                <div class="courseRanking-p">{{index}}</div>
                <div class="rankingFace-img">
                </div>
                <div class="infoContainer-div">
                    <div class="courseTitle-p">{{item.courseName}}</div>
                    <div class="courseJoins-p">{{item.joins}}</div>
                </div>
            </div>
        </div>
        <div class="ranking-div3">
            <div class="rankingTitle-div">
                推荐排行
            </div>
            <div v-for="(item,index) in courses" class="classRankingCard-div" @click="toCourse(item.courseId)">
                <div class="courseRanking-p">{{index}}</div>
                <div class="rankingFace-img">
                </div>
                <div class="infoContainer-div">
                    <div class="courseTitle-p">{{item.courseName}}</div>
                    <div class="courseJoins-p">{{item.joins}}</div>
                </div>
            </div>
        </div>
    </div>

    <div class="classJudge-p">
        课程评价
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
            background: {
                backgroundImage: 'url('+require('../assets/classface.png')+')'
            },
            courses:[
                {
                    id:1,
                    name:"k1"
                },
                {
                    name:"k1"
                },
            ],
            hotRanking: [],
            releaseRanking: [],
            comRanking: [],
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
                    console.log("??");
                    console.log(data);
                    this.courses = data.data;
                }
        })
    },
    methods:{
        page_change(page){
            this.currentPage = page;
        },
        toCourseList: async function(){
            this.$router.push(`course`);
        },
        toCourse: async function(id){
            this.$router.push(`courseInfo/?id=${id}`);
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
/*
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
}*/
/*
.mainContainer{
    position: flex;
    width:1120px;
    height:2916px;
    line-height:11px;
    background-color:rgba(242,242,247,100);
    text-align:center;
    margin:auto;
}
.mainPic-img{
    display: flex;
    flex-flow: column;
    align-items: center;
    left:0px;
    top:0px;
    width:1120px;
    height:466px;
    line-height:11px;
    background-color:rgba(0,0,0,0.49);
    color:rgba(16,16,16,100);
    font-size:8px;
    text-align:center;
    font-family:Roboto;
}
.proLog-p{
    left:391px;
    margin-top:168px;
    width:370px;
    line-height: 81px;
    color:rgba(242,242,247,100);
    font-size:42px;
    text-align:center;
font-family:SourceHanSansSC-light;
}
.start-button{
    margin-top: 33px;
    width:179px;
    height:50px;
    line-height:20px;
    border-radius:35px;
    background-color:rgba(255,23,68,100);
    color:rgba(250,250,250,100);
    font-size:14px;
    text-align:center;
    font-family:Roboto;
}*/
/*
.chossenClass-p{
    margin-top:60px;
    margin-left: 360px;
    line-height: 52px;
    width: 144px;
    font-size:36px;
    text-align: center;
    color: rgba(16, 16, 16, 100);
}
.classContainer-div{
    margin-top: 34px; 
    margin-left: 360px;
    display: flex;
    flex-flow: row;
}
.classDiv-div1{
    width: 279px;
    height: 320px;
    display: flex;
    flex-flow: column;
    border-radius: 26px;
    background-color: #ffffff;
}
.faceImg-img{
    width: 279px;
    height: 158px;
    background-color: black;
    border-radius: 26px 26px 0px 0px;
    background: no-repeat center top;
    background-size:100% 100%;
}
.className-p{
    margin-left:12px;
    margin-top:13px;
    font-size: 16px;
    line-height: 24px;
    color: rgba(16, 16, 16, 100);
    text-align: left;
}
.schoolName-p{
    margin-left: 12px;
    line-height: 18px;
    color: rgba(142, 142, 147, 100);
    font-size: 12px;
    text-align: left;
    font-family: SourceHanSansSC-light;
}
.joins-p{
    margin-left: 12px;
    margin-top: 47px;
    line-height: 21px;
    color: rgba(199, 199, 204, 100);
    font-size: 14px;
    text-align: left;
    font-family: SourceHanSansSC-light;
}
.into-p{
    margin-left: 12px;
    line-height: 21px;
    color: rgba(97, 97, 97, 100);
    font-size: 14px;
    text-align: left;
    font-family: SourceHanSansSC-regular;
}
.classDiv-div2{
    margin-left: 28px;
    width: 279px;
    height: 320px;
    display: flex;
    flex-flow: column;
    border-radius: 26px;
    background-color: #ffffff;
}
.classDiv-div3{
    margin-left: 28px;
    width: 279px;
    height: 320px;
    display: flex;
    flex-flow: column;
    border-radius: 26px;
    background-color: #ffffff;
}
.classDiv-div4{
    margin-left: 28px;
    width: 279px;
    height: 320px;
    display: flex;
    flex-flow: column;
    border-radius: 26px;
    background-color: #ffffff;
}
.classRanking-p{
    margin-top: 60px;
    margin-left: 360px;
    line-height: 52px;
    color: rgba(16, 16, 16, 100);
    font-size: 36px;
    text-align: left;
    font-family: SourceHanSansSC-light;
}
.rankingContainer-div{
    margin-top:37px;
    margin-left: 360px;
    display: flex;
    flex-flow: row;

}
.ranking-div1{
    display: flex;
    flex-flow: column;
    width: 382px;
    height: 486px;
    border-radius: 26px;
    background-color: #ffffff;
}
.ranking-div2{
    display: flex;
    flex-flow: column;
    margin-left: 27px;
    width: 382px;
    height: 486px;
    border-radius: 26px;
    background-color: #ffffff;
}
.ranking-div3{
    display: flex;
    flex-flow: column;
    margin-left: 27px;
    width: 382px;
    height: 486px;
    border-radius: 26px;
    background-color: #ffffff;
}
.rankingTitle-div{
    line-height: 50px;
}
.classRankingCard-div{
    
}
.infoContainer-div{
    
}
.classJudge-p{
    margin-top: 60px;
    margin-left: 360px;
    line-height: 52px;
    color: rgba(16, 16, 16, 100);
    font-size: 36px;
    text-align: left;
    font-family: SourceHanSansSC-light;
}
.judgeContainer-div{
    margin-top: 37px;
    margin-left: 360px;
    width: 1200px;
    height: 500px;
    line-height: 20px;
    border-radius: 26px;
    text-align: center;
    background-color: #ffffff;
}*/
.mainContainer{position:flex;
width:1400px;
height:3645px;
line-height:13px;
background-color:rgba(242,242,247,100);
text-align:center;
margin:auto;
}.mainPic-img{display:flex;
flex-flow:column;
align-items:center;
left:0px;
top:0px;
width:1400px;
height:582px;
line-height:13px;
background-color:rgba(0,0,0,0.49);
color:rgba(16,16,16,100);
font-size:10px;
text-align:center;
font-family:Roboto;
}.proLog-p{margin-left:100px;
margin-top:200px;
line-height:37px;
color:rgba(255,255,255,100);
font-size:37px;
text-align:left;
font-family:SourceHanSansSC-light;
}.start-button{margin-top:41px;
width:223px;
height:62px;
line-height:25px;
border-radius:43px;
background-color:rgba(255,23,68,100);
color:rgba(250,250,250,100);
font-size:17px;
text-align:center;
font-family:Roboto;
}.chossenClass-p{margin-top:43px;
margin-left:262px;
line-height:37px;
width:105px;
font-size:26px;
text-align:center;
color:rgba(16,16,16,100);
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
}.classRanking-p{margin-top:43px;
margin-left:262px;
line-height:37px;
color:rgba(16,16,16,100);
font-size:26px;
text-align:left;
font-family:SourceHanSansSC-light;
}.rankingContainer-div{margin-top:26px;
margin-left:262px;
display:flex;
flex-flow:row;
}.ranking-div1{display:flex;
flex-flow:column;
width:277px;
height:353px;
border-radius:18px;
background-color:#ffffff;
}.ranking-div2{display:flex;
flex-flow:column;
margin-left:18px;
width:277px;
height:353px;
border-radius:18px;
background-color:#ffffff;
}.ranking-div3{display:flex;
flex-flow:column;
margin-left:18px;
width:277px;
height:353px;
border-radius:18px;
background-color:#ffffff;
}.rankingTitle-div{line-height:36px;
}
.classRankingCard-div{
    height: 65px;
    background-color: aqua;
    display: flex;
    flex-flow: row;
}
.rankingFace-img{
    width: 120px;
    height: 65px;
}
.infoContainer-div{
    height: 65px;
    background-color: aqua;
}
.classJudge-p{margin-top:43px;
margin-left:262px;
line-height:37px;
color:rgba(16,16,16,100);
font-size:26px;
text-align:left;
font-family:SourceHanSansSC-light;
}.judgeContainer-div{margin-top:26px;
margin-left:262px;
width:875px;
height:363px;
line-height:13px;
border-radius:18px;
text-align:center;
background-color:#ffffff;
}
</style>