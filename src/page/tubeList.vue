<template>
    <div class="mainContainer">
        <div class="tubeList" key="tubeList">
            <el-button @click="toRoom()" v-if="manageMode.is == true">
                开始直播
            </el-button>
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
    inject:{
        manageMode: {
            default:()=>{}
        }
    },
    data(){
        return {
            tubeList :'',

        }   
    },
    mounted(){
        getTubeList().then((tubeList)=>{
            this.tubeList = tubeList;
        })
    },
    methods:{
        toRoom: function(id){
            if(id==undefined){
                id=1;
                this.tubeList.forEach(room=>{
                    if(room.roomId&&room.roomId>id){
                        id = room.roomId+1;
                    }
                })
            }
            console.log(id);
            this.$router.push({name:'tubeRoom',params:{roomId:id }});
        }
    }

}

</script>

<style scoped>
.mainContainer{
    margin: auto;
    margin-top:85px;
    display:flex;
    width:1400px;
    height:3645px;
    min-height: 2000px;
    flex-flow:column;
}
.tubeList{
    
}
.tubeCard{
    border: 5px solid blue;
}
.tubeFace{
    
}
.tubeCard .tubeIntro{
    
}
.tubeCard .roomName{
    
}
.tubeCard .hot{
    
}
</style>