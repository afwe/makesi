<template>
    <div class="loginContainer">
        <div class="login-img">
        </div>
        <div class="loginContainer-div">
            <div class="productName-p">
                红育
            </div>
            <div class="productQuote-p">
                打通专业教育与思政教育紧密融合“最后一公里”
            </div>
            <input class="userCount-input" placeholder="输入账号">
                <div class="count-img">
                </div>
            </input>
            <input class="userPassword-input"  placeholder="输入密码">
                <div class="password-img">
                </div>
            </input>
            <button class="loginButton-button" @click="doLogin()">
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
</template>
<script>
export default{
    name: 'loginPanel',
    data(){
        return{

        }
    },
    mounted(){

    },
    methods: []
}
</script>
<style scoped>
.loginContainer{
width: 918px;
height: 524px;
line-height: 20px;
border-radius: 60px;
text-align: center;
border: 1px solid rgba(187, 187, 187, 100);
display: flex;
flex-flow: row;
}
.login-img{
width: 560px;
height: 420px;
}
.loginContainer-div{
    display: flex;
    flex-flow: column;
}
.productName-p{
    margin-top: 56px;
line-height: 70px;
color: rgba(16, 16, 16, 100);
font-size: 48px;
text-align: left;
font-family: SourceHanSansSC-medium;
}
.productQuote-p{
line-height: 26px;
color: rgba(158, 158, 158, 100);
font-size: 16px;
text-align: left;
font-family: SourceHanSansSC-light;
}
.userCount-input{
    margin-top:44px;
    width: 312px;
line-height: 20px;
background-color: rgba(255, 255, 255, 100);
color: rgba(189, 189, 189, 100);
font-size: 14px;
text-align: left;
font-family: Roboto;
border: 1px solid rgba(224, 224, 224, 100);
}

.count-img{
    margin-top: 9px;
    margin-left: 12px;
width: 24px;
height: 24px;
background-color: rgba(189, 189, 189, 100);
}
.userPassword-input{
    margin-top: 20px;
    width: 312px;
line-height: 20px;
background-color: rgba(255, 255, 255, 100);
color: rgba(189, 189, 189, 100);
font-size: 14px;
text-align: left;
font-family: Roboto;
border: 1px solid rgba(224, 224, 224, 100);
}
.password-img{
margin-top: 9px;
    margin-left: 12px;
width: 24px;
height: 24px;
background-color: rgba(189, 189, 189, 100);
}
.loginButton-button{
margin-top: 36px;
margin-left: 23px;
width: 260px;
height: 50px;
line-height: 32px;
border: none;
border-radius: 40px;
background-color: rgba(255, 5, 47, 100);
color: white;
font-size: 22px;
text-align: center;
font-family: Roboto;
}
.register-p{
    margin-top: 17px;
    line-height: 21px;
color: rgba(158, 158, 158, 100);
font-size: 14px;
text-align: left;
font-family: SourceHanSansSC-light;
}
.el-input__inner{
    height: 48px;
}
</style>
