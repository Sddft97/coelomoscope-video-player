<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="2">
        <div class="home-icon" @click="toHome(router)">
          <el-icon :size="40">
            <HomeFilled />
          </el-icon>
        </div>
      </el-col>
      <el-col :span="22">
        <TopSearchBar></TopSearchBar>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import TopSearchBar from './private/TopSearchBar.vue';
import { toHome } from "../../utils/router/routeJumper";
import {
  useRouter
} from "vue-router";
const router = useRouter();
</script>
<style lang="css" scoped>
.home-icon {
  cursor: pointer;
}
</style>