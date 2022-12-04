<template>
  <div class="mt-4">
    <el-affix>
      <el-row :gutter="20">
        <el-col :span="20">
          <el-input v-model="data.searchData.videoName" placeholder="输入视频名称以搜索" class="input-with-select">
            <template #append>
              <el-button icon="Search" @click="search" />
            </template>
          </el-input>
        </el-col>
        <el-col :span="4" style="margin: auto;">
          <el-button type="warning" icon="Refresh" round @click="reset">重置筛选</el-button>
        </el-col>
      </el-row>
    </el-affix>
  </div>
</template>
<script setup>
import { data, method } from '@/utils/searchInfo';
let search = method.search;
let reset = method.reset;
</script>
<style scoped>
::v-deep .el-input__wrapper {
  border-radius: 23px 0px 0px 23px;
  height: 45px;
  padding: 0px 11px;
}

::v-deep .el-input-group__append {
  border-radius: 0px 23px 23px 0px;
  height: 45px;
}
</style>