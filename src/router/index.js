import {
  createRouter,
  createWebHistory
} from 'vue-router'
// import Home from '../views/Home.vue'
// import Search from '../views/Search.vue'
// import VideoPlay from '../views/VideoPlay.vue'
// import AccountHome from '../views/AccountHome.vue'
// import AccountUserInfo from '../views/AccountUserInfo.vue'
// import CourseDetail from '../views/CourseDetail.vue'
// import CourseBrief from '../views/CourseBrief.vue'

const routes = [{
  path: '/',
  name: 'Home',
  component: () => import('../views/Home.vue')
}, {
  path: '/search',
  name: 'Search',
  component: () => import('../views/Search.vue')
}, {
  path: '/video/:videoId/play',
  name: 'VideoPlay',
  component: () => import('../views/VideoPlay.vue')
}, {
  path: '/account/home',
  name: 'AccountHome',
  component: () => import('../views/AccountHome.vue')
}, {
  path: '/account/userInfo',
  name: 'AccountUserInfo',
  component: () => import('../views/AccountUserInfo.vue')
}, {
  path: '/course/:courseId/detail',
  name: 'CourseDetail',
  component: () => import('../views/CourseDetail.vue')
}, {
  path: '/course/:courseId',
  name: 'CourseBrief',
  component: () => import('../views/CourseBrief.vue')
}]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router