import Vue from 'vue'
import Router from 'vue-router'

import mainpage from '@/page/mainpage'
import course from '@/page/course'
import upload from '@/page/uploadtest2'
import videoList from '@/page/video-list'
import videoPage from '@/page/video'
import editPage from '@/page/edit'
import uploadtest from '@/page/uploadtest'
import courseManage from '@/page/courseManage'
import videoManage from '@/page/videoManage'
import status from '@/page/status'
import courseDetail from '@/page/courseDetail'
import courseInfo from '@/page/courseInfo'
Vue.use(Router)

export default new Router({
  mode: "hash",
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
      path: '/courseInfo',
      component: courseInfo
    },
    {
      path: '/courseDetail',
      component: courseDetail
    },
    {
      path: '/manage',
      component: courseManage,

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
    },
    {
      path: "/uploadtest",
      component: upload
    },
    {
      path: "/status",
      component: status
    }
  ]
})
