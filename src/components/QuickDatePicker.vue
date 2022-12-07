<template>
  <div>
    <el-date-picker :editable="false" v-model="date" type="daterange" unlink-panels range-separator="-"
      start-placeholder="开始日期" end-placeholder="结束日期" :shortcuts="shortcuts" value-format="YYYY-MM-DD"
      @change="selectDate" />
  </div>
</template>
<script setup>
import { ref, reactive, watch } from 'vue'
const props = defineProps({
  beginDate: {
    required: true
  },
  endDate: {
    required: true
  }
})
const emits = defineEmits(['select-date']);
const date = ref('');
watch([() => props.beginDate, () => props.endDate], ([newBeginDate, newEndDate]) => {
  date.value = [newBeginDate, newEndDate];
}, { immediate: true });
const selectDate = (([beginDate, endDate]) => {
  emits('select-date', beginDate, endDate);
})
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