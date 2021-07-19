<template>
    <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
</template>
<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
    data(){
        return{
            videoName: ["v1", "v2", "v3", "v4", "v5", "v6"]
        }
    },
    mounted(){
        this.drawLine();
    },
    methods:{
        drawLine(){
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            myChart.setOption({
                title: { text: 'echarts test' },
                tooltip: {},
                xAxis: {
                    data: ["v1", "v2", "v3", "v4", "v5", "v6"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
        }
    }
}
</script>
<style scoped>

</style>
