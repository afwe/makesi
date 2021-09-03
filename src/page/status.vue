<template>
    <div class="mainContainer">
        <div class="videoStatusNest">
            <div id="eLine">
            </div>
        </div>
        <div class="branchStatusNest">
            <div class="ePank" v-for="(item,index) in branchList">
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'

export default {
    data(){
        return{
            videoID: '',
            courseID: '',
            partTimeList: [],
            branchNodes: [
                [
                    {

                    },
                    {

                    }
                ],
                [
                    {
                        
                    }
                ]
            ],
            treeData: {},
            edge: [],
        }

    },
    mounted(){
        this.courseID = this.$route.query.id;
        this.videoID = this.$route.query.vid;
        this.edge = JSON.parse(localStorage.getItem('edge'));
        this.edge = JSON.parse(this.edge);
    },
    methods:{
        connectEdge(node){
            let self = this;
            this.edge.forEach(
                Edge => {
                    if(Edge.fatherID == node.id){
                        if(node.children == undefined) node.children = [];
                        if(Edge.childID != undefined)
                        node.children.push({
                            id: Edge.childID,
                            videoID: Edge.childVideoID,
                            name: Edge.name
                            } 
                        );
                    }
                }
            )
            if(node.children != undefined && node.children != []){
                node.children.forEach(
                    next => {
                        this.connectEdge(next);
                    }
                )
            }
        },
        searchTreeBranch: function(node){
            if(node.children != undefined && node.children != []){
                this.branchNodes.push([]);
                node.children.forEach(
                    element => {
                        this.branchNodes[this.branchNodes.lenggth-1].push(element);
                    }
                )
            }
            if(node.children != undefined && node.children != []){
                node.children.forEach(
                    element => {
                        this.searchTreeBranch(element);
                    }
                )
            }
        },
        buildTreeData: function(){
            let Data = {};
            let idVideoIDMap = new Map();
            this.edge.forEach(
                Edge => {
                    idVideoIDMap.set(Edge.fatherID, Edge.fatherVideoID);
                    idVideoIDMap.set(Edge.childID, Edge.childVideoID);
                }
            )
            this.edge.forEach(
                Edge => {
                    idVideoIDMap.delete(Edge.childID);
                }
            )
            idVideoIDMap.forEach(
                (value, key) => {
                    Data.id = key;
                    Data.videoID = value;
                }
            )
            this.connectEdge(Data);
            this.treeData = Data;
        },
        videoStatusRender(){
            let myChart = this.$echarts.init(document.getElementById('eLine'));
            this.partTimeList.sort((element1, element2) => {
                return element1.id - element2.id;
            });
            let nameArray = [];
            let timeArray = [];
            this.partTimeList.forEach(
                element => {
                    nameArray.push(element.name);
                    timeArray.push(element.time);
                }
            )
            myChart.setOption({
                title: { text: 'echarts test' },
                tooltip: {},
                xAxis: {
                    data: nameArray
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: timeArray
                }]
            });
        },
        branchStatusRender(){
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

</style>
