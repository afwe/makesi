<template>
    <div class="sideNavContainer" v-show="showSideNav==true">
        <el-dialog title="创建课程" :visible.sync="showCreate" @close="closePanel" :modal-append-to-body="false">
            <div class='chapterNest'>
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
            </div>
            <el-radio-button class="createButton" v-on:click.native="createVideo()">
                    创建
            </el-radio-button>
        </el-dialog>
        <button class="createCh-div" @click="showCreate=true;">
            <div class="createCh-img" :style="createChBackground"></div>
            新建章节
        </button>
        <div class="chManage-div" @click="$router.push('/videoManage');selectedMode='chapter'" :class="{selectedColor:selectedMode==='chapter'}">
            <div class="chManage-img" :style="manageChBackground"></div>
            章节管理
        </div>
        <div class="videoLib-div" @click="$router.push('/partManage');selectedMode='video'" :class="{selectedColor:selectedMode==='video'}">
            <div class="videoLib-img" :style="videoLibBackground"></div>
            视频库
        </div>
    </div>
</template>
<script>
import {updateTreeByID, getTreeByID} from '../fetch/coreTree';
export default {
    watch:{
        $route(to,from){
            let nowPath=to.path;
            nowPath=nowPath.substr(1,nowPath.length-1);
            if(nowPath=='manage'||nowPath=='videoManage'||nowPath=='partManage') this.showSideNav=true;
            else this.showSideNav=false;
        }
    },
    data(){
        return{
            createChBackground:{
                backgroundImage:"url("+require('../assets/createCh.svg')+")",
                backgroundSize:"100% 100%"
            },
            manageChBackground:{
                backgroundImage:"url("+require('../assets/chManage.svg')+")",
                backgroundSize:"100% 100%"
            },
            videoLibBackground:{
                backgroundImage:"url("+require('../assets/videoLib.svg')+")",
                backgroundSize:"100% 100%"
            },
            showSideNav:false,
            showCreate: false,
            isDone:true,
            courseID: '',
            chapterID: 1,
            sessionID: 1,
            chapterArray: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
            sessionArray: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
            selectedMode:'chapter',
        }
    },
    mounted(){
        let nowPath=this.$route.path;
        nowPath=nowPath.substr(1,nowPath.length-1);
        if(nowPath=='manage'||nowPath=='videoManage'||nowPath=='partManage') this.showSideNav=true;
        else this.showSideNav=false;
        if(localStorage.getItem("curCourseID") != undefined){
            this.courseID = localStorage.getItem("curCourseID");
        }
    },
    closePanel: function(){
        this.showCreate = false;
    },
    methods:{
        createVideo: async function(){
            if(!this.isDone) return;
            this.isDone = false;
            console.log("!!");
            this.treeData.name = 'C' + this.chapterID + 'S' + this.sessionID;
            let response = await updateTreeByID({
                courseId: this.courseID,
                title: this.treeData.name,
                edge: JSON.stringify(this.edge)
            });
            if(response.code == 200){
                console.log(response);
            }
            this.closePanel();
            this.isDone = true;
        },
    }
}
</script>
<style scoped>
.selectedColor{
    color:red !important;
}
.sideNavContainer{
    z-index:1010;
    position: fixed;
    display:flex;
flex-flow:column;
top:85px;
left: 0;
width:180px;
height:702px;
line-height:14px;
background-color:rgba(250,250,250,100);
text-align:center;
}.createCh-div{display:flex;
flex-flow:row;
margin-top:21px;
margin-left:29px;
width:122px;
line-height:35px;
border-radius:4px;
border:none;
background-color:rgba(255,5,47,100);
color:rgba(255,255,255,100);
font-size:14px;
font-family:Roboto;
}.createCh-img{
    margin-top: 10px;
    margin-left: 20px;
width:15px;
height:15px;
}.chManage-div{display:flex;
flex-flow:row;
width:100%;
height:46px;
line-height:46px;
color:black;
font-size:14px;
text-align:left;
font-family:SourceHanSansSC-regular;
}.chManage-img{
        margin-top: 14px;margin-left:29px;
width:15px;
height:15px;
padding-right: 20px;
}.videoLib-div{display:flex;
flex-flow:row;
width:100%;
height:46px;
line-height:46px;
color:black;
font-size:14px;
text-align:left;
font-family:SourceHanSansSC-regular;
}.videoLib-img{
        margin-top: 14px;
        margin-left:29px;
width:15px;
height:15px;
padding-right: 20px;
}
</style>