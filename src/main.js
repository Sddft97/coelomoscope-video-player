import {
  createApp
} from 'vue'
import './style.css'
import 'element-plus/dist/index.css'
import 'video.js/dist/video-js.css'
import App from './App.vue'
import router from './router/index'
import vuex from './store/index'
import ElementPlus from 'element-plus'
import VueVideoPlayer from '@videojs-player/vue'

const app = createApp(App)
app.use(router)
app.use(vuex)
app.use(ElementPlus)
app.use(VueVideoPlayer)
app.mount('#app')