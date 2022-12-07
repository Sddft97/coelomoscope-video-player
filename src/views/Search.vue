<template >
  <div>
    <el-container direction="horizontal">
      <el-container>
        <el-header>
          <el-row :gutter="20">
            <el-col :span="2">
              <div class="home-icon" @click="router.push('/')">
                <el-icon :size="40">
                  <HomeFilled />
                </el-icon>
              </div>
            </el-col>
            <el-col :span="22">
              <TopSearchBar :flushHandler="flushData"></TopSearchBar>
            </el-col>
          </el-row>
        </el-header>
        <div class="main-container">
          <el-main>
            <div class="view">
              <div class="view-label">
                <el-tag effect="plain" round size="large" type="success">
                  筛选结果
                </el-tag>
              </div>
              <div class="video-cards">
                <VideoThumbnailShow :videos="filteredVideoList"></VideoThumbnailShow>
              </div>
            </div>
          </el-main>
        </div>
      </el-container>
      <SideDrawer :flushHandler="flushData"></SideDrawer>
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
  useRoute,
  useRouter
} from "vue-router";
import { data, method } from '@/utils/searchInfo';
const route = useRoute();
const router = useRouter();
let filteredVideoList = ref([]);
onMounted(() => {
  filteredVideoList.value = method.search();
})
const flushData = () => {
  filteredVideoList.value = method.search();
}
</script>
<style scoped>
.view {
  margin-left: 20px;
  text-align: left;
}

.video-cards {
  margin-top: 8px;
}

.home-icon {
  cursor: pointer;
}
</style>