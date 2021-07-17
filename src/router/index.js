import Vue from 'vue'
import Router from 'vue-router'

import mainpage from '@/page/mainpage'
Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/main',
      component: mainpage,

    }
  ]
})
