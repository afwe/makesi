<template>
    <div class="mainContainer">
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
}
</style>