<template >
  <div>
    <el-container direction="horizontal">
      <el-container>
        <el-header>
          <TopSearchBar></TopSearchBar>
        </el-header>
        <div class="main-container">
          <el-main>
            <div class="lately-view">
              <div class="lately-view-label">
                <el-tag effect="plain" round size="large">
                  最近观看
                </el-tag>
              </div>
              <div class="video-cards">
                <VideoThumbnailShow :videos="latelyViewList"></VideoThumbnailShow>
              </div>
            </div>
          </el-main>
          <el-main>
            <div class="other-view">
              <div class="other-view-label">
                <el-tag effect="plain" round size="large" type="info">
                  其他视频
                </el-tag>
              </div>
              <div class="video-cards">
                <VideoThumbnailShow :videos="otherViewList"></VideoThumbnailShow>
              </div>
            </div>
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
import VideoThumbnailShow from '@/components/VideoThumbnailShow.vue';
import videoInfoList from '@/utils/mockVideoInfo.js';

import { ref, reactive, onMounted, onBeforeMount } from 'vue';
import {
  useRoute
} from "vue-router";
const LATELY_LENGTH = 5;
const OTHER_LEHGTH = 20;
let latelyViewList = ref(
  videoInfoList.slice(0, LATELY_LENGTH)
)
let otherViewList = ref(
  videoInfoList.slice(0, OTHER_LEHGTH)
)
</script>
<style scoped>
.lately-view,
.other-view {
  margin-left: 20px;
  text-align: left;
}

.video-cards {
  margin-top: 8px;
}
</style>