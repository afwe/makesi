<template>
  <div id="app">
  <topNav ref="topNav"/>
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
</style>
