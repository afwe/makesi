<template>
    <div class='navContainer' :style="navBackGroundColor">
        <div class="mask" v-show="showMask">
        </div>
        <div class="logo-img" :style="backgroundL">
        </div>
        <div class="name-p" :style="navBackGroundColor,titleColor">
            互动课程
        </div>
        <div class="mainpage-div texiao pointer" @click="$router.push('/main');selectedBlock='main'"  :class="{ 'selectedColorMain': selectedBlock=='main'&&colorMode=='main','selectedColor': selectedBlock=='main'}" :style="navFontColor">
            <span id="mainpage" :style="mainpageDivColor">主页</span>
        </div>
        <div class="course-button texiao pointer" @click="$router.push('/course');selectedBlock='course'" :class="{ 'selectedColorMain': selectedBlock=='course'&&colorMode=='main', 'selectedColor': selectedBlock=='course'}" :style="navFontColor">
            课程
        </div>
        <div class="wordBase-button texiao pointer" @click="$router.push('/wordBase');selectedBlock='word'" :class="{ 'selectedColorMain': selectedBlock=='word'&&colorMode=='main', 'selectedColor': selectedBlock=='word'}" :style="navFontColor">
            词库
        </div>
        <div class="search-input pointer" :style="backgroundS" @click="showSearch=true;showMask=true;$emit('showM');">
        </div>

        <el-dropdown trigger="hover" @command="handleCommand">
            <div class="avator-img pointer" :style="backgroundA">
            </div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item class="videoItem-div pointer" v-for="(item,index) in avatorOptions" :command="item.title">
                    {{item.title}}
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

        <div class="loginNest-div">
            <searchpanel v-show="showSearch == true" @closeP="closeSearch">
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
    inject:['isMonitor'],
    data(){
        return{
            selectedBlock: 'main',
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
            navBackGroundColor: {
                backgroundColor: 'rgba(255,255,255,0)'
            },
            navFontColor:{
                color:'rgb(255,255,255,0.7)',
            },
            titleColor:{
                color:'white'
            },
            mainpageDivColor:{
                color:'white'
            },
            mainpageDivColorMode:{
                main:{
                    color: 'white',
                },
                userInfo:{
                    color:'white'
                },
                common:{
                    color: 'black',
                }
            },
            backgroundColorMode: {
                main:{
                    backgroundColor: 'rgba(255,255,255,0)',
                },
                userInfo:{
                    backgroundColor: 'rgba(0, 0, 0, 0.1);',
                },
                common:{
                    backgroundColor: 'rgba(255,255,255,100)',
                }
            },
            fontColorMode:{
                main:{
                    color:'rgb(255,255,255,0.7)',
                },
                userInfo:{
                    color:'white'
                },
                common:{
                    color: 'black'
                }
            },
            titleColorMode:{
                main: {
                    color:'white'
                },
                userInfo: {
                    color: 'white'
                },
                common: {
                    color: 'black'
                }
            },
            avatorOptions:[
                {
                    title: '登录',
                }
            ],
            studentOptions:[
                {
                    title: '登出',
                },
                {
                    title: '个人主页',
                }
            ],
            teacherOptions: [
                {
                    title: '登出',
                },
                {
                    title: '管理中心',
                },
                {
                    title: '个人主页',
                }
            ],
            teacherRegister: "false",
            teacherLogin: "true",
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
            recWord:['毛泽东思想', '中国近代史纲要', '毛泽东诗集' ,'东方艺术史'],
            colorMode:'main',
            showMask: false
        }
    },
    watch:{
        $route(to,from){
            let nowPath=to.path;
            nowPath=nowPath.substr(1,nowPath.length-1);
            console.log(nowPath);
            switch(nowPath){
                case 'main': 
                    this.colorMode='main'
                    break;

                case 'userInfo': 
                    this.colorMode ='userInfo'
                    break;

                default: 
                    this.colorMode = 'common'
                    console.log("?")
            }
            this.navBackGroundColor = this.backgroundColorMode[this.colorMode]
            console.log()
            this.navFontColor = this.fontColorMode[this.colorMode]
            this.titleColor = this.titleColorMode[this.colorMode]
            this.mainpageDivColor = this.mainpageDivColorMode[this.colorMode]
        }
    },
    
    mounted(){
        this.navBackGroundColor = this.backgroundColorMode['main'];
        window.addEventListener('scroll', this.positionWatcher, true);
        localStorage.setItem("Login", false);
        localStorage.setItem("monitor", false);
        let self=this;
        this.checkLogin_Teacher().then(
            (flag) => {
            if(flag){
                localStorage.setItem("Login", true);
                localStorage.setItem("monitor", true);
                if(self.isLogin==true){
                    self.avatorOptions.length=0;
                    this.isMonitor = true;
                    console.log(this.isMonitor)
                    console.log(self.avatorOptions.length);
                    self.avatorOptions=self.teacherOptions;
                }
            }
        }).then(()=>{
        if(!this.isLogin){
            this.checkLogin_Student().then(
                (flag) => {
                    if(flag){
                        localStorage.setItem("Login", true);
                        localStorage.setItem("monitor", false);
                        if(self.isLogin==true){
                            self.avatorOptions.slice(0, self.avatorOptions.length);
                            console.log(self.avatorOptions.length);
                            self.avatorOptions=self.studentOptions;
                        }
                    }
            })
        }});
        
    },
    methods:{
        closeSearch(){
            this.showMask = false;
            this.showSearch = false;
            this.$emit('hideM');
       },
        handleCommand(command){
            switch(command){
                case '登录':
                    this.$emit('showM');
                    this.showMask=true;
                    this.showLogin=true;
                    break;
                case '登出':
                    this.doLogout();
                    break;
                case '个人主页':
                    this.$router.push('/userInfo');
                    break;
                case '管理中心':
                    this.$router.push('/manage');
                    break;
                default: 
                    break;
            }
        },
        positionWatcher(e){
            let top = document.documentElement.scrollTop || document.body.scrollTop;
            if(top>581){
                this.navBackGroundColor = this.backgroundColorMode['common'];
                this.navFontColor = this.fontColorMode['common'];
                this.titleColor = this.titleColorMode['common'];
                this.mainpageDivColor = this.mainpageDivColorMode['common'];
                if(this.selectedBlock=='main'){
                    this.mainpageDivColor = { color : "red"};
                }
            } else{
                this.navBackGroundColor = this.backgroundColorMode[this.colorMode];
                this.navFontColor = this.fontColorMode[this.colorMode];
                this.titleColor = this.titleColorMode[this.colorMode];
                this.mainpageDivColor = this.mainpageDivColorMode[this.colorMode];
            }
        },
        doLogout(){
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
            this.showMask=false;
            this.$emit('hideM');
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
                this.isMonitor = true;
                this.isLogin = true;
                this.monitor = true;
                this.$emit("teacherL");
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
                    window.location.reload();
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
                    window.location.reload();
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
        }
    }
}
</script>

<style scoped>
.selectedColor{
    color:red !important;
    font-weight:800 !important;
}
.selectedColorMain{
    color:white;
    font-weight: 800 !important;
}
.mask{
    width: 100%;
    height: 100%;
    background-color: rgb(0,0,0,0.2);
    position: absolute;
    z-index: 1002;
}
.navContainer{
    z-index: 1001;
    top:0;
    position: fixed;
width:100%;
height:85px;
display:flex;
flex-flow:row;
font-size:10px;
text-align:center;
font-family:Roboto;
}.logo-img{color:rgba(255,5,47,100);
margin-left:calc(50% - 450px);
margin-top:17px;
width:98px;
height:43px;
background-size:100%100%;
}.name-p{margin-top:41px;
width:161px;
line-height:20px;
font-size:13px;
text-align:left;
font-family:SourceHanSansSC-light;
}.mainpage-div{margin-left:23px;
margin-top:10px;
width:96px;
height:62px;
line-height:62px;
font-size:13px;
text-align:center;
font-family:Roboto;
}.course-button{margin-left:5px;
margin-top:10px;
width:96px;
height:62px;
line-height:62px;
font-size:13px;
text-align:center;
font-family:Roboto;
}.wordBase-button{margin-left:5px;
margin-top:10px;
line-height:62px;
width:96px;
height:62px;
font-size:13px;
text-align:center;
font-family:Roboto;
}.manage-button{margin-left:5px;
margin-top:10px;
line-height:62px;
width:96px;
height:62px;
font-size:13px;
text-align:center;
font-family:Roboto;
}
.search-input{margin-left:235px;
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
 filter: hue-rotate(0deg);
}
/*.texiao:hover{
  background: #ff5d52;
  box-shadow: 0 0 50px #ff5d52;
  transition-delay: 0.5s;
}*/

.texiao::before{
  content: '';
  position: absolute;
  top:0;
  left: 0;
  width: 10px;
  height: 10px;
  border-top:2px solid #ff5d52;
  border-left:2px solid #ff5d52;
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
  border-bottom:2px solid #ff5d52;
  border-right:2px solid #ff5d52;
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
 left:calc(50% - 335px); 
 top:calc(200%);
z-index: 10001;
}.loginContainer{background-color:white;
width:669px;
height:382px;
line-height:14px;
border-radius:43px;
text-align:center;
border:0 px solid rgba(187,187,187,100);
display:flex;
flex-flow:row;
z-index: 10001;
}.login-img{width:360px;
height:306px;
margin-top:37px;
margin-left:22px;
}.loginContainer-div{display:flex;
flex-flow:column;
}.close-button{background-color:white;
height:26px;
width:26px;
margin-left:231px;
margin-top:26px;
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
}.userCount-input{
    margin-top:32px;
height:35px;
width:207px;
line-height:14px;
background-color:rgba(255,255,255,100);
color:rgba(189,189,189,100);
font-size:10px;
text-align:left;
font-family:Roboto;
border:0px solid rgba(224,224,224,100);
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
border:0px solid rgba(224,224,224,100);
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
}
</style>