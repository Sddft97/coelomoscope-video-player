<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="2">
        <div class="home-icon" @click="toHome">
          <el-icon :size="40">
            <HomeFilled />
          </el-icon>
        </div>
      </el-col>
      <el-col :span="22">
        <TopSearchBar :flushHandler="props.flushHandler"></TopSearchBar>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import TopSearchBar from './inner/TopSearchBar.vue';
import { method } from '@/utils/searchInfo';
const props = defineProps({
  flushHandler: {
    type: Function,
    default: () => { }
  }
});
const toHome = () => {
  method.reset();
  router.push('/');
}
</script>
<style lang="css" scoped>
.home-icon {
  cursor: pointer;
}
</style>