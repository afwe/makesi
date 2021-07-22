<template>
    <div class="mainContainer">
        <div class="title">
            {{videoName}}
        </div>
        <div class="videoBody">
            <video class="video" src="" />
        </div>
        <div class="discussNav">
            点击进入讨论区
        </div>
    </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'

export default {
    data(){
        return{
            videoName: "",
            videoID: "",
        }
    },
    methods:{
        getVideo: async function(){

        },
        render: async function(){

        }
    }
}
</script>

<style scoped>
.videoBody{
    width: 500px;
    height: 300px;
    background-color: blue;
}
.video{
    width: 300px;
    height: 200px;
}
</style>