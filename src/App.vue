<template>
  <div id="app">
  <div class="wholeMask" v-show="showMask==true">
  </div>
  <topNav ref="topNav"
    @hideM="hideM"
    @showM="showM"
    @teacherL="teacherLogin"
  />
  <sideNav ref="sideNav"
  />
  <router-view />
  <!--
  <pageFoot ref="pageFoot"/>
  -->
  </div>

</template>

<script>
import topNav from './components/top-nav';
import pageFoot from './components/page-foot.vue'
import sideNav from './components/side-nav.vue'
export default {
  provide(){
    return{
      hideM:this.hideM,
      showM:this.showM,
      manageMode:this.isMonitor
    }
  },
  name: 'App',
  components:{
    topNav,
    pageFoot,
    sideNav
  },
  data(){
    return{
      showMask: false,
      isMonitor: {
        is: false
      }
    }
  },
  methods:{
    showM(){
      this.showMask=true;
    },
    hideM(){
      this.showMask=false;
    },
    teacherLogin(){
      console.log(">>>");
      this.isMonitor.is=true
      this.manageMode = this.isMonitor
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
@font-face {
  font-family: roboto;
  src: url('./assets/font/Roboto-Regular-14.ttf');
}
@font-face {
  font-family:SourceHanSansSC-light;
  src: url('./assets/font/SourceHanSansCN-Light.otf');
}
@font-face{
  font-family: SourceHanSansSC-medium;
  src: url('./assets/font/SourceHanSansCN-Medium.ttf');
}
@font-face {
  font-family:SourceHanSansSC-regular ;
  src: url('./assets/font/SourceHanSansCN-Regular.otf');
}
</style>
