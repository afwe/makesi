<template>
<div class="mainContainer">
    <el-dialog title="创建课程" :visible.sync="showCreate" @close="closePanel" :modal-append-to-body="false">
        <!--<div class="editPannel" v-show="showPanel == true">
            <el-button @click="closePanel">关闭</el-button>
        </div>-->
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
    <el-button class="createCourse" @click="showCreate=true">
        创建视频
    </el-button>
    <el-table :data="videoes" stripe border>
        <el-table-column  type="index"></el-table-column>
        <el-table-column  label="视频名称" prop="title"></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row.id)">编辑视频结构</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>
<script>
import {updateTreeByID, getTreeByID} from '../fetch/coreTree';
import { getVideoListByCourseID } from '../fetch/video'
export default{
    data(){
        return{
            courseID: '',
            chapterID: 1,
            sessionID: 1,
            showCreate: false,
            treeData: {
                id: 0,
                url: "",
                name: "根节点",
                videoID: 0,
                children: [

                ]
            },
            edge:[
                {
                    fatherID: 0,
                    fatherVideoID: '',
                    childID: undefined,
                    childVideoID: undefined,
                    name: "根节点"
                }
            ],
            chapterArray: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
            sessionArray: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
            videoes: [],
            isDone: true
        }
    },
    mounted(){
        if(localStorage.getItem("curCourseID") != undefined){
            this.courseID = localStorage.getItem("curCourseID");
        }
        this.render();
    },
    methods:{
        showPanel: function(){
            showCreate = true;
        },
        closePanel: function(){
            this.showCreate = false;
            this.render();
        },
        handleEdit: function(videoID){
            console.log(videoID);
            this.$router.push('/edit');
        },
        handleDelete: function(videoID){

        },
        changeVideoPage:async function(){
            
        },
        getVideoes: async function(){

        },
        toVideo: async function(index){
            localStorage.setItem("edge", JSON.stringify(this.videoes[index].edge));
            this.$router.push({
                path: `/video/?id=${this.courseID}&vid=${this.videoes[index].id}`
            });
        },
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
        render: async function(){
            let response = await getVideoListByCourseID(this.courseID);
            console.log(response);
            if(response.code == 200){
                let array = response.data;
                array.forEach(element => {
                    let videoName = element.title;
                    let sPosition = videoName.indexOf('S');
                    element.c = parseInt(videoName.substr(1,sPosition - 1));
                    element.s = parseInt(videoName.substr(sPosition + 1, videoName.length - sPosition));
                    element.title = "第" + element.c + "章" + "第" + element.s + "节";
                });
                let Sort = function(val1, val2){
                    if(val1.c == val2.c) return val1.s - val2.s;
                    else return val1.c - val2.c;
                }
                array.sort(Sort);
                this.videoes = array;
            }
        }
    }
}
</script>
<style scoped>

</style>
