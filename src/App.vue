<script setup>
import VideoPlayer from '@/components/VideoPlayer.vue';
import TopSearchBar from '@/components/TopSearchBar.vue';

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
      <el-aside>Aside</el-aside>
    </el-container>
  </div>
</template>

<style scoped>

</style>
