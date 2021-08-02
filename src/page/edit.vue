<template>
    <div class="mainContainer">
        <div id="root" class="block">
        </div>
        <div id="pathContainer">
        </div>
        <div id="end" class="block">
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{   
        render: function(){
            for(let i = 1; i <= 7; i++){
                for(let j = 1; j <= 4; j++){
                    let newBlock = document.createElement("div");
                    newBlock.id = "d-" + (i + (j - 1) * 7);
                    newBlock.style.width = "60px";
                    newBlock.style.height = "30px";
                    newBlock.style.backgroundColor = "aqua"
                    newBlock.style.top = ((j - 1) * 30) + "px";
                    newBlock.style.left = ((i - 1) * 60) + "px";
                    console.log(newBlock);
                    document.getElementById("pathContainer").appendChild(newBlock);
                    console.log(document.getElementById("pathContainer"));
                }
            }
        }
    },
    mounted(){
        this.render();
    }
}
</script>
<style scoped>
.mainContainer{
    position: fixed;
}
.block{
    background-color: blue;
    width: 60px;
    height: 30px;
}
#root{
    background-color: yellow !important;
}
#end{
    background-color: red !important;
    top: 400px;
    left: 600px;
}
#pathContainer{
    width: 1000px;
    height: 500px;
}
</style>
