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
import partManage from '@/page/partManage'
import status from '@/page/status'
import courseDetail from '@/page/courseDetail'
import courseInfo from '@/page/courseInfo'
import loginPanel from '@/page/loginPanel'
import searchPanel from '@/page/searchPanel'
import userInfo from '@/page/userInfo'
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
      meta: { title: '首页' }
    },
    {
      path: '/course',
      component: course,
      meta: { title: '课程' }
    },
    {
      path: '/courseInfo',
      component: courseInfo,
      meta: { title: '课程概况' }
    },
    {
      path:'/partManage',
      component: partManage
    },
    {
      path: '/courseDetail',
      component: courseDetail,
      meta: { title: '课程详情' }
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
    },
    {
      path: "/login",
      component: loginPanel
    },
    {
      path: "/search",
      component: searchPanel
    },
    {
      path: '/userInfo',
      component: userInfo
    }
  ]
})
