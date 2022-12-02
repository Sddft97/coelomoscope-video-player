import {
  createApp
} from 'vue'
import './style.css'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/index'
import vuex from './store/index'
import ElementPlus from 'element-plus'

const app = createApp(App)
app.use(router)
app.use(vuex)
app.use(ElementPlus)
app.mount('#app')