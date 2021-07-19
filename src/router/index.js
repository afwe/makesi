import Vue from 'vue'
import Router from 'vue-router'

import mainpage from '@/page/mainpage'
import course from '@/page/course'
Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/main',
      component: mainpage,

    },
    {
      path: '/course',
      component: course,

    }
  ]
})
