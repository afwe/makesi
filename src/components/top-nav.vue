<template>
    <div class='navContainer'>
        <div class="logo-img" :style="backgroundL">
        </div>
        <div class="name-p">
            互动课程
        </div>
        <div class="mainpage-div texiao pointer" @click="$router.push('/main')">
            主页
        </div>
        <div class="course-button texiao pointer" @click="$router.push('/course')">
            课程
        </div>
        <div class="wordBase-button texiao pointer" @click="$router.push('/wordBase')">
            词库
        </div>
        <div class="manage-button texiao pointer" @click="$router.push('/manage')" v-show='isLogin == true && monitor == true'>
            管理中心
        </div>
        <div class="manage-button texiao pointer" @click="$router.push('/manage')" v-show='isLogin == true && monitor == false'>
            个人资料
        </div>
        <div class="search-input pointer" :style="backgroundS">
        </div>
        <div class="avator-img pointer" :style="backgroundA" @click="showLogin=!isLogin">
        </div>
        <el-dialog title="大国工业" :visible.sync="showLogin" @close="closePanel" :modal-append-to-body="false">
            <div>
            <input class="info-input" type="text" v-model="userID" placeholder="用户名">
            </div>
            <div>
            <input class="info-input" type="text" v-model="userPassword" placeholder="密码">
            </div>
            <el-radio v-model="teacherLogin" label="false">学生</el-radio>
            <el-radio v-model="teacherLogin" label="true">教师</el-radio>
            <el-radio-button class="loginButton" @click.native="doLogin()">
                登录
            </el-radio-button>
            <el-radio-button class="loginButton" v-on:click.native="doRegister()">
                注册
            </el-radio-button>
        </el-dialog>
    </div>
</template>
<script>
import {student_login, student_register, checkLogin_Student} from '../fetch/student_data'
import {teacher_login, teacher_register, checkLogin_Teacher} from '../fetch/teacher_data'
export default{
    data(){
        return{
            backgroundL: {
                backgroundImage: 'url('+require('../assets/logo1.png')+')'
            },
            backgroundS: {
                backgroundImage: 'url('+require('../assets/mb-search.svg')+')'
            },
            backgroundA: {
                backgroundImage: 'url('+require('../assets/avator.svg')+')'
            },
            teacherRegister: "false",
            teacherLogin: "false",
            isLogin: false,
            showLogin: false,
            showRegister: false,
            monitor: false,
            loginMode: "login",
            avatorSrc: require("../assets/logo.png"),
            mode: "login",
            userID: "",
            userPassword: "",
            userIden: "",
            userClass: "",
            userNick: "未登录",
            userMail: "",
            btnAva: true,
        }
    },
    mounted(){
        localStorage.setItem("Login", false);
        localStorage.setItem("monitor", false);
        this.checkLogin_Teacher().then(
            (flag) => {
            if(flag){
                localStorage.setItem("Login", true);
                localStorage.setItem("monitor", false);
            }
        }).then(()=>{
        if(!this.isLogin){
            this.checkLogin_Student().then(
                (flag) => {
                    if(flag){
                        localStorage.setItem("Login", true);
                        localStorage.setItem("monitor", false);
                    }
            })
        }});
        
    },
    methods:{
        closepanel: function(){
            this.showLogin = false;
        },
        checkLogin_Student: async function(){
            let response;
            response = await checkLogin_Student({});
            if(response.code == 200){
                console.log(response)
                this.isLogin = true;
                this.monitor = false;
                this.userNick = response.data.studentName;
                console.log(this.userNick);
                localStorage.setItem("nick", response.data.studentName);
                localStorage.setItem("userID", response.data.studentId);
                localStorage.setItem("userNumber", response.data.studentNumber);
                return true;
            }
            return false;
        },
        checkLogin_Teacher: async function(){
            let response;
            response = await checkLogin_Teacher({});
            if(response.code == 200){
                console.log(response)
                this.isLogin = true;
                this.monitor = true;
                return true;
            }
            return false;
        },
        hideLogin:function(){
            this.showLogin = false;
        },
        doLogin:async function(){
            if(!this.btnAva) return;
            this.btnAva = false;
            if(this.teacherLogin == "true" ){
                let response = await teacher_login({email: this.userID,pwd: this.userPassword});
                console.log(response);
                if(response.code== 200){
                    localStorage.setItem("token", response.data);
                    this.isLogin = true;
                    this.monitor = true;
                    this.$message({
                        message:"登录成功",
                        type:"success"
                    });
                    this.showLogin = false;
                }
                else{
                    this.$message({
                        message:"登录失败",
                        type:"error"
                    })
                }
            } else {
                let response = await student_login({email: this.userID,pwd: this.userPassword});
                if(response.code== 200){
                    localStorage.setItem("token", response.data);
                    this.isLogin = true;
                    this.$message({
                        message:"登录成功",
                        type:"success"
                    });
                    this.showLogin = false;
                }
                else{
                    this.$message({
                        message:response.msg,
                        type:"error"
                    })
                }
            }
            this.btnAva=true;
        },
        doRegister:async function(){
            if(!this.btnAva) return;
            this.btnAva = false;
            if(this.teacherRegister == "true"){
                let response = await teacher_register({email:this.userID,pwd:this.userPassword});
                if(response.code == 200){
                    this.$message({
                        message:"注册成功",
                        type:"success"
                    })
                }
                else{
                    this.$message({
                        message: "注册失败",
                        type:"error"
                    })
                } 
            } else{
                let response = await student_register({email:this.userID,pwd:this.userPassword});
                if(response.code == 200){
                    this.$message({
                        message:"注册成功",
                        type:"success"
                    })
                }
                else{
                    this.$message({
                        message: "注册失败",
                        type:"error"
                    })
                } 
            }
            
            this.btnAva=true;
        },
        doLogout:async function(){
            localStorage.clear();
        },
        dropDownListener: function(type){

            if(type == "login"){
                this.showLogin = true;
            }else if(type == "register"){
                this.showRegister = true;
            }else if(type == "logout"){
                this.isLogin = false;
                this.doLogout();
            }
        }

    }
}
</script>

<style scoped>
/*.loginPosition{
    position: fixed;
    z-index: 1000;
}
.loginPosition{
    height: 300px;
    width: 600px;
}*/
/*
.navContainer{
    height: 117px;
    width: 1920px;
    display: flex;
    flex-flow: row;
}
.logo-img{
    left: 360px;
    top: 15px;
    width: 87px;
    height: 87px;
}
.name-p{
    left: 465px;
    top: 24px;
    width: 48px;
    height: 69px;
    color: rgba(66, 66, 66, 100);
    font-size: 36px;
    text-align: left;
    font-family: SourceHanSansSC-regular;
}
.mainpage-div{
    left: 753px;
    top: 15px;
    width: 133px;
    height: 87px;
    line-height: 29px;
    background-color: rgba(255, 255, 255, 100);
    color: rgba(66, 66, 66, 100);
    font-size: 20px;
    text-align: center;
    font-family: Roboto;
}
.course-button{
    left: 893px;
    top: 15px;
    width: 133px;
    height: 87px;
    line-height: 29px;
    background-color: rgba(255, 255, 255, 100);
    color: rgba(61, 90, 254, 100);
    font-size: 20px;
    text-align: center;
    font-family: Roboto;
}
.wordBase-button{
    left: 1034px;
    top: 15px;
    width: 133px;
    height: 87px;
    line-height: 29px;
    background-color: rgba(255, 255, 255, 100);
    color: rgba(66, 66, 66, 100);
    font-size: 20px;
    text-align: center;
    font-family: Roboto;
}
.search-input{
    left: 1464px;
    top: 41px;
    width: 34px;
    height: 34px;
    background-color: rgba(66, 66, 66, 100);
}
.avator-img{
    left: 1506px;
    top: 31px;
    width: 54px;
    height: 54px;
    background-color: rgba(66, 66, 66, 100);
}*/
/*
.navContainer{
    width: 1920px;
    height: 117px;
    display: flex;
    flex-flow: row;
    background-color: rgba(255, 255, 255, 100);
    color: rgba(16, 16, 16, 100);
    font-size: 14px;
    text-align: center;
    font-family: Roboto;
}
.logo-img{
    color: rgba(255, 5, 47, 100);
    margin-left: 360px;
    margin-top: 24px;
    width: 137px;
    height: 61px;
    background: no-repeat center top;
    background-size:100% 100%;
}
.name-p{
    margin-top: 57px;
    width: 222px;
    line-height: 28px;
    color: rgba(66, 66, 66, 100);
    font-size: 20px;
    text-align: left;
    font-family: SourceHanSansSC-light;
}
.mainpage-div{
    margin-left: 34px;
    margin-top: 15px;
    width: 133px;
    height: 87px;
    line-height: 87px;
    background-color: rgba(255, 255, 255, 100);
    color: rgba(66, 66, 66, 100);
    font-size: 20px;
    text-align: center;
    font-family: Roboto;
}
.course-button{
    margin-left: 7px;
    margin-top: 15px;
    width: 133px;
    height: 87px;
    line-height: 87px;
    background-color: rgba(255, 255, 255, 100);
    color: rgba(66, 66, 66, 100);
    font-size: 20px;
    text-align: center;
    font-family: Roboto;
}
.wordBase-button{
    margin-left: 7px;
    margin-top: 15px;
    line-height: 87px;
    width: 133px;
    height: 87px;
    background-color: rgba(255, 255, 255, 100);
    color: rgba(66, 66, 66, 100);
    font-size: 20px;
    text-align: center;
    font-family: Roboto;
}
.search-input{
    margin-left: 279px;
    margin-top: 41px;
    width: 34px;
    height: 34px;
    background-color: rgba(66, 66, 66, 100);
    background: no-repeat center top;
    background-size:100% 100%;
}
.avator-img{
    margin-left: 8px;
    margin-top: 31px;
    width: 54px;
    height: 54px;
    background-color: rgba(66, 66, 66, 100);
    background: no-repeat center top;
    background-size:100% 100%;
}*/
.navContainer{margin:0 auto;
width:1400px;
height:85px;
display:flex;
flex-flow:row;
background-color:rgba(255,255,255,100);
color:rgba(16,16,16,100);
font-size:10px;
text-align:center;
font-family:Roboto;
}.logo-img{color:rgba(255,5,47,100);
margin-left:262px;
margin-top:17px;
width:98px;
height:43px;
background:no-repeatcentertop;
background-size:100%100%;
}.name-p{margin-top:41px;
width:161px;
line-height:20px;
color:rgba(66,66,66,100);
font-size:13px;
text-align:left;
font-family:SourceHanSansSC-light;
}.mainpage-div{margin-left:23px;
margin-top:10px;
width:96px;
height:62px;
line-height:62px;
background-color:rgba(255,255,255,100);
color:rgba(66,66,66,100);
font-size:13px;
text-align:center;
font-family:Roboto;
}.course-button{margin-left:5px;
margin-top:10px;
width:96px;
height:62px;
line-height:62px;
background-color:rgba(255,255,255,100);
color:rgba(66,66,66,100);
font-size:13px;
text-align:center;
font-family:Roboto;
}.wordBase-button{margin-left:5px;
margin-top:10px;
line-height:62px;
width:96px;
height:62px;
background-color:rgba(255,255,255,100);
color:rgba(66,66,66,100);
font-size:13px;
text-align:center;
font-family:Roboto;
}.manage-button{margin-left:5px;
margin-top:10px;
line-height:62px;
width:96px;
height:62px;
background-color:rgba(255,255,255,100);
color:rgba(66,66,66,100);
font-size:13px;
text-align:center;
font-family:Roboto;
}
.search-input{margin-left:202px;
margin-top:28px;
width:23px;
height:23px;
background:no-repeatcentertop;
background-size:100%100%;
}.avator-img{margin-left:5px;
margin-top:22px;
width:38px;
height:38px;
background:no-repeatcentertop;
background-size:100%100%;
}
.texiao{
 filter: hue-rotate(115deg);
}
.texiao:hover{
  background: #21ebff;
  color: #111;
  box-shadow: 0 0 50px #21ebff;
  transition-delay: 0.5s;
}

.texiao::before{
  content: '';
  position: absolute;
  top:0;
  left: 0;
  width: 10px;
  height: 10px;
  border-top:2px solid #21ebff;
  border-left:2px solid #21ebff;
  transition: 0.5s;
  transition-delay: 0.5s;
}
.texiao:hover::before{
  width: 100%;
  height: 100%;
  transition-delay: 0s;
}
.texiao::after{
  content: '';
  position: absolute;
  right:0;
  bottom: 0;
  width: 10px;
  height: 10px;
  border-bottom:2px solid #21ebff;
  border-right:2px solid #21ebff;
  transition: 0.5s;
  transition-delay: 0.5s;
}

.texiao:hover::after{
  width: 100%;
  height: 100%;
  transition-delay: 0s;
}
.pointer{

}
.pointer:hover{
      cursor:pointer;
      /*光标呈现为指示链接的指针（一只手）*/
}
</style>