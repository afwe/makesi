<template>
    <div class="uploadContainer">
        <p class="type_title">
            <span>视频上传</span>
        </p>
        <el-upload
            ref="upload"
            action="filename"
            :http-request="httpRequest"
            multiple
            >
        <i v-if="videoFlag == false" class="el-icon-plus avatar-uploader-icon "></i>
        </el-upload>   
        <el-progress
            v-if="videoFlag"
            type="circle"
            :percentage="videoUploadPercent"
        ></el-progress>
        <p class="Upload_pictures">
            <span>视频显示4:3,格式mp4</span>
        </p>
    </div>
</template>
<script>
import TcVod from 'vod-js-sdk-v6'
import {getuploadsignature} from '../fetch/video'
import {uploadVideo} from '../fetch/upload'
export default {
    data(){
        return{
            videoFlag: false,
            courseId: '',
            videoUploadPercent: 0,
            videoForm: {

            }
        }
    },
    mounted(){
        this.courseId = localStorage.getItem('curCourseID');
    },
    methods:{
        // 视频-自定义地址
        httpRequest(file){
            const _this = this;
            console.log(file);
            // 限制视频格式
            // if (["video/mp4", "video/quicktime"].indexOf(file.file.type) == -1) {
            //     this.$message.error("视频格式有误，上传失败");
            //     return false;
            // }
                // 限制视频小于700M
            const isLt10M = file.file.size / 1024 / 1024 < 700;
            if (!isLt10M) {
                this.$message.error("请上传MP4、MOV格式且不超过700MB的视频哦!");
                return false;
            }
            // 显示进度条从0开始
            _this.videoFlag = true
            this.videoUploadPercent=0
            // 获取视频签名
            const getSignature = async function(){
                return await getuploadsignature().then(
                    response => {
                        console.log(response)
                        return response.data;
                });
            }
            // 前文中所述的获取上传签名的函数
            const tcVod = new TcVod({
                getSignature:getSignature
            })
            const uploader = tcVod.upload({
                mediaFile: file.file // 这里腾讯云需要获取到file文件里的name，根据你file结构进行填写
            })
            this.uploaderG = uploader // 定义全局用于取消上传
            
            // 进度
            uploader.on('media_progress', function(info) {
                _this.videoUploadPercent = parseInt(info.percent * 100);
            })
            
            // 上传成功
            uploader.done().then((doneResult) => {
                /*_this.videoFlag = false // 关闭进度条
                _this.videoForm.Video = doneResult.fileId // 存储fileId
                // 这里发请求给后端进行转码操作
                const data = {
                file_id:doneResult.fileId, // 腾讯云file_id
                video_type:'operating_activity', // 视频类型
                video_name:'', // 视频名称
                video_url: doneResult.video && doneResult.video.url?doneResult.video.url:'',// 视频地址
                }
                // 腾讯视频转码
                videoProcedure(data)
                .then(res => {
                }).catch(err => {
                console.log(err)
                })*/
                console.log(doneResult);
                console.log({
                    videoId: doneResult.fileId,
                    url: doneResult.video.url,
                    videoName: file.file.name,
                    courseId: this.courseId
                })
                uploadVideo({
                    videoId: doneResult.fileId,
                    url: doneResult.video.url,
                    videoName: file.file.name,
                    courseId: this.courseId
                }).then(data => {
                    console.log(data);
                })
                this.$message({
                    message: "上传成功",
                    type: "success"
                })
            }).catch( (err) => {
            console.log(err)
            })
        }
    }
}
</script>
<style scoped>
.uploadContainer{
    width: 300px;
    height: 200px;
}
</style>
