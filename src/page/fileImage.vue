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
const Bucket = 'red-video-1305720498';
const Region = 'ap-nanjing';
import COS from 'cos-nodejs-sdk-v5';
var request = require('request');
var cos = new COS({
    getAuthorization: function (options, callback) {
        // 异步获取临时密钥
        request({
            url: 'http://175.27.138.160:8443/api/upload/coursePicture/getToken',
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
						Bucket: Bucket /* 存储桶 */,
						Region: Region /* 存储桶所在地域，必须字段 */,
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

<style>
.fileImage-wrap {
	.el-upload--picture-card {
		line-height: 0px !important;
		width: 184px;
		height: 118px;
		position: relative;
		.el-icon-plus {
			margin-top: 35px;
		}
		.file-name {
			display: inline-block;
			width: 100%;
			font-size: 14px;
			color: #999999;
			position: absolute;
			bottom: 25px;
			left: 0;
		}
	}
	.el-upload-list__item {
		width: 184px !important;
		height: 118px !important;
	}
	.el-upload-list--picture-card .el-upload-list__item-status-label {
		background: linear-gradient(180deg, #ffaa6b 0%, #ff792a 100%);
	}
}
.hide .el-upload--picture-card {
	display: none;
}
// 去掉动画效果
.el-list-enter-active,
.el-list-leave-active {
	transition: all 0s;
}

.el-list-enter,
.el-list-leave-active {
	opacity: 0;
	transform: translateY(0);
}
</style>

