<script setup>
import VideoPlayer from '@/components/VideoPlayer.vue';
import TopSearchBar from '@/components/TopSearchBar.vue';
import SideDrawer from '@/components/SideDrawer.vue';
import VideoPageCard from '../components/VideoPageCard.vue';

import { ref, reactive, onMounted, onBeforeMount } from 'vue';
import {
  useRoute
} from "vue-router";
import videoInfoList from '@/utils/mockVideoInfo.js';
import { mainVideo } from "@/utils/global.js";
let route = useRoute();
let videoPlayer = ref();

onBeforeMount(() => {
  const videoNumber = route.query.videoNumber;
  // 正常情况下应该用videoNumber查询后端接口获取src
  // 这里先使用假数据查询
  mainVideo.value = videoInfoList.filter((video) => video.videoNumber === videoNumber)[0];
});

onMounted(() => {
  videoPlayer.value.changeVideo([{
    type: "video/mp4",
    src: mainVideo.value.videoUrl
  }]);
});

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