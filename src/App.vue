<template>
  <div id="app">
  <topNav ref="topNav"/>
  <router-view />
  </div>
</template>

<script>
import topNav from './components/top-nav';
export default {
  name: 'App',
  components:{
    topNav
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
}
</style>
