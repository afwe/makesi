<template>
<div class="mainContainer">
    <el-dialog title="创建课程" :visible.sync="showCreate" @close="closePanel" :modal-append-to-body="false">
        <!--<div class="editPannel" v-show="showPanel == true">
            <el-button @click="closePanel">关闭</el-button>
        </div>-->
        <el-input v-model="courseName" placeholder="课程名称"></el-input>
        <el-input v-model="courseIntro" placeholder="课程简介"></el-input>
        <el-radio-button class="createButton" v-on:click.native="createCourse()">
                创建
        </el-radio-button>
    </el-dialog>
    <el-button class="createCourse" @click="showCreate=true">
        创建课程
    </el-button>
    <el-table :data="courses" stripe border>
        <el-table-column  type="index"></el-table-column>
        <el-table-column  label="课程名称" prop="courseName"></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row.courseId)">管理课程视频</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row.courseId)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>
<script>
import edit from './edit.vue';
import {create_course, create_course_identify} from '../fetch/course';
import {get_all_courses, deleteCourseByID} from '../fetch/course'

export default {
    data(){
        return{
            editCourseID: '',
            courseIntro: "",
            courseName: "",
            courses: [],
            showCreate: false,
            isDone: true
        }
    },
    mounted(){
        this.getCourses().then(
            (data) => {
                if(data){
                    console.log(data);
                    this.courses = data.data;
                }
            }
        )
    },
    methods:{
        showPanel: function(){
            showCreate = true;
        },
        closePanel: function(){
            this.showCreate = false;
            this.getCourses().then(
                (data) => {
                    if(data){
                        console.log(data);
                        this.courses = data.data;
                    }
                }
            )
        },
        setCurCourse: function(id){
            localStorage.setItem("curCourseID", id);
        },
        handleEdit: function(coureId){
            console.log(coureId);
            this.setCurCourse(coureId);
            this.$router.push('/videoManage');
        },
        handleDelete: function(coureId){
            deleteCourseByID({courseId: coureId}).then(
                data => {
                    if(data.code == 200){
                        this.getCourses().then(
            (data) => {
                if(data){
                    console.log(data);
                    this.courses = data.data;
                }
            }
        )
                    }
                }
            )
        },
        getCourses: async function(){
            let response = await get_all_courses();
            if(response.code == 200){
                return response;
            }
            return false;
        },
        createCourse:async function(){
            if(!this.isDone) return;
            this.isDone = false;
            let response;
            response = await create_course_identify();
            if(response.code == 200){
                response = await create_course({
                    courseName: this.courseName,
                    courseIntro: this.courseIntro
                });
                console.log(response);
            }
            this.isDone = true;
            this.closePanel();
        },
        changeCoursePage: function(){

        },
    }
}
</script>
<style scoped>
.mainContainer{
    margin-top:85px;
}
</style>
