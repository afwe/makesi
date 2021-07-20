<template>
    <div class="mainContainer">
        <div class="video-list">
            <ol class="video-content">
                <span class="title">视频列表</span>
                <li>
                    <div class="video" v-for="(item,index) in videoes" @click="toVideo(item.id)">
                        {{item.name}}
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
import { defineComponent } from '@vue/composition-api'

export default {
    data(){
        return{
            totVideo: 4,
            videoPage: 1,
            videoes: [
                {
                    id: 1,
                    name: 2
                }
            ]
        }
    },
    methods:{
        changeVideoPage:async function(){

        },
        getVideoes: async function(){

        },
        toVideo: async function(id){
            this.$router.push(`/video?id=${id}`);
        },
        render: async function(){
            
        }
    }
}
</script>