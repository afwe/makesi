import Vue from 'vue'
import Router from 'vue-router'

import mainpage from '@/page/mainpage'
import course from '@/page/course'
import manage from '@/page/manage'
import videoList from '@/page/video-list'
import videoPage from '@/page/video'
import editPage from '@/page/edit'
import uploadtest from '@/page/uploadtest'
import courseManage from '@/page/courseManage'
import videoManage from '@/page/videoManage'
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
    },
    {
      path: '/video',
      component: videoPage
    },
    {
      path: '/edit',
      component: editPage
    },
    {
      path: "/upload",
      component: uploadtest
    },
    {
      path: "/courseManage",
      component: courseManage
    },
    {
      path: "/videoManage",
      component: videoManage
    }
  ]
})
