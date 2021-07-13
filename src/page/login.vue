<template>
    <div class="mainContainer">
        <div class="login" v-bind="mode == 'login'">
        </div>
        <div class="register" v-bind="mode == 'register'">
        </div>
        <div class="forgetPassword" v-bind="mode == 'forgetPassword'">
        </div>
    </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'

export default{
    data(){
        return{
            mode: "login",
            userID: "",
            userPassword: "",
            userIden: "",
            userClass: "",
            userName: "",
            userMail: "",
        }
    },

}
</script>
