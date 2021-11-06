<template>
    <div class="mainContainer">
        <div class="tubeList" key="tubeList">
            <div class="tubeCard" v-for="(item,index) in tubeList" @click="toRoom(item.roomName)">
                <div class="tubeFace"></div>
                <div class="tubeIntro">
                    <div class="roomId">{{item.roomName}}</div>
                    <div class="hot">当前观看:{{item.roomCandidates}}人</div>
                </div>
            </div>
            <div class="tubeCard" v-if="isMonitor==true">
                <div class="startBackground"></div>
                <div class="start">开始直播</div>
            </div>
        </div>
    </div>
</template>

<script>
import {getTubeList} from '../fetch/tube.js'
export default {
    data(){
        return {
            tubeList : '',

        }   
    },
    mounted(){
        getTubeList().then((tubeList)=>{
            this.tubeList = tubeList;
        })
    },
    methods:{
        toRoom: function(id){
            this.$router.push(`/tubeRoom?roomId=${id}`);
        }
    }

}

</script>

<style scoped>
.mainContainer{

}
.tubeList{
    
}
.tubeCard{
    
}
.tubeFace{
    
}
.tubeIntro{
    
}
.roomName{
    
}
.hot{
    
}
</style>