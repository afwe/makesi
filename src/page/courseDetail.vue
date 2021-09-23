<template>
    <div class="mainContainer">
        <div class="courseFace-img">
        </div>
        <div class="btnNest-div">
            <div class="notification-button">
            </div>
            <div class="videoes-button">
            </div>
            <div class="training-button">
            </div>
            <div class="test-button">
            </div>
            <div class="disscussion-button">
            </div>
        </div>
        <div class="notification-div">
        </div>
        <div class="videoList-div">
        </div>
    </div>
</template>
<script>
import { join_course , get_course_by_id} from '../fetch/course'

export default {
    data(){
        return{
            courseID: "1",
            courseName: "test",
            courseIntro: "test",
        }
    },
    mounted(){
        this.courseID = "";
        if(this.$route.query.id != "undefined"){
            this.courseID = this.$route.query.id;
        }
        
        this.render().then(
            (data) => {
                if(data){
                    this.courseName = data.data.courseName;
                    this.courseIntro = data.data.courseIntro;
                }
            }
        )
    },
    methods:{
        joinCourse: async function(){
            console.log(typeof(parseInt(this.courseID)))
            let response = await join_course(parseInt(this.courseID));
            console.log(response)
        },
        toVideo: async function(id){
            this.$router.push({
                path: `/videoes/?id=${id}`
            });
        },
        render:async function(){
            let response = await get_course_by_id(this.courseID);
            console.log(response)
            if(response.code == 200){
                
                return response;
            }
            return false;
        },
        toCourse: async function(id){
            this.$router.push(`course/?id=${id}`);
        },
        getCourses: async function(){
            let response = await get_all_courses();
            if(response.code == 200){
                return response;
            }
            return false;
        }
    }
}
</script>
<style scoped>
.courseFace-img{
    left: 360px;
    top: 168px;
    width: 299px;
    height: 160px;
    border-radius: 12px;
    background-color: rgba(250, 250, 250, 100);
}
.btnNest-div{
    
}
.notification-div{
    left: 675px;
    top: 168px;
    width: 885px;
    height: 438px;
    border-radius: 12px;
}
.videoList-div{
    left: 675px;
    top: 168px;
    width: 885px;
    height: 213px;
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 100);
}
.notification-button{
    left: 360px;
    top: 344px;
    width: 299px;
    height: 56px;
    line-height: 29px;
    border-radius: 12px 12px 0px 0px;
    background-color: rgba(61, 90, 254, 100);
    color: rgba(16, 16, 16, 100);
    font-size: 20px;
    text-align: center;
    font-family: Roboto;
}
.videoes-button{
    left: 359px;
    top: 399px;
    width: 301px;
    height: 57px;
    line-height: 29px;
    background-color: rgba(255, 255, 255, 100);
    color: rgba(66, 66, 66, 100);
    font-size: 20px;
    text-align: center;
    font-family: Roboto;
    border: 1px solid rgba(238, 238, 238, 100);
}
.training-button{
    left: 359px;
    top: 455px;
    width: 301px;
    height: 57px;
    line-height: 29px;
    background-color: rgba(255, 255, 255, 100);
    color: rgba(66, 66, 66, 100);
    font-size: 20px;
    text-align: center;
    font-family: Roboto;
    border: 1px solid rgba(238, 238, 238, 100);
}
.test-button{
    left: 359px;
    top: 511px;
    width: 301px;
    height: 57px;
    line-height: 29px;
    background-color: rgba(255, 255, 255, 100);
    color: rgba(66, 66, 66, 100);
    font-size: 20px;
    text-align: center;
    font-family: Roboto;
    border: 1px solid rgba(238, 238, 238, 100);
}
.disscussion-button{
    left: 359px;
    top: 567px;
    width: 301px;
    height: 57px;
    line-height: 29px;
    border-radius: 0px 0px 12px 12px;
    background-color: rgba(255, 255, 255, 100);
    color: rgba(66, 66, 66, 100);
    font-size: 20px;
    text-align: center;
    font-family: Roboto;
    border: 1px solid rgba(238, 238, 238, 100);
}
</style>
