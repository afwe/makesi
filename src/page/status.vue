<template>
    <div class="mainContainer">
        <div class="totTime">
            总时长:{{parseInt(totTime/3600)}}时{{parseInt((totTime-parseInt(totTime/3600)*3600)/60)}}分{{parseInt(totTime%60)}}秒
        </div>
        <div class="studentTime">
            <el-table
                :data="timeList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                :stripe="stripe"
                :current-page.sync="currentPage"
                style="width: 100%">
                <el-table-column
                    prop="studentId"
                    label="用户Id"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="mtime"
                    label="时长">
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[10, 15, 20]"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="timeList.length">
                </el-pagination>
            </div>
        </div>
        <span>选项信息</span>
        <div id="branchStatusNest">
        
        </div>
    </div>
</template>
<script>
import { get_time_status, get_pick_status } from '../fetch/status'

export default {
    data(){
        return{
            videoID: '',
            courseID: '',
            totTime: 0,
            timeList: [],
            pagesize: 10,
            currentPage: 1,
            branchNodes: [
                [
                    {
                        name: "?",
                        value: 2
                    },
                    {
                        name: "!",
                        value: 3
                    },
                    {
                        name: "!",
                        value: 3
                    },
                    {
                        name: "!",
                        value: 3
                    }
                ],
                [
                    {
                        name: "?",value: 4
                    },
                    {
                        name: "!",value: 0
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
        console.log(this.edge);
        let self = this;
        get_time_status({
                videoId: this.videoID,
                courseId: this.courseID
            }).then(
                data => { 
                    
                    data.data.sort(function(val1,val2){
                        return val1.mtime-val2.mtime;
                    })
                    data.data.forEach(element => {
                        if(element.videoId == self.videoID){
                            self.totTime += element.mtime;
                            element.mtime/=1000;
                            console.log(element);
                            element.mtime = `${parseInt(element.mtime/3600)}时${parseInt((element.mtime-parseInt(element.mtime/3600)*3600)/60)}分${parseInt(element.mtime%60)}秒`
                            self.timeList.push(element);
                        }
                        
                })
                self.totTime /= 1000;
        });
        this.edge = localStorage.getItem('edge');
        this.edge = JSON.parse(this.edge);
        this.edge = JSON.parse(this.edge);
        this.buildTreeData();
        this.searchTreeBranch(this.treeData);
        /*this.createPank();*/
    },
    methods:{
        handleSizeChange(val) {
            this.pagesize=val;
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },
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
            if(node.children != undefined && node.children.length>1){
                console.log("!!");
                this.branchNodes.push([]);
                node.children.forEach(
                    (element, index) => {
                        let nowIndex = this.branchNodes.length-1;
                        this.branchNodes[nowIndex].push(element);
                        get_pick_status({courseId:this.courseID,videoId: element.videoID}).then(
                            data => {
                                console.log(data);
                                element.value = data.data;
                                if(index == node.children.length - 1){
                                    this.branchStatusRender(this.branchNodes[nowIndex], nowIndex);
                                }
                        })  
                    }
                )
            }
            if(node.children != undefined && node.children.length>0){
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
        videoStatusRender: function(){
            /*let myChart = this.$echarts.init(document.getElementById('eLine'));
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
            });*/
        },
        branchStatusRender: function(branchList, index){
            let tempData = [];
            branchList.forEach(
                element => {
                    tempData.push({
                        name: element.name,
                        value: element.value
                    })
                }
            )
            console.log(tempData);
            // 最终输出数据
            var result = [];
            
            // 颜色
            var color=['#00F0FF', '#00FFD8', '#00FF78', '#0083FE', '#00BFFF'];
            
            // 间隔数据的样式
            var placeHolderStyle = {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                    color: 'rgba(0, 0, 0, 0)',
                    borderColor: 'rgba(0, 0, 0, 0)',
                    borderWidth: 0
                }
            };
            
            // 循环加入间隔数据
            for (var i = 0; i < tempData.length; i++) {
                result.push({
                    value: tempData[i].value,
                    name: tempData[i].name,
                    itemStyle: {
                        normal: {
                            borderWidth: 2,
                            shadowBlur: 20,
                            borderColor:color[i],
                            shadowColor: color[i]
                        }
                    }
                });
            }
            
            
            // 设置字体样式
            var rich = {
                            b: { // 名字
                                fontSize: 12,
                                color: '#aae8ff',
                                align: 'left',
                                padding: 2
                            },
                            hr: { // 分割线
                                borderColor: '#00ffff',
                                width: '100%',
                                borderWidth: 1,
                                height: 0
                            },
                            w: { // 数据存量
                                fontSize: 12,
                                color: '#aae8ff',
                                align: 'left',
                                padding: 2
                            },
                            c: { // 数据
                                fontSize: 12,
                                align: 'center',
                                padding: 2,
                                color: '#53C6F2'
                            },
                            a: { // 单位
                                fontSize: 12,
                                align: 'center',
                                padding: 2,
                                color: '#53C6F2'
                            }
                        }

            var option = {
                backgroundColor: 'transparent',// 画布背景色
                tooltip: { // 提示框
                    trigger: 'item',
                    formatter: "{b} : {d}%"
                    //formatter: "{b} : {d}% <br/> {c}"
                },
                series: [{
                        type: 'pie',
                        radius: ['50%', '60%'],//内 外圆半径
                        center: ['50%', '50%'],
                        color: ['#00F0FF', '#00FFD8', '#00FF78', '#0083FE', '#00BFFF'],// 色块填充颜色
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'outside',
                                    color: '#ddd',
                                    formatter: function(params) {
                                        var percent = 0;
                                        var total = 0;
                                        for (var i = 0; i < tempData.length; i++) {
                                            total += tempData[i].value;
                                        }
                                        percent = ((params.value) * 1000).toFixed(0);
                                        if(params.name !== '') {
                                        return  '{b|'+params.name+'} \n {hr|} \n {w|选择次数:} {c|'+params.value+'} {a|次}'
                                        }else {
                                            return '';
                                        }
                                    },
                                    rich: rich
                                },
                                labelLine: {
                                    length:20,
                                    length2:30,
                                    show: true,
                                    color:'#00ffff'
                                }
                            }
                        },
                        data: result
                        /*labelLine: {
                            normal: {
                                show: true,
                                length: 20,
                                length2: 30,
                                lineStyle: {
                                    color: '#CCCCCC',
                                    width: 2
                                }
                            }
                        },*/
                        /*label: {
                            normal: {
                                //formatter: '{b|{b}} \n {hr|} \n {w|数据存量:} {c|{c}%} {a|条}',
                                formatter: '{b|{b}} \n {hr|} \n {w|数据存量:} {c|{c}} {a|条}',
                                rich: {
                                    b: { // 名字
                                        fontSize: 18,
                                        color: '#94C8DC',
                                        align: 'left',
                                        padding: 2
                                    },
                                    hr: { // 分割线
                                        borderColor: '#CCCCCC',
                                        width: '100%',
                                        borderWidth: 2,
                                        height: 0
                                    },
                                    w: { // 数据存量
                                        fontSize: 18,
                                        color: '#94C8DC',
                                        align: 'left',
                                        padding: 2
                                    },
                                    c: { // 数据
                                        fontSize: 18,
                                        align: 'center',
                                        padding: 2,
                                        color: '#53C6F2'
                                    },
                                    a: { // 单位
                                        fontSize: 18,
                                        align: 'center',
                                        padding: 2,
                                        color: '#53C6F2'
                                    }
                                } //rich end
                            }
                        } //lable end*/
                    }

                ]// series end
            };
            let newLayer = document.createElement('div');
            newLayer.id = `p${index}`;
            newLayer.style.height = '600px';
            newLayer.style.width = '800px';
            newLayer.style.backgroundColor = 'black';
            document.getElementById('branchStatusNest').appendChild(newLayer);
            let myChart = this.$echarts.init(newLayer);
            myChart.setOption(option);
        },
        createPank: function(){
            this.branchNodes.forEach(
                (element, index) => {

                    this.branchStatusRender(element, index);
                }
            )
        }
    }
}
</script>
<style scoped>
.mainContainer{
    width: 1000px;
    height: 600px;
}
#branchStatusNest{
    width: 1600px;
    height: 600px;
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
}
</style>
