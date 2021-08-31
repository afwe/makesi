<template>
    <div class="mainContainer">
        <div class="videoStatusNest">
            <div class="eLine" v-for="(item,index) in partTimeList">
            </div>
        </div>
        <div class="branchStatusNest">
            <div class="ePank" v-for="(item,index) in branchList">
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'

export default {
    data(){
        return{
            videoID: '',
            courseID: '',
            partTimeList: [],
            treeData: {},
            edge: [],
        }

    },
    mounted(){
        this.courseID = this.$route.query.id;
        this.videoID = this.$route.query.vid;
        this.edge = JSON.parse(localStorage.getItem('edge'));
        this.edge = JSON.parse(this.edge);
    },
    methods:{
        connectEdge(node){
            let self = this;
            this.edge.forEach(
                Edge => {
                    if(Edge.fatherID == node.id){
                        if(node.children == undefined) node.children = [];
                        if(Edge.childID != undefined)
                        node.children.push({
                            id: Edge.childID,
                            videoID: Edge.childVideoID,
                            name: Edge.name
                            } 
                        );
                    }
                }
            )
            if(node.children != undefined && node.children != []){
                node.children.forEach(
                    next => {
                        this.connectEdge(next);
                    }
                )
            }
        },
        buildTreeData: function(){
            let Data = {};
            let idVideoIDMap = new Map();
            this.edge.forEach(
                Edge => {
                    idVideoIDMap.set(Edge.fatherID, Edge.fatherVideoID);
                    idVideoIDMap.set(Edge.childID, Edge.childVideoID);
                }
            )
            this.edge.forEach(
                Edge => {
                    idVideoIDMap.delete(Edge.childID);
                }
            )
            idVideoIDMap.forEach(
                (value, key) => {
                    Data.id = key;
                    Data.videoID = value;
                }
            )
            this.connectEdge(Data);
            this.treeData = Data;
        },
        videoStatusRender(){

        },
        branchStatusRender(){

        }
    }
}
</script>
<style scoped>

</style>
