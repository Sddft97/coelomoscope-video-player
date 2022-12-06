<template >
  <div>
    <el-container direction="horizontal">
      <el-container>
        <el-header>
          <TopSearchBar></TopSearchBar>
        </el-header>
        <div class="main-container">
          <el-main>
            <div class="dummy"></div>
          </el-main>
        </div>
      </el-container>
      <SideDrawer></SideDrawer>
    </el-container>
  </div>
</template>
<script setup>
import TopSearchBar from '@/components/TopSearchBar.vue';
import SideDrawer from '@/components/SideDrawer.vue';

import { ref, reactive, onMounted, onBeforeMount } from 'vue';
import {
  useRoute
} from "vue-router";
</script>
<style scoped>
.dummy {
  width: 100%;
  height: 500px;
  background-color: #000000;
}
</style>