<template >
  <div>
    <el-container direction="horizontal">
      <el-container direction="vertical">
        <HeaderBar></HeaderBar>
        <div class="main-container">
          <el-main v-for="typeInfo in typeList" :key="typeInfo.value">
            <div class="tag-bar">
              <div class="tag-bar-info">
                <span class="check-tag">
                  <el-tag effect="plain" round size="large" type="success" @click="searchType(typeInfo.value)">
                    {{ typeInfo.name }}
                  </el-tag>
                </span>
                <span class="tag-info">
                  <el-alert title="点击标签查看更多" type="info" show-icon :closable="false" />
                </span>
              </div>
              <div class="video-cards">
                <VideoThumbnailShow :videos="getTypeVideoList(typeInfo.value)"></VideoThumbnailShow>
              </div>
            </div>
          </el-main>
        </div>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import { Avatar } from '@element-plus/icons-vue'
import TopSearchBar from '@/components/TopSearchBar.vue';
import HeaderBar from '@/components/HeaderBar.vue';
import SideDrawer from '@/components/SideDrawer.vue';
import VideoThumbnailShow from '@/components/VideoThumbnailShow.vue';
import TypeSelector from '@/components/TypeSelector.vue';
import videoInfoList from '@/utils/mockVideoInfo.js';
import { typeList } from "@/utils/mockVideoInfo.js";
import { data, method } from '@/utils/searchInfo';

import { ref, reactive, onMounted, onBeforeMount } from 'vue';
import {
  useRouter
} from "vue-router";
const LATELY_LENGTH = 8;
const OTHER_LEHGTH = 20;
const router = useRouter();
const getTypeVideoList = (typeValue) => {
  return method.searchType(typeValue).slice(0, LATELY_LENGTH);
}
const searchType = (typeValue) => {
  data.searchData.videoType = typeValue;
  router.push('/search');
}
const toHome = () => {
  method.reset();
  router.push('/');
}
</script>
<style scoped>
.tag-bar {
  margin-left: 20px;
  text-align: left;
}

.video-cards {
  margin-top: 8px;
}

.main-container {
  margin-top: 20px;
}

.check-tag {
  cursor: pointer;
}

.tag-bar-info {
  display: flex;
  margin: auto;
  line-height: normal;
}

.tag-info {
  margin-left: 8px;
}
</style>