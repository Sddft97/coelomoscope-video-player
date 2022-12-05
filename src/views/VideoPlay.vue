<script setup>
import VideoPlayer from '@/components/VideoPlayer.vue';
import TopSearchBar from '@/components/TopSearchBar.vue';
import SideDrawer from '@/components/SideDrawer.vue';
import VideoPageCard from '../components/VideoPageCard.vue';

import { ref, reactive } from 'vue';
</script>

<template>
  <div class="common-layout">
    <el-container direction="horizontal">
      <el-container>
        <el-header>
          <TopSearchBar></TopSearchBar>
        </el-header>
        <div class="main-container">
          <el-main>
            <VideoPlayer ref="videoPlayer"></VideoPlayer>
          </el-main>
        </div>
      </el-container>
      <el-aside width="350px">
        同一分类的其他视频
        <VideoPageCard></VideoPageCard>
      </el-aside>
      <SideDrawer></SideDrawer>
    </el-container>
  </div>
</template>

<style scoped>
.main-container {
  margin-top: 50px;
}
</style>