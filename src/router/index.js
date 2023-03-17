import {
  createRouter,
  createWebHistory
} from 'vue-router'

const routes = [{
  path: '/',
  name: 'MainPageFramework',
  redirect: {
    name: 'Home'
  },
  component: () => import('../views/MainPageFramework.vue'),
  children: [{
    path: 'home',
    name: 'Home',
    component: () => import('../views/content/Home.vue'),
  }, {
    path: 'search',
    name: 'CourseSearch',
    component: () => import('../views/content/CourseSearch.vue')
  }, {
    path: 'video/:videoId/play',
    name: 'VideoPlay',
    component: () => import('../views/VideoPlay.vue')
  }, {
    path: 'course/:courseId/detail',
    name: 'CourseDetail',
    component: () => import('../views/CourseDetail.vue')
  }, {
    path: 'course/:courseId',
    name: 'CourseBrief',
    component: () => import('../views/CourseBrief.vue')
  }]
}, {
  path: '/account',
  redirect: {
    name: 'AccountHome'
  },
  children: [{
    path: 'home',
    name: 'AccountHome',
    component: () => import('../views/AccountHome.vue')
  }, {
    path: 'userInfo',
    name: 'AccountUserInfo',
    component: () => import('../views/AccountUserInfo.vue')
  }]
}]

const router = createRouter({
  history: createWebHistory('/intelligentSurgery'),
  routes
})

export default router