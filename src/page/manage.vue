<template>
    <div class="mainContainer">
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
        <div id="myChart" :style="{width: '400px', height: '400px'}"></div>
        <div id="main" :style="{width:'600px', height: '400px'}"></div>
    </div>
</template>
<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
    data(){
        return{
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
            totCourse: 0
        }
    },
    mounted(){
        this.drawLine();
        this.render1();
    },
    methods:{
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
