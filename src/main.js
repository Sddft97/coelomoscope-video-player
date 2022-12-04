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
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.use(router)
app.use(vuex)
app.use(ElementPlus)
app.use(VueVideoPlayer)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')