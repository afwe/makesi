<template>
    <div class="mainContainer">
        <div class="searchTitle-p">
            搜索
        </div>
        <div class="searchContainer">
            <input class="searchInput-input" placeholder="请输入想要搜索的内容">
            </input>
            <div class="searchButton-button">
                搜索
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
    data(){
        return{
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
.mainContainer{
    width: 1200px;
    height: 604px;
    display: flex;
    flex-flow: column;
    margin:auto;
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
.searchContainer{
    margin-left: 145px;
    margin-top: 20px;
    display: flex;
    flex-flow: row;
}
.searchInput-input{
    width: 912px;
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
text-align: center;
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
.recWord-p:nth-child(n+1){
    margin-left: 15px;
}
.resentHot-p{
    margin-left: 15px;
    
}
</style>
