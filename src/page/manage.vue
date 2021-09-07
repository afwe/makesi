<template>
    <div class="mainContainer">
        <el-dialog title="上传视频" :visible.sync="showUpload" @close="showUpload=false" :modal-append-to-body="false">
            <upload>
            </upload>
        </el-dialog>
        
         <div class="course-list" v-show="showCourseList==true">
            <span class="title">课程列表</span>
            <br>
            <el-button class="course" v-for="(item,index) in courses" @click="setCurCourse(item.courseId)">
                {{item.courseName}}
            </el-button>
        </div>
        <el-button class="createCourse" @click="showUpload=!showUpload">
            上传视频
        </el-button>
        <el-button class="createCourse" @click="$router.push('/courseManage')">
            <span>课程管理</span>
        </el-button>
        <div class="createPanel" v-show="showCreate==true">
            <div>
                <input class="info-input" type="text" v-model="courseName" placeholder="课程名称">
            </div>
            <div>
                <input class="info-input" type="text" v-model="courseIntro" placeholder="课程简介">
            </div>
            <el-radio-button class="createButton" v-on:click.native="createCourse()">
                创建
            </el-radio-button>
            <el-radio-button class="closeButton" v-on:click.native="showCreate=false">
                关闭
            </el-radio-button>
        </div>
        <div class="totWatch">
            <span>总观看时长:</span>
            <span>{{totWatch}}</span>
        </div>
        <div class="listWatch">
            <ol class="list-content">
                <span class="title">课程观看时长</span>
                <li>
                    <div class="course" v-for="(item,index) in courses">
                        <span>{{item.name}}</span>
                        <span>:</span>
                        <span>{{item.time}}</span>
                    </div>
                </li>
            </ol>
            <div class="course-pager">
                <el-pagination background layout="prev, pager, next"
                    small
                    :page-size="2"
                    @current-change="changeCoursePage"
                    :current-page.sync="currentPage"
                    :pager-count="5"  
                    :total="courses.length">
                </el-pagination>
            </div>
        </div>
        <div id="myChart" :style="{width: '400px', height: '400px'}"></div>
        <div id="main" :style="{width:'600px', height: '400px'}"></div>
    </div>
</template>
<script>
import upload from './uploadtest.vue';
import edit from './edit.vue';
import {create_course, create_course_identify} from '../fetch/course';
import {get_all_courses} from '../fetch/course'
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
    components:{
        upload,
        edit
    },
    data(){
        return{
            showEdit: false,
            showCourseList: false,
            showUpload: false,
            showCreate: false,
            editCourseID: '',
            courseIntro: "",
            courseName: "",
            courses: [],
            videoName: ["v1", "v2", "v3", "v4", "v5", "v6"],
            totWatch: "00:00:00",
            correctRate: 0,
            courses: [{
                        id:1,
                        name:"k1",
                        time: "00:00:00"
                    },
                    {
                        name:"k1",
                        time: "00:00:00"
                    },
                ],
            coursePage: 1,
            isDone: true
        }
    },
    mounted(){
        this.drawLine();
        this.render1();
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
        setCurCourse: function(id){
            localStorage.setItem("curCourseID", id);
            this.$router.push('edit');
        },
        changeCoursePage(page){
            this.currentCoursePage = page;
            /*获取课程*/
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
        },
        drawLine(){
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            myChart.setOption({
                title: { text: 'echarts test' },
                tooltip: {},
                xAxis: {
                    data: ["v1", "v2", "v3", "v4", "v5", "v6"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
        },
        render1(){
            function dataProcess (data) {
            let len = data.length
            let placeholder = {
                value: 0,
                itemStyle: {
                    opacity: 0
                },
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            }
            let i =0
            while (i < len) {
                data.push(placeholder)
                i++
            }
            return data
            }

            let data = [{
                name: '错误',
                value: 13
            }, {
                name: '正确',
                value: 75
            }]

            console.log(dataProcess(data))

            let seriesForData = {
                roseType: "area",
                type: "pie",
                z: 5,
                data: data,
                center: ['10%', '50%'],
                radius: ['10%', '50%'],
                label: {
                    normal: {
                        color: '#fff',
                        formatter: '{b|{b}} {c|{c}} %',
                        rich: {
                            b: {
                                color: "#fff"
                            },
                            c: {
                                fontWeight: "bold"
                            }

                        }
                    },
                    labelLine: {
                        normal: {
                            length: 0,
                            length2: 200,
                            lineStyle: {
                                color: "#274862"
                            },
                            show: true
                        }
                    }
                },
                labelLine:{
                    normal: {
                        length: 0,
                        length2: 200,
                        lineStyle: {
                            color: "#274862"
                        }
                    }
                }
            }

            let seriesForBg = {
                type: 'pie',
                z: 2,
                center: ['10%', '50%'],
                radius: ['5%', '60%'],
                silent: true,
                data: [{
                    value: 1,
                    itemStyle: {
                        normal: {
                            color: {
                                type: 'radial',
                                "x": 0.1,
                                "y": 0.5,
                                r: 1,
                                colorStops: [{
                                    offset: 0,
                                    color: "rgb(36,52,67)"
                                }, {
                                    offset: 1,
                                    color: "rgb(12,20,28, 0.5)"
                                }]
                            }
                        }
                    }
                }, {
                    value: 1,
                    itemStyle: {
                        emphasis: {
                            opacity: 0
                        },
                        normal: {
                            opacity: 0
                        }
                    }
                }]
            }

            let options = {
                animation: false,
                backgroundColor: '#010105',
                color: ["#FE0404", "#00DC58"],
                series:[
                    seriesForData,
                    seriesForBg,
                ]
            }

            let myChart = this.$echarts.init(document.getElementById('main'))

            myChart.setOption(options);
        }
    }
}
</script>
<style scoped>
.listWatch{
    background-color: bisque;
}
</style>
