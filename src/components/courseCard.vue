<template>
    <div class="course-card" @click="toCourse(courseID)">
        <div class="faceImg-img" :style="background">
        </div>
        <div class="className-p">
            {{courseName}}
        </div>
        <div class="schoolName-p">
            武汉理工大学
        </div>
        <div class="joins-p">
            114514人参加
        </div>
        <div class="into-p">
            {{courseIntro}}
        </div>
    </div>
</template>
<script>
export default {
    name: 'courseCard',
    props: ["courseName", "courseIntro", "courseID"],
    data(){
        return{
            background: {
                backgroundImage: 'url('+require('../assets/cr1.jpg')+')'
            },
        }
    },
    methods:{
        toCourse: async function(id){
            this.$router.push(`/courseInfo/?id=${id}`);
        },
    }
}
</script>
<style scoped>
.course-card{
    margin-left:19px;
    width:201px;
    height:231px;
    border-radius:19px;
    background-color:#ffffff;
}
.faceImg-img{width:201px;
height:114px;
border-radius:19px 19px 0px 0px;
background:no-repeatcentertop;
background-size:100% 100%;
}.className-p{margin-left:7px;
margin-top:7px;
font-size:10px;
line-height:16px;
color:rgba(16,16,16,100);
text-align:left;
}.schoolName-p{margin-left:7px;
line-height:11px;
color:rgba(142,142,147,100);
font-size:7px;
text-align:left;
font-family:SourceHanSansSC-light;
}.joins-p{margin-left:7px;
margin-top:32px;
line-height:14px;
color:rgba(199,199,204,100);
font-size:9px;
text-align:left;
font-family:SourceHanSansSC-light;
}.into-p{margin-left:7px;
line-height:14px;
color:rgba(97,97,97,100);
font-size:9px;
text-align:left;
font-family:SourceHanSansSC-regular;
}
</style>