<template>
    <div class="mainContainer">
        <div class="discussionTitle">
            {{discussName}}
        </div>
        <div class="disscussion-list">
            <ol>
            </ol>
        </div>
    </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'

export default {
    name: disscusion,
    props: ['cid'],
    data(){

    },
    methods:{
        getdisscussions: async function(){

        },
        
    }
}
</script>