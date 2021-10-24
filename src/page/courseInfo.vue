<template>
<div class="mainContainer">
    <breadCrumb class="bread-div">
    </breadCrumb>
    <div class="classInfo-div">
        <div class="classFace-img" :style="background">
        </div>
        <div class="infoCard-div">
            <div class="classTitle-p">
                {{courseName}}
            </div>
            <div class="school-p">
                武汉理工大学
            </div>
            <div class="class-Info">
                {{courseIntro}}
            </div>
            <div class="buttonNest-div">
                <!--<div class="join-button pointer" @click="joinCourse()">
                    立即参加
                </div>
                <div class="jump-button pointer" @click="toCourseDetail(courseID)">
                    进入课程
                </div>-->
                <div class="join-button pointer" @click="toCourseDetail(courseID)">
                    立即参加
                </div>
            </div>
            
        </div>
    </div>
    <div class="detailContainer-div">
        <div class="selectContainer-div">
            <div class="xiangqing-div select">
                课程详情
            </div>
            <span class="select">|</span>
            <div class="pingjia-div select">
                课程评价
            </div>
        </div>
        <div class="detail-div detail" v-show="showDetail==true">
        </div>
        <div class="judge-div detail" v-show="showDetail==false">
        </div>
    </div>
</div>
</template>
<script>
import breadCrumb from '../components/breadCrumb.vue'
import { join_course , get_course_by_id} from '../fetch/course'
export default{
    components:{
        breadCrumb
    },
    data(){
        return{
            background: {
                backgroundImage: 'url('+require('../assets/cr1.jpg')+')'
            },
            courseID: "1",
            courseName: "test",
            courseIntro: "test",
            showDetail: true
        }
    },
    mounted(){
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
        )
    },
    methods:{
        joinCourse: async function(){
            console.log(typeof(parseInt(this.courseID)))
            let response = await join_course(parseInt(this.courseID));
            this.$message({
                message: response.msg,
                type: response.code == 200 ? 'success':'error'
            })
            console.log(response)
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
        toCourseDetail: async function(id){
            this.$router.push(`/courseDetail?id=${id}`);
        },
        getCourses: async function(){
            let response = await get_all_courses();
            if(response.code == 200){
                return response;
            }
            return false;
        }
    }
}
</script>
<style scoped>
.bread-div{
    margin-top: 12px;
    margin-left: 262px;
}
.mainContainer{margin: auto;
margin-top:85px;
width:1400px;
height:3645px;
min-height: 2000px;
display:flex;
flex-flow:column;
}.classInfo-div{width:1400px;
height:308px;
display:flex;
flex-flow:row;
}.classFace-img{margin-left:262px;
width:376px;
height:231px;
border-radius:18px 18px 18px 18px;
background:no-repeat center top;
background-size:100%100%;
}.infoCard-div{margin-left:43px;
display:flex;
flex-flow:column;
}.classTitle-p{line-height:28px;
color:rgba(66,66,66,100);
font-size:20px;
text-align:left;
font-family:SourceHanSansSC-medium;
}.school-p{line-height:18px;
color:rgba(158,158,158,100);
font-size:12px;
text-align:left;
font-family:SourceHanSansSC-light;
}.class-Info{margin-top:20px;
width:456px;
height:78px;
color:rgba(97,97,97,100);
font-size:12px;
text-align:justify;
font-family:SourceHanSansSC-regular;
}
.buttonNest-div{
    margin-top:36px;
    display: flex;
    flex-flow: row;
}
.join-button{
width:140px;
line-height:35px;
border-radius:35px;
background-color:red;
color:rgba(255,255,255,100);
font-size:13px;
text-align:center;
font-family:MicrosoftYahei;
}
.jump-button{
    margin-left: 20px;
width:140px;
line-height:35px;
border-radius:35px;
background-color:rgba(61,90,254,100);
color:rgba(255,255,255,100);
font-size:13px;
text-align:center;
font-family:MicrosoftYahei;
}.detailContainer-div{margin-left:262px;
margin-top:27px;
width:875px;
height:2872px;
display:flex;
flex-flow:column;
background-color:#ffffff;
}.selectContainer-div{margin-top:23px;
margin-left:16px;
display:flex;
flex-flow:row;
}.select{margin-left:16px;
font-size:17px;
line-height:25px;
}.xiangqing-div{line-height:25px;
color:rgba(61,90,254,100);
font-size:17px;
text-align:left;
font-family:SourceHanSansSC-medium;
}.pingjia-div{line-height:25px;
color:rgba(33,33,33,100);
font-size:17px;
text-align:left;
font-family:SourceHanSansSC-medium;
}
.pointer{

}
.pointer:hover{
      cursor:pointer;
      /*光标呈现为指示链接的指针（一只手）*/
}
</style>
