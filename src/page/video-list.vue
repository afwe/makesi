<template>
    <div class="mainContainer">
        <div class="video-list">
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
        </div>
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
        toVideo: async function(index){
            localStorage.setItem("edge", JSON.stringify(this.videoes[index].edge));
            this.$router.push(`/video`);
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