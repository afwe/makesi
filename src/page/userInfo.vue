<template>
<div class="pageContainer">
    <div class="mask" v-show="showMask==true">
    </div>
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
        <div class="courseContainer" @click="showCreate=true;showMask=true" v-show="manageMode.is==true">
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
            <div class="close-img" @click="closeDialog">
            </div>
        </div>
        <div class="line">
        </div>
        <div class="titleSet-div">
            <div class="newTitle-p">
                名称
            </div>
            <textarea class="newCourseTitle"  v-model="newCourseTitle">
            </textarea>
        </div>
        <div class="descSet-div">
            <div class="newDesc-p">
                简介
            </div>
            <textarea class="newCourseDesc" v-model="newCourseDesc">
            </textarea>
        </div>
        <div class="faceSet-div">
            <div class="newFace-p">
                封面
            </div>
            <div class="newCourseFace">
            <el-dialog title="上传视频" :visible.sync="showUpload" @close="showUpload=false" :modal-append-to-body="false">
                <upload>
                </upload>
        </el-dialog>
            <el-button class="createCourse" @click="showUpload=!showUpload">
            上传视频
        </el-button>
            </div>
        </div>
        <div class="line">
        </div>
        <div class="btnNest">
            <button class="cancel-button" @click="closeDialog">
                取消
            </button>
            <button class="create-button" @click="createCourse">
                创建
            </button>
        </div>
    </div>
</div>
</template>
<script>
import {create_course, create_course_identify} from '../fetch/course';
import upload from './imageUploadTest.vue';
import {getPartListByCourseID, deletePartByID} from '../fetch/video';
export default {
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
    },
    inject:{
        manageMode: {
            default:()=>{}
        }
    },
    data(){
        return{
            showMode: 'course',
            name:'',
            gender: '',
            class:'',
            major:'',
            telephone:'',
            mail:'',
            monitor: true,
            userBackground:{
                backgroundImage: 'url('+require('../assets/userInfo.png')+')',
                backgroundSize: "100% 100%" 
            },
            crossBackground:{
                backgroundImage:  'url(' +require('../assets/if-plus.svg')+')',
                backgroundSize: "100% 100%" 
            },
            showCreate: false,
            showMask: false,
            newCourseTitle:"",
            newCourseDesc: "",
        }
    },
    methods:{
        createCourse: async function(){
            let response;
            response = await create_course_identify();
            if(response.code == 200){
                response = await create_course({
                    courseName: this.newCourseTitle,
                    courseIntro: this.newCourseDesc
                });
                if(response.code == 200){
                    this.$message({
                        message:"课程创建成功",
                        type:"success"
                    })
                }
            }
        },
        closeDialog(){
            this.showCreate=false;
            this.showMask=false;
        },
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
        //this.monitor = localStorage.getItem("monitor");
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
.mask{
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 1009;
    background-color: rgb(0,0,0,0.2);
}
.createDialog-div{
    z-index: 1010;
    position: fixed;
    top: calc(50% - 313px);
    left: calc(50% - 455px);
    display: flex;
    flex-flow: column;
    width: 911px;
    height: 627px;
    line-height: 20px;
    border-radius: 6px;
    text-align: center; 
    background-color: white;
}
.dialogHead-div{
        display: flex;
        flex-flow:row;
}
.createDialogTitle-p{
    margin-left: 45px;
    margin-top: 18px;
    line-height: 44px;
    color: rgba(16, 16, 16, 100);
    font-size: 30px;
    text-align: left;
    font-family: SourceHanSansSC-medium;
}
.close-img{
    margin-top: 12px;
    margin-left: 688px;

}
.line{
    width: 100%;
    margin-top: 18px;
    border: 1px solid rgba(224, 224, 224, 100);
}
.titleSet-div{
    margin-top: 41px;
    display: flex;
    flex-flow: row;
}
.newTitle-p{
    margin-left: 45px;
    line-height: 32px;
    color: rgba(117, 117, 117, 100);
    font-size: 22px;
    text-align: left;
    font-family: SourceHanSansSC-regular;
}
.newCourseTitle{
    margin-left:24px;
    width: 753px;
    height: 46px;
    line-height: 46px;
    border-radius: 6px;
    text-align: left;
    border: 1px solid rgba(187, 187, 187, 100);
    resize:none;
}
.descSet-div{
    margin-top: 30px;
    display: flex;
    flex-flow: row;
}
.newDesc-p{
    margin-left: 45px;
    width: 44px;
    line-height: 32px;
    color: rgba(117, 117, 117, 100);
    font-size: 22px;
    text-align: left;
    font-family: SourceHanSansSC-regular;
}
.newCourseDesc{
    margin-left:24px;
    width: 753px;
    height: 105px;
    line-height: 20px;
    border-radius: 6px;
    text-align: left;
    border: 1px solid rgba(187, 187, 187, 100);
    resize:none;
}
.faceSet-div{
    margin-top: 30px;
display: flex;
flex-flow: row;
}
.newFace-p{
    margin-left: 45px;
    width: 44px;
line-height: 32px;
color: rgba(117, 117, 117, 100);
font-size: 22px;
text-align: left;
font-family: SourceHanSansSC-regular;
}
.newCourseFace{
    margin-left:24px;
    width: 227px;
height: 142px;
border-radius: 6px;
}
.btnNest{
    display: flex;
    flex-flow: row;
    margin-left: 654px;
    margin-top:30px;
}
.cancel-button{
    width: 93px;
height: 52px;
border-radius: 6px;
background-color: rgba(238, 238, 238, 100);
color: rgba(97, 97, 97, 100);
font-size: 22px;
text-align: center;
border: none;
font-family: Microsoft Yahei;
}
.create-button{
    margin-left:26px;
    width: 93px;
height: 52px;
border-radius: 6px;
background-color: rgba(255, 5, 47, 100);
color: rgba(255, 255, 255, 100);
font-size: 22px;
text-align: center;
border:none;
font-family: Microsoft Yahei;
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
