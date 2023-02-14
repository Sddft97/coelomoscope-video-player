import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from '@/views/Home.vue'
import Search from '@/views/Search.vue'
import VideoPlay from '@/views/VideoPlay.vue'
import AccountHome from '@/views/AccountHome.vue'
import AccountUserInfo from '@/views/AccountUserInfo.vue'

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
}]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router