<template>
  <div id="app">
    <div class="wholeMask" v-show="showMask==true">
    </div>
  <topNav ref="topNav"
    @hideM="hideM"
    @showM="showM"
  />
  <router-view />
  <pageFoot ref="pageFoot"/>
  </div>

</template>

<script>
import topNav from './components/top-nav';
import pageFoot from './components/page-foot.vue'
export default {
  name: 'App',
  components:{
    topNav,
    pageFoot
  },
  data(){
    return{
      showMask: false,
    }
  },
  methods:{
    showM(){
      this.showMask=true;
    },
    hideM(){
      this.showMask=false;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: rgba(242, 242, 247, 100);
}
.wholeMask{
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1001;
  background-color: rgb(0,0,0,0.5);
}
</style>
