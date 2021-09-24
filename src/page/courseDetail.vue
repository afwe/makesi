<template>
    <div class="mainContainer">
        <div class="selectContainer-div">
            <div class="courseFace-img" :style="background">
            </div>
            <div class="btnNest-div">
                <button class="selectButton-button topButton">
                    公告
                </button>
                <button class="selectButton-button">
                    课件
                </button>
                <button class="selectButton-button">
                    测验与作业
                </button>
                <button class="selectButton-button">
                    考试
                </button>
                <button class="selectButton-button bottomButton">
                    讨论区
                </button>
            </div>
        </div>
        <div class="container-div">
            <div class="notification-div" v-show="showMode=='notify'" :style="backgroundN">
            </div>
            <div class="videoList-div" v-show="showMode=='videoes'">
                <div class="kejian-p">
                    课件
                </div>
                <el-collapse class="videoList">
                <el-collapse-item v-for="(item,cindex) in chapter" class="title">
                    <template slot="title">
                        第{{cindex+1}}章
                    </template>
                    <el-card v-for="(item,sindex) in chapter[cindex]" class="videoItem" @click.native="toVideo(item.id)">
                        {{item.title}}
                    </el-card>
                </el-collapse-item>
            </el-collapse>
            </div>
        </div>
    </div>
</template>
<script>
import { join_course , get_course_by_id} from '../fetch/course'

export default {
    data(){
        return{
            backgroundN: {
                backgroundImage: 'url('+require('../assets/not.png')+')'
            },
            background: {
                backgroundImage: 'url('+require('../assets/classface2.png')+')'
            },
            courseName: "test",
            courseIntro: "test",
            showMode: 'videoes',
            courseID: 3,
            totVideo: 4,
            videoPage: 1,
            videoes: [
                {
                    id: 1,
                    title: 2
                }
            ],
            chapter: [

            ]
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
        },
        toVideo: async function(id){
            console.log()
            let index = 0;

            this.videoes.forEach(
                (element, i) => {
                    if(element.id == id) index = i; 
                }
            )
            console.log(id);
            console.log(index);
            localStorage.setItem("edge", JSON.stringify(this.videoes[index].edge));
            this.$router.push({
                path: `/video/?id=${this.courseID}&vid=${this.videoes[index].id}`
            });
        },
        render: async function(){
            let response = await getVideoListByCourseID(this.courseID);
            console.log(response);
            if(response.code == 200){
                let array = response.data;
                array.forEach(element => {
                    let videoName = element.title;
                    let sPosition = videoName.indexOf('S');
                    element.c = parseInt(videoName.substr(1,sPosition - 1));
                    element.s = parseInt(videoName.substr(sPosition + 1, videoName.length - sPosition));
                    element.title = "第" + element.c + "章" + "第" + element.s + "节";
                });
                let Sort = function(val1, val2){
                    if(val1.c == val2.c) return val1.s - val2.s;
                    else return val1.c - val2.c;
                }
                array.sort(Sort);
                for(let i = 1; i <= array[array.length-1].c; i++){
                    this.chapter.push([]);
                }
                array.forEach(
                    element => {
                        this.chapter[element.c-1].push(element);
                    }
                )
                this.videoes = array;
            }
        }
    }
}
</script>
<style scoped>
/*
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
}*/
.mainContainer{
    margin: auto;
    display: flex;
    flex-flow: row;
}
.selectContainer-div{
    margin-left: 360px;
    display: flex;
    flex-flow: column;
}
.courseFace-img{
    width: 299px;
    height: 160px;
    border-radius: 12px;
    background-color: rgba(250, 250, 250, 100);
    background-color: black;
    border-radius: 26px 26px 0px 0px;
    background: no-repeat center top;
    background-size:100% 100%;
}
.btnNest-div{
    display: flex;
    flex-flow: column;
}
.selectButton-button{
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
.topButton{
    border-radius: 12px 12px 0px 0px;
}
.buttomButton{
    border-radius: 0px 0px 12px 12px;
}
.container-div{
    margin-left: 60px;
    display: flex;
    flex-flow: column;
}
.notification-div{
    width: 885px;
    height: 438px;
    border-radius: 12px;
    background: no-repeat center top;
    background-size:100% 100%;
}
.videoList-div{
    width: 885px;
    height: 213px;
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 100);
}
</style>
