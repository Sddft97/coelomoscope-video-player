import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from '@/views/Home.vue'
import Search from '@/views/Search.vue'
import VideoPlay from '@/views/VideoPlay.vue'
import AccountHome from '@/views/AccountHome.vue'
import AccountUserInfo from '@/views/AccountUserInfo.vue'
import CourseDetail from '@/views/CourseDetail.vue'

const routes = [{
  path: '/',
  name: 'Home',
  component: Home
}, {
  path: '/search',
  name: 'Search',
  component: Search
}, {
  path: '/play',
  name: 'VideoPlay',
  component: VideoPlay
}, {
  path: '/account/home',
  name: 'AccountHome',
  component: AccountHome
}, {
  path: '/account/userInfo',
  name: 'AccountUserInfo',
  component: AccountUserInfo
}, {
  path: '/course/:courseId/detail',
  name: 'CourseDetail',
  component: CourseDetail
}]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router