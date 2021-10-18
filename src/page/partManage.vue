<template>
    <div class="mainContainer">
        <el-dialog title="上传视频" :visible.sync="showUpload" @close="showUpload=false" :modal-append-to-body="false">
                <upload>
                </upload>
        </el-dialog>
        <el-button class="createCourse" @click="showUpload=!showUpload">
            上传视频
        </el-button>
        <el-table :data="partList" stripe border>
            <el-table-column  type="index"></el-table-column>
            <el-table-column  label="片段名称" prop="name"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import upload from './uploadtest2.vue';
import {getPartListByCourseID, deletePartByID} from '../fetch/video';
export default{
    components:{
        upload
    },
    data(){
        return{
            courseID: '',
            showUpload: false,
            partList: [],
            isDone: true
        }
    },
    mounted(){
        if(localStorage.getItem("curCourseID") != undefined){
            this.courseID = localStorage.getItem("curCourseID");
        }
        this.render();
    },
    methods:{
        handleDelete: function(id){
            let self = this;
            deletePartByID({partId: id}).then(
                data => {
                    if(data.code == 200){
                        self.render();
                    }
                }
            )
        },
        render: async function(){
            console.log(this.courseID);
            let response = await getPartListByCourseID(this.courseID);
            console.log(response);
            if(response.code == 200){
                this.partList = response.data;
            }
            else{
                this.$message({
                    type: 'error',
                    message: '获取片段列表失败'
                })
            }
        }
    }
}
</script>
<style scoped>
.mainContainer{
    margin-top:85px;
    margin-left: 240px;
    width: 1200px;
    min-height:800px;
    display: flex;
    flex-flow:column;
}
.el-button + .el-button{
    margin-left:0;
}
</style>