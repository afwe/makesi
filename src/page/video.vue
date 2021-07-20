<template>
    <div class="mainContainer">
        <div class="title">
            {{videoName}}
        </div>
        <div class="videoBody">
            <video src="" />
        </div>
        <div class="discussNav">
            点击进入讨论区
        </div>
    </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'

export default {
    name: video,
    props: ['cid'],
    data(){

    },
    methods:{
        getVideo: async function(){

        },
        render: async function(){
            
        }
    }
}
</script>