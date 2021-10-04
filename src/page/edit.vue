<template>
    <div class="mainContainer">
        <span style="color:red;font-size:20px;">
            注意:根节点名称不可更改
        </span>
        <el-dialog title="编辑节点" :visible.sync="showPanel" @close="closePanel" :modal-append-to-body="false">
            <el-input v-model="selectedNode.name" placeholder="选项名称"></el-input>
            <el-select v-model="selectedNode.videoID" >
                <el-option label="选择视频" value=""></el-option>
                <el-option v-for="item in partList" :key="item.id" :label="item.name" :value="item.videoId">
                </el-option>
            </el-select>
            <el-button @click="selectedNode.name=`skip${selectedNode.id}`">跳过选项</el-button>
            <el-button @click="addNode()">添加子节点</el-button>
            <el-button @click="deleteNode()">删除节点</el-button>
            <el-button @click="showAdd=true">结尾导向</el-button>
        </el-dialog>
        <el-dialog title="编辑节点" :visible.sync="showAdd" @close="closeAdd" :modal-append-to-body="false">
            <el-input v-model="reqName" placeholder="选项名称">
            </el-input>
            <el-button @click="addElementByName">
                添加
            </el-button>
        </el-dialog>
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
            isDone: true,
            reqName: '',
            chapterID: 1,
            sessionID: 1,
            showVideoSelect: false,
            showVideoList: false,
            showAdd: false,
            courseID: 3,
            showPanel: false,
            totNode: 1,
            nodeID: 0,
            treeData:{
                id: 0,
                url: "",
                name: "",
                videoID: 2,
            },
            chapterArray: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
            sessionArray: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
            selectedNode:{},
            partList: [],
            edge:[]
        }
    },
    methods:{
        extendDeep(parent, child) {
            child = child || {};
            for(var i in parent) {
                if(parent.hasOwnProperty(i)) {
                if(typeof parent[i] === "object") {
                child[i] = (Object.prototype.toString.call(parent[i]) === "[object Array]") ? [] : {};
                this.extendDeep(parent[i], child[i]);
                } else {
                child[i] = parent[i];
                }
                }
            }
            return child;
        },
        closeAdd(){
            this.showAdd=false;
        },
        connectEdge(node){
            let self = this;
            this.getVideoByID(node.videoID).then(url =>{
                node.url = "http://" + url;
                this.edge.forEach(
                    Edge => {
                        if(Edge.fatherID == node.id){
                            if(node.children == undefined) {
                                node.children = [];
                            }
                            if(Edge.childID != undefined){
                                console.log("!?")
                                console.log(Edge.childID)
                                node.children.push({
                                    id: Edge.childID,
                                    videoID: Edge.childVideoID,
                                    name: Edge.name
                                });
                            }
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
            });
        },
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
                        initialTreeDepth: 20,//默认：2，树图初始展开的层级（深度）。根节点是第 0 层，然后是第 1 层、第 2 层，... ，直到叶子节点
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
        buildTreeData: function(){
            console.log("??")
            let treeData = this.treeData;
            let indgreeMap = new Map();
            let idVideoIDMap = new Map();
            this.edge.forEach(
                Edge => {
                    idVideoIDMap.set(Edge.fatherID, Edge.fatherVideoID);
                    idVideoIDMap.set(Edge.childID, Edge.childVideoID);
                }
            )
            let tot = 0;
            idVideoIDMap.forEach(
                (value, key) => {
                    if(key>tot) tot=key;
                }
            )
            console.log("??!");
            console.log(tot);
            this.totNode = tot+1;
            console.log(this.totNode);
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
            this.connectEdge(treeData);
        },
        convertGraph: function(node, father){
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
            if(this.isDone==false) return;
            this.isDone=false;
            this.edge = [];
            this.convertGraph(this.treeData, this.treeData);
            if(this.edge.length == 0){
                this.edge.push({
                    fatherID: 0,
                    fatherVideoID: this.treeData.videoID,
                    childID: undefined,
                    childVideoID: undefined,
                    name: this.treeData.name
                    })
            }
            console.log("!");
            console.log(this.edge);
            let response = await updateTreeByID({
                courseId: this.courseID,
                title: this.treeData.name,
                edge: JSON.stringify(this.edge)
            });
            if(response.code == 200){
                this.$message({
                    type:"success",
                    message:"上传结构成功"
                })
            };
            this.isDone=true;
        },
        closePanel: function(){
            this.showPanel = false;
            this.setMyCharts();
        },
        getFatherNode: function(root){
            console.log(root.id);
            let ans;
            if(root.children != undefined && root.children.length != 0){
                root.children.forEach(child => {
                    if(child.id == this.nodeID){
                        console.log("!")
                        console.log(root.id)
                        ans = root;
                    }
                    else if(ans == undefined){
                        let node = this.getFatherNode(child);
                        if(node != undefined){
                            ans=node;
                        }
                    }
                    
                })
            }
            console.log(ans);
            return ans;
        },
        idSelfAdd(root){
            root.id=this.totNode;
            this.totNode++;
            if(root.children!=undefined&&root.children.length!=0){
                root.children.forEach( element => {
                    this.idSelfAdd(element);
                })
            }
        },
        addElementByName(){
            let element = this.getNodeByName(this.treeData);
            let newElement = {};
            console.log(element);
            this.extendDeep(element, newElement);
            this.idSelfAdd(newElement);
            if(this.selectedNode.children == undefined) this.selectedNode.children = [];
            this.selectedNode.children.push(newElement);
            console.log(this.selectedNode);
            this.setMyCharts();
        },
        getNodeByName: function(root){
            let ans;
            if(root.name == this.reqName) {
                return root;
            }
            else{
                if(root.children != undefined && root.children.length != 0){
                    root.children.forEach(next => {
                        let node = this.getNodeByName(next);
                        if(node != undefined) ans = node;
                    });
                }
            }
            return ans;
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
            if(this.isDone==false) return;
            this.isDone=false;
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
            this.isDone=true;
        },
        deleteNode: function(){
            let node = this.getFatherNode(this.treeData);
            node.children.forEach((element, index) => {
                if(element.id == this.nodeID){
                    console.log(element.id);
                    node.children.splice(index, 1);
                }
            });
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
                        initialTreeDepth:20,//默认：2，树图初始展开的层级（深度）。根节点是第 0 层，然后是第 1 层、第 2 层，... ，直到叶子节点
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
        this.edge = JSON.parse(localStorage.getItem('edge'));
        this.edge = JSON.parse(this.edge);
        console.log("//");
        console.log(this.treeData)
        if(localStorage.getItem("curCourseID") != undefined){
            this.courseID = localStorage.getItem("curCourseID");
        }
        this.getPartList();
        this.render();
        this.buildTreeData();
        if(this.totNode < 1) this.totNode = 1;
        this.treeData.name = localStorage.getItem('treeName');
        this.setMyCharts();
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
    margin-top:85px;
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
