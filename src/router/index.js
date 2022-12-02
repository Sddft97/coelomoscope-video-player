import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from '@/views/home.vue'
import Vuex from '@/views/vuex.vue'

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/vuex',
    name: 'Vuex',
    component: Vuex
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router