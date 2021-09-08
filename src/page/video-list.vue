<template>
    <div class="mainContainer">
        <!--<div class="video-list">
            <ol class="video-content">
                <span class="title">视频列表</span>
                <li>
                    <el-button class="video" v-for="(item,index) in videoes" @click="toVideo(index)">
                        {{item.title}}
                    </el-button>
                </li>
            </ol>
            <div class="video-pager">
                <el-pagination
                    v-if="totVideo > 0"
                    background
                    layout="prev, pager, next"
                    :page-size="20"
                    :total="totVideo"
                    :current-page="videoPage"
                    @current-change="changeVideoPage"
                />
            </div>
        </div>-->
        <span class="title">视频列表</span>
        <el-collapse class="videoList">
            <el-collapse-item v-for="(item,cindex) in chapter" class="title">
                <template slot="title">
                    第{{cindex+1}}章
                </template>
                <el-card v-for="(item,sindex) in chapter[cindex]" class="videoItem" @click.native="toVideo(item.id)">
                    {{item.title}}
                </el-card>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
import { getVideoListByCourseID } from '../fetch/video'

export default {
    data(){
        return{
            courseID: 3,
            totVideo: 4,
            videoPage: 1,
            videoes: [
                {
                    id: 1,
                    title: 2
                }
            ],
            chapter: [

            ]
        }
    },
    mounted(){
        this.courseID = this.$route.query.id;
        this.render();
    },
    methods:{
        changeVideoPage:async function(){
            
        },
        getVideoes: async function(){

        },
        toVideo: async function(id){
            console.log()
            let index = 0;

            this.videoes.forEach(
                (element, i) => {
                    if(element.id == id) index = i; 
                }
            )
            console.log(id);
            console.log(index);
            localStorage.setItem("edge", JSON.stringify(this.videoes[index].edge));
            this.$router.push({
                path: `/video/?id=${this.courseID}&vid=${this.videoes[index].id}`
            });
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
                for(let i = 1; i <= array[array.length-1].c; i++){
                    this.chapter.push([]);
                }
                array.forEach(
                    element => {
                        this.chapter[element.c-1].push(element);
                    }
                )
                this.videoes = array;
            }
        }
    }
}
</script>
<style scoped>
.videoItem{
    margin-top: 10px;
    background-color: #fe0000;
    color: #ffff01;
}
.title{
    background-color: #fe0000;
    color: #ffff01;
}
</style>