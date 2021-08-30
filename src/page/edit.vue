<template>
    <div class="mainContainer">
        <!--<div class="VideoSelect" v-show="showVideoSelect == true">
            <input type="text" v-model="selectedNode.videoID" placeholder="视频id">
            <el-button @click="showVideoSelect=false">关闭</el-button>
        </div>
        <div class="videoList" v-show="showVideoSelect == true">
            <div class="list-item" v-for="(item,index) in partList">
                <span>{{item.videoId}}</span>-
                <span>{{item.name}}</span>
            </div>
        </div>-->
        <el-dialog :title="title" :visible.sync="showPanel" @close="closePanel" :modal-append-to-body="false">
            <!--<div class="editPannel" v-show="showPanel == true">
                <el-button @click="closePanel">关闭</el-button>
            </div>-->
            <el-input v-model="selectedNode.name" placeholder="选项名称"></el-input>
            <!--<el-button @click="showVideoSelect=true">编辑视频段</el-button>-->
            <el-select v-model="selectedNode.videoID" >
                <el-option label="选择视频" value=""></el-option>
                <el-option v-for="item in partList" :key="item.id" :label="item.name" :value="item.videoId">
                </el-option>
            </el-select>
            <el-button @click="addNode()">添加子节点</el-button>
        </el-dialog>
        <!--<div class='chapterNest'>
            第
            <el-select v-model="chapterID" >
                <el-option label="选择视频" value=""></el-option>
                <el-option v-for="(item, index) in chapterArray" :key="index" :label="item" :value="item">
                </el-option>
            </el-select>
            章第
              <el-select v-model="sessionID" >
                <el-option label="选择视频" value=""></el-option>
                <el-option v-for="(item, index) in sessionArray" :key="index" :label="item" :value="item">
                </el-option>
            </el-select>
            节
        </div>-->
        <div id="tree" :style="{width: '1700px', height: '800px'}">
        </div>
        <div class='btnNest'>
            <el-button @click="undo()">
                重置树状图
            </el-button>
            <el-button @click="uploadTree()">
                上传视频结构
            </el-button>
        </div>
    </div>
</template>
<script>
import {getPartListByCourseID} from '../fetch/video';
import {updateTreeByID, getTreeByID} from '../fetch/coreTree';
export default {
    data(){
        return{
            chapterID: 1,
            sessionID: 1,
            showVideoSelect: false,
            showVideoList: false,
            courseID: 3,
            showPanel: false,
            totNode: 1,
            nodeID: 0,
            treeData:{
                id: 0,
                url: "",
                name: "C1S1",
                videoID: 2,
                children: [

                ]
            },
            chapterArray: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
            sessionArray: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
            selectedNode:{},
            partList: [],
            edge:[]
        }
    },
    methods:{
        undo: function(){
            this.treeData = {
                id: 0,
                url: "",
                name: "根节点",
                videoID: 0,
                children: [

                ]
            },
            this.setMyCharts();
        },
        setMyCharts: function(){
            let myChart = this.$echarts.init(document.getElementById("tree"));
            let self = this;
            myChart.setOption({
                tooltip: {
                    // show：'true',//默认：true；是否显示提示框组件，包括提示框浮层和 axisPointer。
                    trigger: 'item',//默认：item；触发类型。item：数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。'axis'：坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。'none':什么都不触发。
                    triggerOn: 'mousemove'
                },
                series:[{
                        type: 'tree',
                        data: [self.treeData],
                        left: '10%',
                        right: '2%',
                        top: '15%',
                        bottom: '10%',
                        symbol: 'emptyCircle',
                        symbolSize: 4,
                        expandAndCollapse: true,//默认：true；子树折叠和展开的交互，默认打开 。
                        initialTreeDepth: 6,//默认：2，树图初始展开的层级（深度）。根节点是第 0 层，然后是第 1 层、第 2 层，... ，直到叶子节点
                        throttle:100, //设置触发视图刷新的频率。单位为毫秒（ms）。
                        zoomOnMouseWheel:true, //如何触发缩放。可选值为：true：表示不按任何功能键，鼠标滚轮能触发缩放。false：表示鼠标滚轮不能触发缩放。'shift'：表示按住 shift 和鼠标滚轮能触发缩放。'ctrl'：表示按住 ctrl 和鼠标滚轮能触发缩放。'alt'：表示按住 alt 和鼠标滚轮能触发缩放。
                        moveOnMouseMove:true, //如何触发数据窗口平移。true：表示不按任何功能键，鼠标移动能触发数据窗口平移。false：表示鼠标滚轮不能触发缩放。'shift'：表示按住 shift 和鼠标移动能触发数据窗口平移。'ctrl'：表示按住 ctrl 和鼠标移动能触发数据窗口平移。'alt'：表示按住 alt 和鼠标移动能触发数据窗口平移。
                        label: {
                            normal: {
                                position: 'top',//标签的位置。
                                rotate: 0,//标签旋转。从 -90 度到 90 度。正值是逆时针。
                                verticalAlign: 'middle',//文字垂直对齐方式，默认自动。
                                align: 'right',//文字水平对齐方式，默认自动。
                                fontSize: 10,//文字的字体大小
                            }
                        },
                        leaves: {
                            label: {
                                normal: {
                                    position: 'bottom',
                                    rotate: 0,
                                    verticalAlign: 'middle',
                                    align: 'left',
                                    fontSize: 10,//文字的字体大小
                                }
                            }
                        },
                        animationDurationUpdate: 750
                    }
                ]
            });
        },

        connectEdge(node){
            this.edge.forEach(
                Edge => {
                    if(Edge.fatherID == node.id){
                        if(node.children == undefined) node.children = [];
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
        buildTreeData: function(){
            let treeData = {};
            let indgreeMap = new Map();
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
                    treeData.id = key;
                    treeData.videoID = value;
                }
            )
            console.log(treeData);
            this.connectEdge(treeData);
            console.log(treeData);
        },
        convertGraph: function(node, father){
            console.log(node);
            if(father.id != node.id){
                this.edge.push({
                    fatherID: father.id,
                    fatherVideoID: father.videoID,
                    childID: node.id,
                    childVideoID: node.videoID,
                    name: node.name
                })
            }
            if(node.children != undefined && node.children != []){
                node.children.forEach(
                    element => {
                        this.convertGraph(element, node);
                    }
                )
            }
        },
        uploadTree: async function(){
            this.treeData.courseId = 3;
            this.edge = [];
            this.convertGraph(this.treeData, this.treeData);
            this.buildTreeData();
            if(this.edge.length == 0){
                this.edge.push({
                    fatherID: 0,
                    fatherVideoID: this.treeData.videoID,
                    childID: undefined,
                    childVideoID: undefined,
                    name: this.treeData.name
                    })
            }
            console.log("!")
            console.log(this.edge);
            this.treeData.name = 'C' + this.chapterID + 'S' + this.sessionID;
            let response = await updateTreeByID({
                courseId: this.courseID,
                title: this.treeData.name,
                edge: JSON.stringify(this.edge)
            });
            console.log(response);
            if(response.code == 200){
                this.$message({
                    type:"success",
                    message:"上传结构成功"
                })
            };
        },
        closePanel: function(){
            this.showPanel = false;
            this.setMyCharts();
        },
        getNodeByID: function(root){
            let ans;
            if(root.id == this.nodeID) {
                this.selectedNode = root;
                return root;
            }
            else{
                if(root.children != undefined && root.children.length != 0){
                    root.children.forEach(next => {
                        let node = this.getNodeByID(next);
                        if(node != undefined) ans = node;
                    });
                }
            }
            return ans;
        },


        updateVideo: async function(){
            let newVideo = await getVideoByID();
            let node = this.getNodeByID(this.treeData);
            node.video = newVideo;
            this.setMyCharts();
        },
        addNode: function(){
            let node = this.getNodeByID(this.treeData);
            let newID = this.totNode;
            this.totNode++;
            if(node.children != undefined){
                node.children.push({
                    id:newID,
                    videoID: newID,
                    name: "节点" + newID
                })
            }
            else{
                node.children = [];
                node.children.push({
                    id:newID,
                    name: "节点" + newID
                })
            }
            this.setMyCharts();
        },
        deleteNode: function(){
            let node = this.getNodeByID(this.treeData);
            if(node.children != undefined && node.children.length != 0){

            }
            this.setMyCharts();
        },
        getPartList: async function(){
            let response = await getPartListByCourseID(this.courseID);
            if(response.code == 200){
                this.partList = response.data;
            }
            else{
                this.$message({
                    type: 'error',
                    message: '获取片段列表失败'
                })
            }
        },
        render: function(){
            let myChart = this.$echarts.init(document.getElementById("tree"));
            let self = this;
            myChart.setOption({
                tooltip: {
                    // show：'true',//默认：true；是否显示提示框组件，包括提示框浮层和 axisPointer。
                    trigger: 'item',//默认：item；触发类型。item：数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。'axis'：坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。'none':什么都不触发。
                    triggerOn: 'mousemove'
                },
                series:[{
                        type: 'tree',
                        data: [self.treeData],
                        left: '50%',
                        right: '2%',
                        top: '15%',
                        bottom: '10%',
                        symbol: 'circle',
                        expandAndCollapse: true,//默认：true；子树折叠和展开的交互，默认打开 。
                        initialTreeDepth:2,//默认：2，树图初始展开的层级（深度）。根节点是第 0 层，然后是第 1 层、第 2 层，... ，直到叶子节点
                        symbolSize: 100,
                        label: {
                            normal: {
                                position: 'top',//标签的位置。
                                rotate: 0,//标签旋转。从 -90 度到 90 度。正值是逆时针。
                                verticalAlign: 'middle',//文字垂直对齐方式，默认自动。
                                align: 'right',//文字水平对齐方式，默认自动。
                                fontSize: 100,//文字的字体大小
                            }
                        },
                        leaves: {
                            label: {
                                normal: {
                                    position: 'bottom',
                                    rotate: 0,
                                    verticalAlign: 'middle',
                                    align: 'left',
                                    fontSize: 8,//文字的字体大小
                                }
                            }
                        },
                        emphasis: {
                            focus: 'descendant'
                        },
                        animationDurationUpdate: 750
                    }
                ]
            });
            myChart.on('click',function(param){
                self.nodeID = param.data.id;
                self.getNodeByID(self.treeData);
                self.showPanel = true;
            })
        }
    },
    mounted(){
        this.getPartList();
        this.render();
        if(localStorage.getItem("curCourseID") != undefined){
            this.courseID = localStorage.getItem("curCourseID");
        }
        console.log(this.courseID);
        /*getTreeByID({cid: this.courseID, vid: 1}).then(response => {
            console.log(response);
        })*/
    }
}
</script>
<style scoped>
*{
    margin-left: 0;
}
.mainContainer{
    display: flex;
    flex-flow: column;
}
#pathContainer{
    margin-top: 200px;
    margin-left: 100px;
    width: 1000px;
    height: 500px;
}
.editPannel{
    width: 500px;
    height: 500px;
    display: flex;
    flex-flow: column;
}
.editPannel{
    position:fixed;
    z-index: 1001;
    top: 300px;
    left: 500px;
}
.btnNest{
    display: flex;
    flex-flow: row;
}
</style>
