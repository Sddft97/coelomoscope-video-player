import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import {
  resolve
} from 'path'
import inject from '@rollup/plugin-inject'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    inject({
      $: "jquery", // 这里会自动载入 node_modules 中的 jquery
      jQuery: "jquery",
      "windows.jQuery": "jquery"
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
    }
  },
  base: './', // 设置打包路径
  server: {
    port: 4000, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true // 允许跨域
  }
})