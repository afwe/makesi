<template>
<div class="pageContainer">
    <div class="topHolder-div" :style="userBackground">
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
    <div class="mainContainer">
        <div class="bottomSelecter-div">
            <div class="myCourse-button" @click="showMode='course'">
                我的课程
            </div>
            <div class="myDisscussion-button" @click="showMode='diss'">
                讨论
            </div>
            <div class="achievement-button" @click="showMode='achi'">
                成就
            </div>
        </div>
        <div class="courseContainer" @click="showCreate=true">
            <div class="createCourse-div">
                <div class="crossSvg" :style="crossBackground">
                </div>
                <div class="createCourse-p">
                    创建新课程
                </div>
            </div>
        </div>
    </div>
    <div class="createDialog-div" v-show="showCreate==true">
        <div class="dialogHead-div">
            <div class="createDialogTitle-p">
                课程信息
            </div>
            <div class="close-img">
            </div>
        </div>
        <div class="line">
        </div>
        <div class="titleSet-div">
            <div class="newTitle-p">
                名称
            </div>
            <input class="newCourseTitle">
            </input>
        </div>
        <div class="descSet-div">
            <div class="newDesc-p">
                简介
            </div>
            <input class="newCourseDesc">
            </input>
        </div>
        <div class="faceSet-div">
            <div class="newFace-p">
                封面
            </div>
            <input class="newCourseFace">
            </input>
        </div>
        <div class="line">
        </div>
        <div class="btnNest">
            <button class="cancel-button">
                取消
            </button>
            <button class="create-button">
                创建
            </button>
        </div>
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
            userBackground:{
                backgroundImage: 'url('+require('../assets/userInfo.png')+')',
                backgroundSize: "100% 100%" 
            },
            crossBackground:{
                backgroundImage:  'url(' +require('../assets/if-plus.svg')+')',
                backgroundSize: "100% 100%" 
            },
            showCreate: false
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
.createDialog-div{

}
.dialogHead-div{
    
}
.createDialogTitle-p{
    
}
.close-img{
    
}
.line{
    
}
.titleSet-div{
    
}
.newTitle-p{
    
}
.newCourseTitle{
    
}
.descSet-div{
    
}
.newDesc-p{
    
}
.newCourseDesc{
    
}
.faceSet-div{
    
}
.newFace-p{
    
}
.newCourseFace{
    
}
.line{
    
}
.btnNest{
    
}
.cancel-button{
    
}
.create-button{
    
}
.createCourse-div{
    margin-left:calc(50% - 442px);
    width:203px;
height:233px;
line-height:14px;
border-radius:18px;
background-color:#f5f5f5;
text-align:center;
border:1px dashed rgba(199,199,204,100);
}.crossSvg{margin-top:75px;
margin-left:78px;
width:48px;
height:48px;
}.createCourse-p{margin-top:10px;
margin-left:69px;
line-height:18px;
color:rgba(142,142,147,100);
font-size:13px;
text-align:left;
font-family:SourceHanSansSC-light;
}
.courseContainer{
    width:1400px;
    display: flex;
    flex-flow: row;

}
.mainContainer{
    width:1400px;
    margin:auto;
    height: 2000px;
display:flex;
flex-flow:column;
}.topHolder-div{width:100%;
height:341px;
display:flex;
flex-flow:row;
}.avator-img{margin-top:133px;
margin-left:calc(50% - 442px);
width:108px;
height:108px;
border-radius:113px;
background-color:rgba(255,255,255,100);
}.infoContainer-div{margin-left:22px;
margin-top:147px;
display:flex;
flex-flow:column;
}.studentName-p{width:61px;
height:29px;
color:rgba(255,255,255,100);
font-size:20px;
text-align:left;
font-family:SourceHanSansSC-medium;
}.quote-p{width:70px;
height:17px;
color:rgba(255,255,255,86);
font-size:11px;
text-align:left;
font-family:SourceHanSansSC-light;
}.foucus-p{width:130px;
height:21px;
color:rgba(255,255,255,100);
font-size:14px;
text-align:left;
font-family:SourceHanSansSC-regular;
}.bottomSelecter-div{width:1400px;
height:72px;
line-height:14px;
color:rgba(16,16,16,100);
font-size:10px;
text-align:center;
font-family:Roboto;
display:flex;
flex-flow:row;
}.myCourse-button{margin-left:531px;
width:112px;
line-height:72px;
color:rgba(255,5,47,100);
font-size:14px;
text-align:center;
font-family:MicrosoftYahei;
}.myDisscussion-button{line-height:72px;
width:112px;
color:rgba(255,5,47,100);
font-size:14px;
text-align:center;
font-family:MicrosoftYahei;
}.achievement-button{line-height:72px;
width:112px;
color:rgba(255,5,47,100);
font-size:14px;
text-align:center;
font-family:MicrosoftYahei;
}
</style>
