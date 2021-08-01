<template>
    <div class='navContainer'>
    <el-menu default-active="1" mode="horizontal" class='navContainer'>
        <el-menu-item class="item" index="1" @click="$router.push('/main')">
            主页
        </el-menu-item>
        <el-menu-item class="item" index="2" @click="$router.push('/course')">
            课程
        </el-menu-item>
        <el-menu-item class="item" index="3">
            <div class="item" @click="$router.push('/class')" v-show='isLogin'>
                班级
            </div>
            <div class="item" @click="showRegister = true" v-show='!isLogin'>
                注册
            </div>
        </el-menu-item>
        <el-menu-item class="item" index="4">
            <div class="item" @click="$router.push('/user')" v-show='isLogin == true && monitor == false'> 
                个人中心
            </div>
            <div class="item" @click="$router.push('/manage')" v-show='isLogin == true && monitor == true'>
                 管理中心
            </div>
            <div class="item" @click="showLogin = true" v-show='!isLogin'>
                登录
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
    <el-card class="loginPosition" v-show="showLogin">
    <div class="loginForm" v-show="showLogin">
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
        <el-radio-button class="closeButton" v-on:click.native="hideLogin()">
            关闭
        </el-radio-button>
    </div>
    </el-card>
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
    </el-card>
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
        close() {
            this.$emit("close");
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
            console.log("!");
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
.loginPosition{
    position: fixed;
    z-index: 1000;
}
.navContainer{
    height: 64px;
    width: 100%;
}
.loginPosition{
    height: 300px;
    width: 600px;
}
</style>