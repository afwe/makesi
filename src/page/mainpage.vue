<template>
<div class="pageContainer">
    <div class="mainPic-img" :style="mainBackground">
        <div class="mainImgMask-div">
        </div>
        <div class="proLog-p" >
            红色育人，益启幼思——儿童思政教育公益服务平台
        </div>
        <button @click="$router.push(`/course`)" class="start-button pointer">
            开启学习之旅
        </button>
    </div>

<div class="mainContainer">
    <div class="chossenClass-p">
        精选课程
    </div>
    <div class="card-carousel-wrapper">
        <div class="card-carousel--nav__left" @click="moveCarousel(-1)" :disabled="atHeadOfList"></div>
        <div class="card-carousel">
        <div class="card-carousel--overflow-container">
            <div class="card-carousel-cards" :style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}">
                <courseCard v-for="(item,index) in courses "
                    class="pointer card-carousel--card"
                    :key="index"
                    :courseID="item.courseId"
                    :courseName="item.courseName"
                    :courseIntro="item. courseIntro"
                >
                </courseCard>
            </div>
        </div>
        </div>
        <div class="card-carousel--nav__right" @click="moveCarousel(1)" :disabled="atEndOfList"></div>
    </div>
    <div class="classRanking-p">
        课程排行
    </div>
    <div class="rankingContainer-div">
        <div class="ranking-div1">
            <div class="rankingTitle-div">
                热门排行
            </div>
            <div v-for="(item,index) in courses" class="classRankingCard-div pointer" @click="toCourse(item.courseId)">
                <div class="courseRanking-p" :style="color[index]">{{index+1}}</div>
                <div class="rankingFace-img" :style="courseFace">
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
            <div v-for="(item,index) in courses" class="classRankingCard-div pointer" @click="toCourse(item.courseId)">
                <div class="courseRanking-p" :style="color[index]">{{index+1}}</div>
                <div class="rankingFace-img" :style="courseFace">
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
            <div v-for="(item,index) in courses" class="classRankingCard-div pointer" @click="toCourse(item.courseId)">
                <div class="courseRanking-p" :style="color[index]">{{index+1}}</div>
                <div class="rankingFace-img" :style="courseFace">
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

</div>
</template>
<script>
import { checkLogin_Student } from '../fetch/student_data'
import { checkLogin_Teacher } from '../fetch/teacher_data'
import {get_all_courses} from '../fetch/course'
import searchpanel from '../page/searchPanel.vue'
import courseCard from '../components/courseCard.vue'
export default {
    components:{
        courseCard
    },
    data(){
        return{
            background: {
                backgroundImage: 'url('+require('../assets/classface.png')+')'
            },
            courseFace: {
                backgroundImage: 'url(' + require('../assets/cr1.jpg') +')'
            },
            color: [
                {
                    color: '#e49492',
                },
                {
                    color: '#e7bda7',
                },
                {
                    color: '#eec589',
                }
            ],
            courses:[
            ],
            hotRanking: [],
            releaseRanking: [],
            comRanking: [],
            pagesize: 4,
            currentPage: 1,
            totCourse: 2,
            currentOffset: 0,
            windowSize: 4,
            paginationFactor: 220,
            mainBackground: {
                backgroundImage: 'url('+require('../assets/banner.png')+')',
                backgroundSize:"100% 100%"
            }
        }
    },
    mounted(){
        this.getCourses().then(
            (data) => {
                if(data){
                    console.log(data);
                    data.data.forEach(element => {
                        element.courseFace = `red-video-1305720498.cos.ap-nanjing.myqcloud.com/course_pic/${element.courseId}.jpg`
                        this.courses.push(element);
                    })
                }
        })
    },
    computed: {
        atEndOfList() {
        return this.currentOffset <= (this.paginationFactor * -1) * (this.courses.length - this.windowSize);
        },
        atHeadOfList() {
        return this.currentOffset === 0;
        },
    },
    methods:{
        moveCarousel(direction) {
            // Find a more elegant way to express the :style. consider using props to make it truly generic
            if (direction === 1 && !this.atEndOfList) {
                this.currentOffset -= this.paginationFactor;
            } else if (direction === -1 && !this.atHeadOfList) {
                this.currentOffset += this.paginationFactor;
            }
        },
        page_change(page){
            this.currentPage = page;
        },
        toCourseList: async function(){
            this.$router.push(`course`);
        },
        toCourse: async function(id){
            this.$router.push(`/courseInfo/?id=${id}`);
        },
        getCourses: async function(){
            let response = await get_all_courses();
            if(response.code == 200){
                console.log(response.data);
                return response;
            }
            return false;
        },
        
    }
}
</script>
<style scoped>
.card-carousel-wrapper {
    margin-left: -5px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0 40px;
  color: #666a73;
}

.card-carousel {
  display: flex;
  flex-flow: row;
  justify-content: center;
  width: 880px;
}
.card-carousel--overflow-container {
  overflow: hidden;
}
.card-carousel--nav__left, .card-carousel--nav__right {
  width: 15px;
  height: 15px;
  padding: 10px;
  box-sizing: border-box;
  border-top: 2px solid #42b883;
  border-right: 2px solid #42b883;
  cursor: pointer;
  margin: 0 10px;
  transition: transform 150ms linear;
}
.card-carousel--nav__left[disabled], .card-carousel--nav__right[disabled] {
  opacity: 0.2;
  border-color: black;
}
.card-carousel--nav__left {
  transform: rotate(-135deg);
}
.card-carousel--nav__left:active {
  transform: rotate(-135deg) scale(0.9);
}
.card-carousel--nav__right {
  transform: rotate(45deg);
}
.card-carousel--nav__right:active {
  transform: rotate(45deg) scale(0.9);
}

.card-carousel-cards {
    display: flex;
    flex-flow:row;
  transition: transform 150ms ease-out;
  transform: translatex(0px);
}
.card-carousel-cards .card-carousel--card {
    border-radius:19px !important;
  margin: 0 10px;
  cursor: pointer;
  box-shadow: 0 4px 15px 0 rgba(40, 44, 53, 0.06), 0 2px 2px 0 rgba(40, 44, 53, 0.08);
  background-color: #fff;
  border-radius: 4px;
  z-index: 3;
  margin-bottom: 2px;
}
.card-carousel-cards .card-carousel--card:first-child {
  margin-left: 0;
}
.card-carousel-cards .card-carousel--card:last-child {
  margin-right: 0;
}
.card-carousel-cards .card-carousel--card img {
  vertical-align: bottom;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  transition: opacity 150ms linear;
  user-select: none;
}
.card-carousel-cards .card-carousel--card img:hover {
  opacity: 0.5;
}
.card-carousel-cards .card-carousel--card--footer {
  border-top: 0;
  padding: 7px 15px;
}
.card-carousel-cards .card-carousel--card--footer p {
  padding: 3px 0;
  margin: 0;
  margin-bottom: 2px;
  font-size: 19px;
  font-weight: 500;
  color: #2c3e50;
  user-select: none;
}
.card-carousel-cards .card-carousel--card--footer p:nth-of-type(2) {
  font-size: 12px;
  font-weight: 300;
  padding: 6px;
  background: rgba(40, 44, 53, 0.06);
  display: inline-block;
  position: relative;
  margin-left: 4px;
  color: #666a73;
}
.card-carousel-cards .card-carousel--card--footer p:nth-of-type(2):before {
  content: "";
  float: left;
  position: absolute;
  top: 0;
  left: -12px;
  height: 0;
  border-color: transparent rgba(40, 44, 53, 0.06) transparent transparent;
  border-style: solid;
  border-width: 12px 12px 12px 0;
}
.card-carousel-cards .card-carousel--card--footer p:nth-of-type(2):after {
  content: "";
  position: absolute;
  top: 10px;
  left: -1px;
  float: left;
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background: white;
  box-shadow: -0px -0px 0px #004977;
}

h1 {
  font-size: 3.6em;
  font-weight: 100;
  text-align: center;
  margin-bottom: 0;
  color: #42b883;
}

.mainContainer{position:flex;
width:1400px;
height:3644px;
min-height: 2000px;
line-height:12px;
background-color:rgba(242,242,247,100);
text-align:center;
margin:auto;
}.mainPic-img{
    position: relative;
    display:flex;
flex-flow:column;
align-items:center;
left:0px;
top:0px;
width:100%;
height:581px;
line-height:12px;
background-color:rgba(0,0,0,0.49);
color:rgba(16,16,16,100);
font-size:9px;
text-align:center;
font-family:Roboto;
}
.mainImgMask-div{
    position: absolute;
    background-color: rgba(0,0,0,0.49);;
    height: 100%;
    width: 100%;
}.proLog-p{
    z-index: 100;
    margin-left:99px;
margin-top:199px;
line-height:36px;
color:rgba(255,255,255,100);
font-size:36px;
text-align:left;
font-family:SourceHanSansSC-light;
}.start-button{
    z-index: 100;
    margin-top:40px;
width:222px;
height:61px;
line-height:24px;
border-radius:42px;
background-image: linear-gradient(to right, #ff2631, #ff6557);
color:rgba(250,250,250,100);
font-size:16px;
text-align:center;
font-family:Roboto;
border:none;
}.chossenClass-p{margin-top:42px;
margin-left:261px;
line-height:36px;
width:105px;
font-size:25px;
text-align:center;
color:rgba(16,16,16,100);
}.classContainer-div{
    overflow: hidden;
margin-top:22px;
margin-left:261px;
display:flex;
flex-flow:row;
justify-content: center;
}.classRanking-p{margin-top:42px;
margin-left:261px;
line-height:36px;
color:rgba(16,16,16,100);
font-size:25px;
text-align:left;
font-family:SourceHanSansSC-light;
}.rankingContainer-div{margin-top:25px;
margin-left:261px;
display:flex;
flex-flow:row;
}.ranking-div1{display:flex;
flex-flow:column;
width:276px;
height:352px;
border-radius:17px;
background-color:#ffffff;
overflow: hidden;
}.ranking-div2{display:flex;
flex-flow:column;
margin-left:17px;
width:276px;
height:352px;
border-radius:17px;
background-color:#ffffff;
overflow: hidden;
}.ranking-div3{display:flex;
flex-flow:column;
margin-left:17px;
width:276px;
height:352px;
border-radius:17px;
background-color:#ffffff;
overflow: hidden;
}.rankingTitle-div{line-height:35px;
}.classRankingCard-div{margin-top:4px;
height:57px;
display:flex;
flex-flow:row;
}.courseRanking-p{text-align:center;
margin-left:9px;
line-height:39px;
}.rankingFace-img{margin-left:6px;
width:119px;
height:64px;
background:no-repeatcentertop;
background-size:100% 100%;
}.infoContainer-div{height:64px;
margin-left:7px;
}.courseTitle-p{margin-top:11px;
}.classJudge-p{margin-top:42px;
margin-left:261px;
line-height:36px;
color:rgba(16,16,16,100);
font-size:25px;
text-align:left;
font-family:SourceHanSansSC-light;
}.judgeContainer-div{margin-top:25px;
margin-left:261px;
width:875px;
height:362px;
line-height:12px;
border-radius:17px;
text-align:center;
background-color:#ffffff;
}.texiao{filter:hue-rotate(115deg);
}.texiao:hover{background:#21ebff;
color:#111;
box-shadow:49px#21ebff;
transition-delay:0.5s;
}.texiao::before{content:'';
position:absolute;
top:0;
left:0;
width:9px;
height:9px;
border-top:1px solid#21ebff;
border-left:1px solid#21ebff;
transition:0.5s;
transition-delay:0.5s;
}.texiao:hover::before{width:100%;
height:100%;
transition-delay:0s;
}.texiao::after{content:'';
position:absolute;
right:0;
bottom:0;
width:9px;
height:9px;
border-bottom:1px solid#21ebff;
border-right:1px solid#21ebff;
transition:0.5s;
transition-delay:0.5s;
}.texiao:hover::after{width:100%;
height:100%;
transition-delay:0s;
}.pointer{}.pointer:hover{cursor:pointer;
/*光标呈现为指示链接的指针（一只手）*/}
</style>