// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as echarts from 'echarts';
import VideoPlayer from 'vue-video-player'
import VueSocketIo from 'vue-socket.io';
import SocketIO from "socket.io-client";
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
const socketBase = 'https://localhost:443'
Vue.prototype.socketApi = socketBase
Vue.prototype.SocketIO = SocketIO
Vue.use(new VueSocketIo({
    debug: true,
    connection: SocketIO.connect(socketBase, {
      path:'',
      transports: ['websocket', 'xhr-polling', 'jsonp-polling'],
    })
}))
Vue.use(VideoPlayer)
Vue.config.productionTip = false

/* eslint-disable no-new */

Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
router.afterEach(() => {
  window.scrollTo(0,0);
})