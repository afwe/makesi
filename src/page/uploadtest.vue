<template>
    <div class="album albumvideo">
        <div>
            <p class="type_title">
                <span>视频介绍</span>
            </p>
            <div class="pic_img">
                <div class="pic_img_box">
                    <el-upload class="avatar-uploader"
                            action="http://localhost:8080/api/upload/video"
                            :data="{courseId: this.courseID}"
                            :headers="Headers"
                            v-bind:on-progress="uploadVideoProcess"
                            v-bind:on-success="handleVideoSuccess"
                            v-bind:before-upload="beforeUploadVideo"
                            multiple
                            >
                        <!--<video v-if="videoForm.showVideoPath !='' && !videoFlag"
                            v-bind:src="videoForm.showVideoPath"
                            class="avatar video-avatar"
                            controls="controls">
                            您的浏览器不支持视频播放
                        </video>-->
                        <i v-if="videoForm.showVideoPath =='' && !videoFlag"
                        class="el-icon-plus avatar-uploader-icon"></i>
                        <el-progress v-if="videoFlag == true"
                                    type="circle"
                                    v-bind:percentage="videoUploadPercent"
                                    style="margin-top:7px;"></el-progress>
                    </el-upload>
                </div>
            </div>
        </div>
        <p class="Upload_pictures">
            <span></span>
            <span>上限300M,推荐格式mp4</span>
        </p>
    </div>
</template>
<script>
    import {uploadVideo} from '../fetch/upload';
    let myToken =  localStorage.getItem('token');
    export default{
        
        data(){
            return{
                fileListArr : [],
                courseID: 3,
                videoFlag: false,
                //是否显示进度条
                videoUploadPercent: "",
                //进度条的进度，
                isShowUploadVideo: false,
                //显示上传按钮
                Headers:{
                    Authorization: myToken,
                },
                videoForm: {
                    showVideoPath: ''
                }
            }
        },
        methods: {
            beforeUploadVideo (file) {
                const isLt300M = file.size / 1024 / 1024 < 300
                if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'].indexOf(file.type) === -1) {
                    this.$message.error('请上传正确的视频格式')
                    return false
                }
                if (!isLt300M) {
                    this.$message.error('上传视频大小不能超过300MB哦!')
                    return false
                }
            },
                // 视频上传过程中执行
            uploadVideoProcess (event, file, fileList) {
            this.Plus = false
            this.videoFlag = true
            this.videoUploadPercent = file.percentage.toFixed(0)
            },
            // 视频上传成功是执行
            handleVideoSuccess (res, file) {
            this.Plus = false
            this.videoUploadPercent = 100
            console.log(res)
            // 如果为200代表视频保存成功
            if (res.code == 200) {
                // 接收视频传回来的名称和保存地址
                // 至于怎么使用看你啦~
                this.$message.success('视频上传成功！');
                localStorage.setItem('partList', JSON.stringify(res.data));
            } else {
                this.$message.error('视频上传失败，请重新上传！');
            }
            },
            onChangeFl: function(){

            }
        }
    }
</script>
<style scoped>
.album{
    width: 400px;
    height: 400px;
}
</style>