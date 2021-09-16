<template>
<template>
  
</template>

<script>
import {} from '../fetch/video'

export default{
    data(){
        return{
            partList:[],
            courseID: '',
            
        }
    },
    mounted(){
        this.courseID=localStorage.getItem('courseId');
        getPatList({courseId: this.courseID}).then(
            data => {
                this.partList = data.data;
            }
        )
    },
    methods: {
        
    }
}
</script>

<style>

</style>