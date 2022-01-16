import fetch from './fetch';

export const getKey = (data) => fetch("/api/upload/coursePicture/getToken", "POST", data);

export default {
    
}
var request = require('request');
var COS = require('cos-nodejs-sdk-v5');
var cos = new COS({
    //获取签名的回调方法，如果没有 SecretId、SecretKey 时，这个参数必选
    getAuthorization: function (options, callback) {
        // 异步获取临时密钥
        request({
            url: '/coursePicture/getToken',
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
                //前三个数据是从后端要过来的
                TmpSecretId: credentials.tmpSecretId,    // 临时密钥的 tmpSecretId
                TmpSecretKey: credentials.tmpSecretKey,  // 临时密钥的 tmpSecretKey
                SecurityToken: credentials.sessionToken, // 临时密钥的 sessionToken
                ExpiredTime: data.expiredTime+30,        // 临时密钥失效时间戳，是申请临时密钥时，时间戳加 durationSeconds
            });
        });
    }
});
// console.log(ExpiredTime);
