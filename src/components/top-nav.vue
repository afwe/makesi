<template>
    <div class='navContainer'>
    <el-menu mode="horizontal" class='navContainer'>
        <el-menu-item class="item">
            <div class="item" @click="$router.push('/main')">
                主页
            </div>
        </el-menu-item>
        <el-menu-item class="item">
            <div class="item" @click="$router.push('/course')">
                课程
            </div>
        </el-menu-item>
        <el-menu-item class="item">
            <div class="item" @click="$router.push('/class')" v-show='isLogin'>
                班级
            </div>
            <div class="item" @click="showRegister = true" v-show='!isLogin'>
                注册
            </div>
        </el-menu-item>
        <el-menu-item class="item">
            <div class="item" @click="$router.push('/user')" v-show='isLogin'> 
                个人中心
            </div>
            <div class="item" @click="showRegister = true" v-show='!isLogin'>
                登录
            </div>
        </el-menu-item>
    </el-menu>
    <el-card class="loginPosition" v-show="showLogin">
    <div class="loginForm" v-show="showLogin">
        <div>
        <input class="info-input" type="text" v-model="userID" placeholder="用户名">
        </div>
        <div>
        <input class="info-input" type="text" v-model="password" placeholder="密码">
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
        <input class="info-input" type="text" v-model="password" placeholder="密码">
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
            mode: "login",
            userID: "",
            userPassword: "",
            userIden: "",
            userClass: "",
            userName: "",
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
        }

    }
}
</script>
