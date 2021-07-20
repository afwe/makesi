import Vue from 'vue'
import Router from 'vue-router'

import mainpage from '@/page/mainpage'
import course from '@/page/course'
import manage from '@/page/manage'
import videoList from '@/page/video-list'
Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: "",
      redirect: "/main",
    },
    {
      path: '/main',
      component: mainpage,

    },
    {
      path: '/course',
      component: course,

    },
    {
      path: '/manage',
      component: manage,

    },
    {
      path: '/videoes',
      component: videoList,

    }
  ]
})
