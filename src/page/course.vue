<template>
    <div class="mainContainer">
        <div class="left">
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
                <div>{{courseIntro}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import { join_course , get_course_by_id} from '../fetch/course'

export default {
    data(){
        return{
            courseID: "1",
            courseName: "test",
            courseIntro: "test",
            courses: [],
            totCourse: 0,
            coursePage: 0,
        }
    },
    created(){
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
        toCourse: async function(){

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
        }
    }
}
</script>
<style scoped>
.mainContainer{
    display: flex;
    flex-flow: row;
}
.left{
    height: 300px;
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
</style>