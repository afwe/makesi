<template>
    <div class="mainContainer">
        <el-input :name>
        </el-input>
        <el-input :class>
        </el-input>
        <el-input :telepone>
        </el-input>
        <el-input :gender>
        </el-input>
        <el-input :mail>
        </el-input>
        <el-input ;gender>
        </el-input>
        <el-button @click="saveInfo">
            保存信息
        </el-button>
    </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'

export default {
    data(){
        return{
            name:'',
            gender: '',
            class:'',
            major:'',
            telephone:'',
            mail:'',
        }
    },
    methods:{
        saveInfo: async function(){
            let response=await saveInfo({
                name: this.name,
                gender: this.gender,
                class:this.class,
                major:this.major,
                telephone:this.telephone,
                mail:this.mail,
            })
            if(response.code == 200){
                this.$message({
                    message:"保存成功",
                    type:"success"
                })
            }
        }
    },
    mounted(){
        getInfo(this.studentId).then(response => {
            if(response == 200 ){
                this.name=response.data.name;
                this.gender=response.data.gender;
                this
            }
            
        }).catch( err => {

        })
    }
}
</script>
<style scoped>

</style>
