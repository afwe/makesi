<template>
    <div class="searchContainer">
        <div class="searchTitle-p">
            搜索
        </div>
        <div class="close-button pointer" :style="backgroundC" @click="$emit('closeP')">
        </div>
        <div class="searchContainer-div">
            <input class="searchInput-input" placeholder="请输入想要搜索的内容">
            </input>
            <div class="searchButton-button">
                <div class="search-img" :style="backgroundS">
                </div>
                <div class="search-p">
                    搜索
                </div>
                
            </div>
        </div>
        <div class="recWordContainer-div">
            <div class="recWord-p" v-for="(item,index) in recWord">
                {{item}}
            </div>
        </div>
        <div class="resentHot-p">
            近期热门
        </div>
    </div>
</template>
<script>
export default {
    inject: ['hideM'],
    name: 'searchPanel',
    data(){
        return{
            backgroundC: {
                backgroundImage: 'url(' + require('../assets/close.svg')+')'
            },
            backgroundS:{
                backgroundImage: "url("+require('../assets/mb-search.svg')+')'
            },
            recWord:['毛泽东思想', '中国近代史纲要', '毛泽东诗集' ,'东方艺术史']
        }
    },
    mounted(){

    },
    methods:[

    ]
}
</script>
<style scoped>
.close-button{background-color:white;
height:26px;
width:26px;
position: absolute;
top: 10px;
left:839px;
background-size:100% 100%;
}
.searchContainer{
    position:absolute;
 left:calc(50% - 437px); 
 top:calc(100%);
z-index: 10001;
width:875px;
height:440px;
background-color:white;
position:absolute;
display:flex;
flex-flow:column;
}.searchTitle-p{margin-left:105px;
margin-top:32px;
width:55px;
height:40px;
color:rgba(16,16,16,100);
font-size:27px;
text-align:left;
font-family:SourceHanSansSC-medium;
}.searchContainer-div{margin-left:105px;
margin-top:14px;
display:flex;
flex-flow:row;
}.searchInput-input{width:519px;
height:53px;
border-radius:5px;
background-color:rgba(255,255,255,100);
color:rgba(199,199,204,100);
font-size:13px;
text-align:left;
font-family:MicrosoftYahei;
border:0px solid rgba(199,199,204,100);
}.searchButton-button{width:145px;
height:53px;
line-height:14px;
border-radius:0px5px5px0px;
background-color:rgba(255,5,47,100);
display:flex;
flex-flow:row;
}.search-img{margin-top:14px;
margin-left:33px;
width:24px;
height:24px;
background-size:100%100%;
}.search-p{margin-left:5px;
margin-top:11px;
line-height:29px;
color:rgba(255,255,255,100);
font-size:20px;
text-align:left;
font-family:SourceHanSansSC-regular;
}.recWordContainer-div{margin-top:14px;
margin-left:105px;
display:flex;
flex-flow:row;
}.recWord-p{line-height:17px;
color:rgba(174,174,178,100);
font-size:11px;
}.recWord-p:nth-child(n+2){margin-left:10px;
}.resentHot-p{margin-left:105px;
line-height:25px;
color:rgba(16,16,16,100);
font-size:17px;
text-align:left;
font-family:SourceHanSansSC-regular;
}
</style>
