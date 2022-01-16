<template>
    <div class="mainContainer">
        <p class="type_title">
            <span>图片上传</span>
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
    </div>
</template>
<script>
  import {uploadCourseFace} from '../fetch/upload'
  import COS from 'cos-nodejs-sdk-v5'
  import {getKey} from '../fetch/image'

  export default {
    name: 'imgUpload',
    data () {
      return {
            imageFlag: false,
            courseId: '',
            imageUploadPercent: 0,
            imageForm: {
                
            }
        }
    },
    mounted(){
        this.courseId = localStorage.getItem('curCourseID');
    },
    methods: {
        httpRequest(file){
            const _this = this;
            console.log(file);
            
            // 前文中所述的获取上传签名的函数
            var cos = new COS({
                  getAuthorization: async (options, callback) => {
                    const data = await getKey();
                    callback({
                        //前三个数据是从后端要过来的
                        TmpSecretId: data.credentials.tmpSecretId,    // 临时密钥的 tmpSecretId
                        TmpSecretKey: data.credentials.tmpSecretKey,  // 临时密钥的 tmpSecretKey
                        SecurityToken: data.credentials.sessionToken, // 临时密钥的 sessionToken
                        ExpiredTime: data.expiredTime+30,        // 临时密钥失效时间戳，是申请临时密钥时，时间戳加 durationSeconds
                    });
                }
            });
            var fileKey
            fileKey = Date.now();
            const uploader = cos.putObject({

                //存储桶的名称，命名规则为 BucketName-APPID，此处填写的存储桶名称必须为此格式
                Bucket: 'red-video-1305720498-红育', /* 必须 */
                //存储桶所在地域
                Region: '<BucketName-APPID>.cos.ap-shanghai.myqcloud.com',    /* 必须 */
                //对象键（Object 的名称），对象在存储桶中的唯一标识，了解更多请参见
                Key: 'fileKey',              /* 必须 */
                StorageClass: 'STANDARD',
                Body: file.file, // 这里腾讯云需要获取到file文件里的name，根据你file结构进行填写
                onProgress: function(info) {
                    _this.videoUploadPercent = parseInt(info.percent * 100);
                }
                // mediaFile: file.file // 这里腾讯云需要获取到file文件里的name，根据你file结构进行填写
            }, ( err , doneResult ) => {
                console.log(doneResult);
                console.log({
                    imageId: doneResult.fileId,
                    url: doneResult.video.url,
                    imageName: file.file.name,
                    courseId: this.courseId
                })
                uploadCourseFace({
                    imageId: doneResult.fileId,
                    url: doneResult.image.url,
                    imageName: file.file.name,
                    courseId: this.courseId
                }).then(data => {
                    console.log(data);
                })
                this.$message({
                    message: "上传成功",
                    type: "success"
                })
            });
        }
    }
  }

</script>

<style scoped>
.mainContainer{
    margin-top:85px;
    margin-left: 240px;
    width: 1200px;
    min-height:800px;
    display: flex;
    flex-flow:column;
}
.el-button + .el-button{
    margin-left:0;
}
</style>
