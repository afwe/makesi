<template>
    <div class="mainContainer">
        <div class="video-list">
            <ol class="video-content">
                <span class="title">视频列表</span>
                <li>
                    <div class="video" v-for="(item,index) in videoes" @click="toVideo(index)">
                        {{item.title}}
                    </div>
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
            courseID: "",
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
            if(response.code == 200){
                this.videoes = response.data;
            }
        }
    }
}
</script>