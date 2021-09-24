<template>
<div class="mainContainer">
    <div class="classInfo-div">
        <div class="classFace-img" :style="background">
        </div>
        <div class="infoCard-div">
            <div class="classTitle-p">
                中国近代史纲要
            </div>
            <div class="school-p">
                武汉理工大学
            </div>
            <div class="class-Info">
                本课程介绍C++11~20标准的程序设计方法。由网易云课堂计算机课程体系《C++程序设计》全面改版。 课件中英文对照，便于学习计算机术语。 学过C、Java或者Python，想要了解新标准C++，可以参加本课程学习。
            </div>
            <div class="join-button">
                立即参加
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
import { join_course , get_course_by_id} from '../fetch/course'
export default{
    data(){
        return{
            background: {
                backgroundImage: 'url('+require('../assets/classface2.png')+')'
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
        toCourse: async function(id){
            this.$router.push(`course/?id=${id}`);
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
/*
.classInfo-div{
    left: 0px;
    top: 117px;
    width: 1920px;
    height: 425px;
    line-height: 20px;
    text-align: center;
}
.classFace-img{
    left: 360px;
    top: 168px;
    width: 516px;
    height: 318px;
    border-radius: 26px;
}
.classTitle-p{
    left: 936px;
    top: 168px;
    width: 196px;
    height: 41px;
    color: rgba(66, 66, 66, 100);
    font-size: 28px;
    text-align: left;
    font-family: SourceHanSansSC-medium;
}
.school-p{
    left: 936px;
    top: 209px;
    width: 108px;
    height: 26px;
    color: rgba(158, 158, 158, 100);
    font-size: 18px;
    text-align: left;
    font-family: SourceHanSansSC-light;
}
.class-Info{
    left: 934px;
    top: 263px;
    width: 626px;
    height: 109px;
    color: rgba(97, 97, 97, 100);
    font-size: 18px;
    text-align: justify;
    font-family: SourceHanSansSC-regular;
}
.join-button{
    left: 936px;
    top: 422px;
    width: 192px;
    height: 48px;
    border-radius: 48px;
    background-color: rgba(61, 90, 254, 100);
    color: rgba(255, 255, 255, 100);
    font-size: 20px;
    text-align: center;
    font-family: Microsoft Yahei;
}
.detailContainer-div{
    left: 360px;
    top: 580px;
    width: 1200px;
    height: 3940px;
    line-height: 20px;
    border-radius: 26px;
    text-align: center;
}*/
.mainContainer{
    margin:0;
    display: flex;
    flex-flow: column;
}
.classInfo-div{
    width: 1920px;
    height: 425px;
    display: flex;
    flex-flow: row;
}
.classFace-img{
    margin-left: 360px;
    width: 516px;
    height: 318px;
    background-color: black;
    border-radius: 26px 26px 0px 0px;
    background: no-repeat center top;
    background-size:100% 100%;
}
.infoCard-div{
    margin-left: 60px;
    display: flex;
    flex-flow: column;
}
.classTitle-p{
    line-height: 41px;
    color: rgba(66, 66, 66, 100);
    font-size: 28px;
    text-align: left;
    font-family: SourceHanSansSC-medium;
}
.school-p{
    line-height: 26px;
    color: rgba(158, 158, 158, 100);
    font-size: 18px;
    text-align: left;
    font-family: SourceHanSansSC-light;
}
.class-Info{
    margin-top: 28px;
    width: 626px;
    height: 109px;
    color: rgba(97, 97, 97, 100);
    font-size: 18px;
    text-align: justify;
    font-family: SourceHanSansSC-regular;
}
.join-button{
    margin-top: 50px;
    width: 192px;
    line-height: 48px;
    border-radius: 48px;
    background-color: rgba(61, 90, 254, 100);
    color: rgba(255, 255, 255, 100);
    font-size: 20px;
    text-align: center;
    font-family: Microsoft Yahei;
}
.detailContainer-div{
    margin-left: 360px;
    margin-top: 38px;
    width: 1200px;
    height: 3940px;
    display: flex;
    flex-flow: column;
    background-color: #ffffff;
}
.selectContainer-div{
    margin-top: 34px;
    margin-left: 23px;
    display: flex;
    flex-flow: row;
}
.select{
    margin-left: 23px;
    font-size: 24px;
    line-height: 35px;
}
.xiangqing-div{
    line-height: 35px;
    color: rgba(61, 90, 254, 100);
    font-size: 24px;
    text-align: left;
    font-family: SourceHanSansSC-medium;
}
.pingjia-div{
    line-height: 35px;
    color: rgba(33, 33, 33, 100);
    font-size: 24px;
    text-align: left;
    font-family: SourceHanSansSC-medium;
}
</style>
