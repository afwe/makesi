<template>
    <div class="fileImage-wrap">
        <el-upload
            action="#"
            list-type="picture-card"
            :show-file-list="true"
            :file-list="fileList"
            :on-remove="handleRemove"
            :before-upload="beforeAvatarUpload"
            :limit="limit"
            name="file"
            :class="{ hide: this.fileList.length >= this.limit }"
        >
            <i class="el-icon-plus"></i>
            <span class="file-name">{{ name }}</span>
        </el-upload>
    </div>
</template>
<script>
const COS = require('cos-js-sdk-v5');
// const Bucket = 'red-video-1305720498';
// const Region = 'ap-nanjing';
var request = require('request');
var cos = new COS({
    getAuthorization: function (options, callback) {
        // 异步获取临时密钥
        request({
            url: 'http://api/upload/coursePicture/getToken',
            data: {
                // 可从 options 取需要的参数
            }
        }, function (err, response, body) {
            try {
                var data = JSON.parse(body);
                var credentials = data.credentials;
            } catch(e) {}
            if (!data || !credentials) return console.error('credentials invalid');
            callback({
                TmpSecretId: credentials.tmpSecretId,        // 临时密钥的 tmpSecretId
                TmpSecretKey: credentials.tmpSecretKey,      // 临时密钥的 tmpSecretKey
                SecurityToken: credentials.sessionToken, // 临时密钥的 sessionToken
                ExpiredTime: data.expiredTime+30,               // 临时密钥失效时间戳，是申请临时密钥时，时间戳加 durationSeconds
            });
        });
    }
});
export default {
    props: {
        name: {
            type: String,
            default: '上传图片'
        },
        // 图片数量限制
        limit: {
            type: Number,
            default: 1
        },
        value: [String, Object, Array]
    },
    data() {
        return {
            hideUpload: false,
            fileList: [],
            cndUrl: 'https://yugioh-xxx.cos.ap-shanghai.myqcloud.com'
        };
    },
    watch: {
        value: {
            handler(val) {
                if (val) {
                    const list = Array.isArray(val) ? val : this.value.split(',');
                    // 然后将数组转为对象数组
                    this.fileList = list.map(item => {
                        if (typeof item === 'string') {
                            if (item.indexOf(this.cndUrl) === -1) {
                                item = { name: item, url: this.cndUrl + item };
                            } else {
                                item = { name: item, url: item };
                            }
                        }
                        return item;
                    });
                } else {
                    this.fileList = [];
                    return [];
                }
            },
            deep: true,
            immediate: true
        }
    },
    mounted() {},
    methods: {
        /**上传图片**/
        beforeAvatarUpload(file) {
            this.uploadFileToTencentClound(file).then(response => {
                this.fileList.push({ name: file.uid, url: 'https://' + response });
                this.$emit('input', this.listToString(this.fileList));
            });
        },
        // 删除图片
        handleRemove(file) {
            const findex = this.fileList.map(f => f.name).indexOf(file.name);
            this.fileList.splice(findex, 1);
            this.$emit('input', this.listToString(this.fileList));
        },
        /**上传图片到腾讯云**/
        uploadFileToTencentClound(file) {
            return new Promise(resolve => {
                cos.putObject(
                    {
                        Bucket: 'red-video-1305720498' /* 存储桶 */,
                        Region: 'red-video-1305720498.cos.ap-guangzhou.myqcloud.com/picture.jpg' /* 存储桶所在地域，必须字段 */,
                        Key: 'Goods/' + file.name /* 文件名 */,
                        StorageClass: 'STANDARD', // 上传模式, 标准模式
                        Body: file, // 上传文件对象
                        onProgress: function(info) {
                            console.log('[cos.postObject-seccess]', JSON.stringify(info));
                        }
                    },
                    function(err, data) {
                        console.log('[cos.postObject-err]', err || data);
                        resolve(data.Location);
                    }
                );
            });
        },
        // 对象转成指定字符串分隔
        listToString(list, separator) {
            let strs = '';
            separator = separator || ',';
            for (let i in list) {
                strs += list[i].url + separator;
            }
            return strs != '' ? strs.substr(0, strs.length - 1) : '';
        }
    }
};
</script>

<style scoped>
  .fileImage-wrap{
    width: 300px;
    height: 200px;
}
</style>
