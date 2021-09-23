<template>
<div class="mainContainer">
    <div class="classInfo-div">
        <div class="classFace-img">
        </div>
        <div class="classTitle-p">
        </div>
        <div class="school-p">
        </div>
        <div class="class-Info">
        </div>
        <div class="join-button">
        </div>
    </div>
    <div class="detailContainer-div">
    </div>
</div>
</template>
<script>
import { join_course , get_course_by_id} from '../fetch/course'
export default{
    data(){
        return{
            courseID: "1",
            courseName: "test",
            courseIntro: "test",
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
}
</style>
