import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from '@/views/Home.vue'
import Search from '@/views/Search.vue'
import VideoPlay from '@/views/VideoPlay.vue'

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
}, ]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router