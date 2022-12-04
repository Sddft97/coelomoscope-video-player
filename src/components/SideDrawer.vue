<template>
  <div>
    <div class="drawer">
      <el-affix>
        <div class="arrow-icon" @click="toggleDrawer">
          <div class="icon">
            <el-icon :size="40">
              <ArrowRight v-if="isDrawerShow"></ArrowRight>
              <ArrowLeft v-else></ArrowLeft>
            </el-icon>
          </div>
        </div>
      </el-affix>
      <div class="drawer-item">
        <el-drawer v-model="isDrawerShow" :direction="direction">
          <template #header>
            <h3>指定筛选条件</h3>
          </template>
          <template #default>
            <el-form :model="data.searchData" label-width="120px">
              <el-form-item label="视频类型">
                <el-cascader placeholder="类型" clearable v-model="data.searchData.videoType" :options="options"
                  @change="fillVideoType" />
              </el-form-item>
              <el-form-item label="视频日期">
                <QuickDatePicker></QuickDatePicker>
              </el-form-item>
            </el-form>
          </template>
          <template #footer>
            <div style="flex: auto;">
              <div style="margin:auto;position:relative;width:fit-content;">
                <el-button type="primary" round @click="confirmClick">筛选</el-button>
              </div>
            </div>
          </template>
        </el-drawer>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue';
import { data, method } from '@/utils/searchInfo';
import QuickDatePicker from '@/components/QuickDatePicker.vue'
const isDrawerShow = ref(false);
const direction = ref('rtl')
const options = [
  { value: 'type1', label: '类型1' },
  { value: 'type2', label: '类型2' },
  { value: 'type3', label: '类型3' },
]
const confirmClick = () => {

}
const toggleDrawer = () => {
  isDrawerShow.value = !isDrawerShow.value;
}
const fillVideoType = (value) => {
  if (!!value && value.length > 0) {
    data.searchData.videoType = value[0];
  }
}
</script>
<style scoped>
.arrow-icon {
  position: absolute;
  right: 20px;
  height: 100%;
}

.arrow-icon>.icon {
  position: relative;
  top: 50%;
}
</style>