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
            <div class="item" @click="$router.push('/admin')" v-show='isLogin == true && monitor == true'>
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
                    <el-dropdown-item command="personal" disa>{{userNick}}</el-dropdown-item>
                    <el-dropdown-item v-if="isLogin==false" command="login">登录</el-dropdown-item>
                    <el-dropdown-item v-if="isLogin==false" command="register">注册</el-dropdown-item>
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
        <el-radio-button class="loginButton" v-on:click.native="doLogin()">
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
import { defineComponent } from '@vue/composition-api'

export default{
    data(){
        return{
            isLogin: false,
            showLogin: false,
            showRegister: false,
            avatorSrc: require("../assets/logo.png"),
            mode: "login",
            userID: "",
            userPassword: "",
            userIden: "",
            userClass: "",
            userNick: "未登录",
            userMail: "",
        }
    },
    methods:{
        close() {
            this.$emit("close");
        },
        logout: function(){
            localStorage.clear();
        },
        hideLogin:function(){
            console.log("!");
            this.showLogin = false;
        },
        doLogin:async function(){
            if(!this.isDone) return;
            this.isDone=false;
            if(localStorage.getItem("userID")!=null) {
                this.$message({
                    message:"已登录",
                    type:"error"
                })
                setTimeout(() => {
                    this.isDone=true;
                }, 1000);
                return;
            }
            let response = await login({userID: this.userID,password: this.password});
            if(response.code== 200){

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
            if(localStorage.getItem("role")==2) this.isAdmin = true;
            this.isDone=true;
        },
        doRegister:async function(){
            if(!this.isDone) return;
            this.isDone=false;
            let response = await register({userID:this.userID,password:this.password});
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
            this.isDone=true;
        },
        dropDownListener: function(type){

            if(type == "login"){
                this.showLogin = true;
            }else if(type == "register"){
                this.showRegister = true;
            }else if(type == "personal"){
                
            }
        }

    }
}
</script>

<style scoped>
.navContainer{
    height: 64px;
    width: 100%;
}
.loginPosition{
    height: 300px;
    width: 600px;
}
</style>