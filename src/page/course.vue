<template>
    <div class="mainContainer">
        <div class="courseTitle">
            {{courseName}}
        </div>
        <div class="course">
            课程简介
        </div>
        <div class="videoNav">
            点击进入课程视频
        </div>
    </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'

export default {
    data(){
        return{
            
        }
    },
    methods:{
        getCourses: async function(){

        },
        
    }
}
</script>