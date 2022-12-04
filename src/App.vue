<script setup>
import VideoPlayer from '@/components/VideoPlayer.vue';
import TopSearchBar from '@/components/TopSearchBar.vue';
import SideDrawer from '@/components/SideDrawer.vue';
import { ref, reactive } from 'vue';
</script>

<template>
  <div class="common-layout">
    <el-container direction="horizontal">
      <el-container>
        <el-header>
          <TopSearchBar></TopSearchBar>
        </el-header>
        <el-main>
          <VideoPlayer ref="videoPlayer"></VideoPlayer>
        </el-main>
      </el-container>
      <el-aside width="500px">同一分类的其他视频</el-aside>
      <SideDrawer></SideDrawer>
    </el-container>
  </div>
</template>

<style scoped>

</style>
