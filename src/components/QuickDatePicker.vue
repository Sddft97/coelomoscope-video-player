<template>
  <div>
    <el-date-picker :editable="false" v-model="date" type="daterange" unlink-panels range-separator="-"
      start-placeholder="开始日期" end-placeholder="结束日期" :shortcuts="shortcuts" value-format="YYYY-MM-DD" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import 'dayjs/locale/zh-cn'
const date = ref('')
const shortcuts = [
  {
    text: '上周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '上月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '过去三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]
</script>
<style>

</style>