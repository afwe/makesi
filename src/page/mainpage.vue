<template>
    <div class="mainContainer">
        <div class="course-list">
            <ol class="course-content">
                <span class="title">课程列表</span>
                <li>
                    <div class="course" v-for="(item,index) in courses" @click="toCourse(item.courseId)">
                        {{item.courseName}}
                    </div>
                </li>
            </ol>
            <div class="course-pager">
                <el-pagination
                    v-if="totCourse > 0"
                    background
                    layout="prev, pager, next"
                    :page-size="20"
                    :total="totCourse"
                    :current-page="coursePage"
                    @current-change="changeCoursePage"
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
                />
            </el-carousel-item>
            </el-carousel>
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
            coursePage: 0,
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
        changeCoursePage(page){
            this.currentCoursePage = page;
            /*获取课程*/
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
.mainContainer{
    display: flex;
    flex-flow: row;
}
.course-list{
    width:250px;
    height: 500px;
    background-color: blue;
}
.course{
    width:200px;
    height:50px;
    background-color: red;
    cursor:pointer;
}
.welcome{
    height: 500px;
    width: 500px;
    background-color: yellow;
}
</style>