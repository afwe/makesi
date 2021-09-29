<template>
    <div class="searchContainer">
        <div class="searchTitle-p">
            搜索
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
    name: 'searchPanel',
    data(){
        return{
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
.searchContainer{
    width: 1200px;
    height: 604px;
    background-color: white;
    position: absolute;
    display: flex;
    flex-flow: column;
}
.searchTitle-p{
    margin-left: 144px;
    margin-top: 44px;
width: 76px;
height: 55px;
color: rgba(16, 16, 16, 100);
font-size: 38px;
text-align: left;
font-family: SourceHanSansSC-medium;

}
.searchContainer-div{
    margin-left: 145px;
    margin-top: 20px;
    display: flex;
    flex-flow: row;
}
.searchInput-input{
    width: 712px;
height: 74px;
border-radius: 8px;
background-color: rgba(255, 255, 255, 100);
color: rgba(199, 199, 204, 100);
font-size: 18px;
text-align: left;
font-family: Microsoft Yahei;
border: 1px solid rgba(199, 199, 204, 100);
}
.searchButton-button{
    width: 200px;
height: 74px;
line-height: 20px;
border-radius: 0px 8px 8px 0px;
background-color: rgba(255, 5, 47, 100);
display: flex;
flex-flow: row;
}
.search-img{
    margin-top: 20px;
    margin-left:46px;
    width: 34px;
height: 34px;
background-size: 100% 100%;
}
.search-p{
    margin-left: 8px;
    margin-top: 16px;
    line-height: 41px;
color: rgba(255, 255, 255, 100);
font-size: 28px;
text-align: left;
font-family: SourceHanSansSC-regular;
}
.recWordContainer-div{
    margin-top: 20px;
    margin-left: 145px;
    display: flex;
    flex-flow: row;
}
.recWord-p{
    line-height: 24px;
    color: rgba(174, 174, 178, 100);
    font-size: 16px;
}   
.recWord-p:nth-child(n+2){
    margin-left: 15px;
}
.resentHot-p{
    margin-left: 145px;
    line-height: 35px;
color: rgba(16, 16, 16, 100);
font-size: 24px;
text-align: left;
font-family: SourceHanSansSC-regular;
}
</style>
