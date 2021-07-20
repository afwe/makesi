<template>
    <div class="mainContainer">
        <div v-if="!courseID">
            <div class="course-list">
                <ol class="course-content">
                    <span class="title">课程列表</span>
                    <li>
                        <div class="course" v-for="(item,index) in courses" @click="toCourse(item.id)">
                            {{item.name}}
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
        </div>
        <div v-if="!!courseID">
            <div class="courseTitle">
                {{courseName}}
            </div>
            <div class="course">
                <span>课程简介</span>
                <div>{{courseDesc}}</div>
            </div>
            <div class="videoNav">
                <span @click="toVideo(courseID)">点击进入课程视频</span>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'

export default {
    data(){
        return{
            courseID: "1",
            courseName: "test",
            courseDesc: "test",
            courses: [],
            totCourse: 0
        }
    },
    created(){
        this.courseID = "";
        if(this.$route.query.id != "undefined"){
            this.courseID = this.$route.query.id;
        }
    },
    methods:{
        getCourses: async function(){

        },
        toCourse: async function(){

        },
        toVideo: async function(id){
            this.$router.push({
                path: `/videoes/?id=${id}`
            });
        },
        render:async function(){
            
        }
    }
}
</script>