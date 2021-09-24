<template>
    <div class='navContainer'>
    <!--<el-menu default-active="1" mode="horizontal" class='navContainer'>
        <el-menu-item class="item" index="1" @click="$router.push('/main')">
            主页
        </el-menu-item>
        <el-menu-item class="item" index="3">
            <div class="item" @click="$router.push('/class')" v-show='isLogin'>
                班级
            </div>
        </el-menu-item>
        <el-menu-item class="item" index="4">
            <div class="item" @click="$router.push('/user')" v-show='isLogin == true && monitor == false'> 
                个人中心
            </div>
            <div class="item" @click="$router.push('/manage')" v-show='isLogin == true && monitor == true'>
                 管理中心
            </div>
            <div class="item" @click="showLogin=true" v-show='!isLogin'>
                登录/注册
            </div>
        </el-menu-item>
        <el-menu-item class="item">
            <el-dropdown class="item" @command="dropDownListener">
                <el-avatar>
                    <img :src="avatorSrc" style="height: 40px;border-radius: 50%"/>
                </el-avatar>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="personal" >{{userNick}}</el-dropdown-item>
                    <el-dropdown-item v-if="isLogin==false" command="login">登录</el-dropdown-item>
                    <el-dropdown-item v-if="isLogin==false" command="register">注册</el-dropdown-item>
                    <el-dropdown-item v-if="isLogin==true" command="logout">登出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-menu-item>
    </el-menu>
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
    <!--
    <el-card class="loginPosition" v-show="showRegister">
    <div class="loginForm" v-show="showRegister">
        <div>
        <input class="info-input" type="text" v-model="userID" placeholder="用户名">
        </div>
        <div>
        <input class="info-input" type="text" v-model="userPassword" placeholder="密码">
        </div>
        <el-radio v-model="teacherRegister" label="false">学生</el-radio>
        <el-radio v-model="teacherRegister" label="true">教师</el-radio>
        <el-radio-button class="loginButton" v-on:click.native="doRegister()">
            注册
        </el-radio-button>
        <el-radio-button class="closeButton" v-on:click.native="showRegister=false">
            关闭
        </el-radio-button>
    </div>
    </el-card>-->
        <div class="logo-img">
            logo
        </div>
        <div class="name-p">name

        </div>
        <div class="mainpage-div">
            主页
        </div>
        <div class="course-button">
            课程
        </div>
        <div class="wordBase-button">
            词库
        </div>
        <div class="search-input">
            搜索
        </div>
        <div class="avator-img">
            头像
        </div>
    </div>
</template>
<script>
import {student_login, student_register, checkLogin_Student} from '../fetch/student_data'
import {teacher_login, teacher_register, checkLogin_Teacher} from '../fetch/teacher_data'
export default{
    data(){
        return{
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
                if(response.code== 200){
                    localStorage.setItem("token", response.data);
                    this.isLogin = true;
                    this.monitor = true;
                    console.log(response);
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
.navContainer{height:68px;
width:1120px;
display:flex;
flex-flow:row;
margin:auto;
background:rgba(0,0,0,0);
}.logo-img{left:210px;
top:8px;
width:50px;
height:50px;
}.name-p{left:271px;
top:14px;
width:28px;
height:40px;
color:rgba(66,66,66,100);
font-size:21px;
text-align:left;
font-family:SourceHanSansSC-regular;
}.mainpage-div{left:439px;
top:8px;
width:77px;
height:50px;
line-height:16px;
background-color:rgba(255,255,255,100);
color:rgba(66,66,66,100);
font-size:11px;
text-align:center;
font-family:Roboto;
}.course-button{left:520px;
top:8px;
width:77px;
height:50px;
line-height:16px;
background-color:rgba(255,255,255,100);
color:rgba(61,90,254,100);
font-size:11px;
text-align:center;
font-family:Roboto;
}.wordBase-button{left:603px;
top:8px;
width:77px;
height:50px;
line-height:16px;
background-color:rgba(255,255,255,100);
color:rgba(66,66,66,100);
font-size:11px;
text-align:center;
font-family:Roboto;
}.search-input{left:854px;
top:23px;
width:19px;
height:19px;
background-color:rgba(66,66,66,100);
}.avator-img{left:878px;
top:18px;
width:31px;
height:31px;
background-color:rgba(66,66,66,100);
}
</style>