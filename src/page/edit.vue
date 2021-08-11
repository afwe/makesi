<template>
    <div class="mainContainer">
        <!--<div id="root" class="block">
        </div>
        <div id="end" class="block">
        </div>-->
        <div v-show="showPanel == true">
            <div>编辑视频段</div>
            <div>添加子节点</div>
        </div>
        <div id="tree" :style="{width: '1700px', height: '800px'}">
        </div>
        <el-button>
            重置树状图
        </el-button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            /*treeData:{
                "children": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "children": [],
                                        "name": "低压车间表计82"
                                    }
                                ],
                                "name": "低压关口表计1"
                            }
                        ],
                        "name": "高压子表计122"
                    },
                    {
                        "children": [
                            {
                                "children": [],
                                "name": "低压关口表计101"
                            }
                        ],
                        "name": "高压子表计141"
                    }
                ],
                "name": "高压总表计102"
            }*/
            showPanel: false,
            totNode: 1,
            nodeID: 0,
            treeData:{
                id: 0,
                url: "",
                name: "根节点",
                videoID: "",
                children: [

                ]
            }
        }
    },
    methods:{
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

        getNodeByID: function(root){
            let ans;
            if(root.id == this.nodeID) {
                return root;
            }
            else{
                if(root.children != undefined && root.children.length != 0){
                    root.children.forEach(next => {
                        console.log(this.getNodeByID(next));
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
        render: function(){
            /*for(let i = 1; i <= 7; i++){
                for(let j = 1; j <= 4; j++){
                    let newBlock = document.createElement("div");
                    newBlock.id = "d-" + (i + (j - 1) * 7);
                    newBlock.className = "block";
                    newBlock.style.width = "60px";
                    newBlock.style.height = "30px";
                    newBlock.style.backgroundColor = "aqua"
                    newBlock.style.marginTop = (j * 30) + "px";
                    newBlock.style.marginLeft = ((i - 1) * 60 +60) + "px";
                    console.log(newBlock);
                    document.getElementById("pathContainer").appendChild(newBlock);
                    console.log(document.getElementById("pathContainer"));
                }
            }*/
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
                self.addNode();
            })

        }
    },
    mounted(){
        this.render();
    }
}
</script>
<style scoped>
.mainContainer{
    display:flex;
    flex-flow: row;
}
.block{
    position: fixed;
    background-color: blue;
    width: 60px;
    height: 30px;
}
#root{
    margin-top:100px;
    background-color: yellow !important;
}
#end{
    margin-top:100px;
    background-color: red !important;
    left: 600px;
}
#pathContainer{
    margin-top: 200px;
    margin-left: 100px;
    width: 1000px;
    height: 500px;
}
</style>
