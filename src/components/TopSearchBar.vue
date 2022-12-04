<template>
  <div class="mt-4">
    <el-affix>
      <el-input v-model="searchData" placeholder="输入视频名称以搜索" class="input-with-select">
        <template #append>
          <el-button icon="Search" @click="search" />
        </template>
      </el-input>
    </el-affix>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
let searchData = ref('');

let search = () => {

}
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