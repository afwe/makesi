<template>
    <el-upload
    :action="uploadURL"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove">
    <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
    <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
</template>
<script>
  export default {
    props: ["courseId"],
    data() {
      return {
      	file:'',
        dialogImageUrl: '',
        dialogVisible: false,
        imgUrl:'',
        userId: '',
        uid:'',
        // 上传图片时附带的额外参数userId
        resData:{
        	userId: window.localStorage["userId"]
        },
      };
    },
    computed:{
        uploadURL: function(){
            return `/api/upload/coursePicture/${this.courseId}`;
        }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      
      // 点击保存按钮上传图片
      submit2:function(res){
		this.$refs.upload.submit();
	},
		
	// 图片上传成功后，后台返回图片的路径
	onSuccess:function(res){
		// console.log(res);
		if(res.status==200){
			this.imgUrl=res.data.imgUrl;
		}
	},
    }
  }
</script>
