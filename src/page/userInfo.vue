<template>
    <div class="mainContainer">
        <div class="topHolder-div">
            <div class="avator-img">
            </div>
            <div class="infoContainer-div">
                <div class="studentName-p">
                </div>
                <div class="quote-p">
                </div>
                <div class="foucus-p">
                    关注 0 人|粉丝 0 人
                </div>
            </div>
        </div>
        <div class="bottomSelecter-div">
        </div>
        <div class="myCourse-div" v-show="showMode=='course'">
        </div>
        <div class="myDisscussion-div" v-show="showMode=='diss'">
        </div>
        <div class="achievement-div" v-show="showMode=='achi'">
        </div>
    </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'

export default {
    data(){
        return{
            showMode: 'course',
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
.mainContainer{
    display: flex;
    flex-flow: column;
}
.topHolder-div{
    width: 1920px;
height: 468px;
display: flex;
flex-flow: row;
}
.avator-img{
    margin-top: 183px;
    margin-left: 360px;
    width: 149px;
height: 149px;
border-radius: 155px;
background-color: rgba(255, 255, 255, 100);
}
.infoContainer-div{
    margin-left: 31px;
    margin-top: 202px;
    display: flex;
    flex-flow: column;
}
.studentName-p{
width: 84px;
height: 41px;
color: rgba(255, 255, 255, 100);
font-size: 28px;
text-align: left;
font-family: SourceHanSansSC-medium;
}
.quote-p{
width: 96px;
height: 24px;
color: rgba(255, 255, 255, 86);
font-size: 16px;
text-align: left;
font-family: SourceHanSansSC-light;
}
.foucus-p{
width: 179px;
height: 29px;
color: rgba(255, 255, 255, 100);
font-size: 20px;
text-align: left;
font-family: SourceHanSansSC-regular;
}
.bottomSelecter-div{
left: 0px;
top: 468px;
width: 1920px;
height: 100px;
line-height: 20px;
color: rgba(16, 16, 16, 100);
font-size: 14px;
text-align: center;
font-family: Roboto;
}
.myCourse-div{

}
.myDisscussion-div{

}
.achievement-div{

}
</style>
