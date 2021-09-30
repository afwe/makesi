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
        <div class="manage-button texiao pointer" @click="doLogout()" v-show='isLogin==true'>
            登出
        </div>
        <div class="manage-button texiao pointer" @click="$router.push('/manage')" v-show='isLogin == true && monitor == false'>
            个人资料
        </div>
        <div class="search-input pointer" :style="backgroundS" @click="showSearch=!showSearch">
        </div>
        <div class="avator-img pointer" :style="backgroundA" @click="avatorClick">
        </div>
        <div class="loginNest-div">
            <searchpanel v-show="showSearch == true">
            </searchpanel>
            <div class="Dialog" v-show="showLogin===true">
                <div class="loginContainer">
                    
                    <div class="login-img" :style="backgroundLogin">
                    </div>
                    <div class="loginContainer-div">
                        <div class="close-button pointer" :style="backgroundC" @click="closepanel()">
                        </div>
                        <div class="productName-p">
                            红育
                        </div>
                        <div class="productQuote-p">
                            打通专业教育与思政教育紧密融合“最后一公里”
                        </div>
                        <input class="userCount-input" :style="backgroundU" type="text" v-model="userID" placeholder="输入账号">
                        </input>
                        <input class="userPassword-input" :style="backgroundP"  type="text" v-model="userPassword" placeholder="输入密码">
                        </input>
                        <div class="radioNest-div">
                            <el-radio v-model="teacherLogin" label="false">学生</el-radio>
                            <el-radio v-model="teacherLogin" label="true">教师</el-radio>
                        </div>
                        <button class="loginButton-button pointer" @click="doLogin()">
                            登录
                        </button>
                        <div class="register-p">
                            还没有账号?
                            <a href="">
                                立即注册
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {student_login,student_register, checkLogin_Student} from '../fetch/student_data'
import {teacher_login, teacher_register, checkLogin_Teacher} from '../fetch/teacher_data'
import { loginPanel } from '../page/loginPanel.vue'
import searchpanel from '../page/searchPanel.vue'
export default {
    components: {searchpanel},
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
            backgroundLogin: {
                backgroundImage: 'url('+require('../assets/loginBackg.png')+')',
                backgroundRepeat:'no-repeat',
                backgroundSize:'100% 100%'
            },
            backgroundC: {
                backgroundImage: 'url(' + require('../assets/close.svg')+')'
            },
            backgroundU: {
                backgroundImage: 'url('+require('../assets/user.svg')+')',
                backgroundSize:"20px 20px",
                backgroundPosition: '7px 9px',
                backgroundRepeat:'no-repeat'
            },
            backgroundP: {
                backgroundImage: 'url('+require('../assets/password.svg') +')',
                backgroundSize:"20px 20px",
                backgroundPosition: '7px 9px',
                backgroundRepeat:'no-repeat'
            },
            teacherRegister: "false",
            teacherLogin: "false",
            isLogin: false,
            showLogin: false,
            showSearch: false,
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
            recWord:['毛泽东思想', '中国近代史纲要', '毛泽东诗集' ,'东方艺术史']
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
        doLogout(){
            console.log('1');
            localStorage.clear();
            window.location.reload();
        },
        avatorClick(event){
            if(this.isLogin==true){
                this.$router.push('/userInfo');
            }
            else this.showLogin=true;
        },
        closepanel: function(){
            console.log(this.showLogin)
            this.showLogin = false;
            console.log(this.showLogin)
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
        /*dropDownListener: function(type){

            if(type == "login"){
                this.showLogin = true;
            }else if(type == "register"){
                this.showRegister = true;
            }else if(type == "logout"){
                this.isLogin = false;
                this.doLogout();
            }
        }*/

    }
}
</script>

<style scoped>
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
position: relative;
}.avator-img{
    position: relative;
    margin-left:5px;
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
}.Dialog{position:absolute;
margin: auto;
    top: 85px;
    left: -830px;
z-index: 1001;
}.loginContainer{background-color:white;
width:669px;
height:382px;
line-height:14px;
border-radius:43px;
text-align:center;
border:0pxsolidrgba(187,187,187,100);
display:flex;
flex-flow:row;
}.login-img{width:408px;
height:306px;
}.loginContainer-div{display:flex;
flex-flow:column;
}.close-button{background-color:white;
height:26px;
width:26px;
margin-left:211px;
margin-top:14px;
background-size:100%100%;
}.productName-p{line-height:51px;
color:rgba(16,16,16,100);
font-size:35px;
text-align:left;
font-family:SourceHanSansSC-medium;
}.productQuote-p{line-height:18px;
color:rgba(158,158,158,100);
font-size:11px;
text-align:left;
font-family:SourceHanSansSC-light;
}.userCount-input{margin-top:32px;
height:35px;
width:207px;
line-height:14px;
background-color:rgba(255,255,255,100);
color:rgba(189,189,189,100);
font-size:10px;
text-align:left;
font-family:Roboto;
border:0pxsolidrgba(224,224,224,100);
padding-left:35px;
}.count-img{margin-top:6px;
margin-left:8px;
width:17px;
height:17px;
background-color:rgba(189,189,189,100);
}.userPassword-input{margin-top:14px;
width:207px;
height:35px;
line-height:14px;
background-color:rgba(255,255,255,100);
color:rgba(189,189,189,100);
font-size:10px;
text-align:left;
font-family:Roboto;
border:0pxsolidrgba(224,224,224,100);
padding-left:35px;
}.password-img{margin-top:6px;
margin-left:8px;
width:17px;
height:17px;
background-color:rgba(189,189,189,100);
}.radioNest-div{margin-top:13px;
display:flex;
flex-flow:row;
}.loginButton-button{margin-top:13px;
margin-left:16px;
width:189px;
height:36px;
line-height:23px;
border:none;
border-radius:29px;
background-color:rgba(255,5,47,100);
color:white;
font-size:16px;
text-align:center;
font-family:Roboto;
}.register-p{margin-top:12px;
margin-left:102px;
line-height:15px;
color:rgba(158,158,158,100);
font-size:10px;
text-align:left;
font-family:SourceHanSansSC-light;
}
.el-input__inner{
    height: 48px;
}
.loginNest-div{
    position: relative;
}
</style>