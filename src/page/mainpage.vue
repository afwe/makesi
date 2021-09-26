<template>
<div class="mainContainer">
    <div class="mainPic-img">
        <div class="proLog-p">
            打通专业教育与思政教育紧密融合“最后一公里”
        </div>
        <button @click="toCourseList()" class="start-button pointer">
            开启学习之旅
        </button>
    </div>


    <div class="chossenClass-p">
        精选课程
    </div>

    <div class="classContainer-div">
    
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
        <div class="classDiv-div4 pointer" @click="">
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
    margin-top: 5px;
    height: 65px;
    display: flex;
    flex-flow: row;
}
.courseRanking-p{
    text-align: center;
    margin-left: 10px;
    line-height: 40px;
}
.rankingFace-img{
    margin-left: 7px;
    width: 120px;
    height: 65px;
    background:no-repeat center top;
    background-size:100% 100%;
}
.infoContainer-div{
    height: 65px;
    margin-left: 8px;
}
.courseTitle-p{
    margin-top: 12px;
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
}.texiao{
 filter: hue-rotate(115deg);
}
.texiao:hover{
  background: #21ebff;
  color: #111;
  box-shadow: 0 0 50px #21ebff;
  transition-delay: 0.5s;
}

.texiao::before{
  content: '';
  position: absolute;
  top:0;
  left: 0;
  width: 10px;
  height: 10px;
  border-top:2px solid #21ebff;
  border-left:2px solid #21ebff;
  transition: 0.5s;
  transition-delay: 0.5s;
}
.texiao:hover::before{
  width: 100%;
  height: 100%;
  transition-delay: 0s;
}
.texiao::after{
  content: '';
  position: absolute;
  right:0;
  bottom: 0;
  width: 10px;
  height: 10px;
  border-bottom:2px solid #21ebff;
  border-right:2px solid #21ebff;
  transition: 0.5s;
  transition-delay: 0.5s;
}

.texiao:hover::after{
  width: 100%;
  height: 100%;
  transition-delay: 0s;
}
.pointer{

}
.pointer:hover{
      cursor:pointer;
      /*光标呈现为指示链接的指针（一只手）*/
}
</style>