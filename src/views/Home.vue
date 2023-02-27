<template >
  <div>
    <el-container direction="vertical">
      <el-header height="auto">
        <TopFunctionBar />
        <TopMenu />
      </el-header>
      <el-container direction="horizontal">
        <el-container direction="vertical">
          <div class="switch-chart">
            <el-carousel type="card">
              <el-carousel-item v-for="image in switchCardImages" :key="image">
                <el-image :src="image" style="height:100%;"></el-image>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="main-container">
            <el-main v-for="( clazz, index) in homeVideoClassification" :key="clazz">
              <div class="tag-bar">
                <div class="tag-bar-info">
                  <span class="check-tag">
                    <el-tag effect="plain" round size="large" type="success" @click="searchType('')">
                      {{ clazz }}
                    </el-tag>
                  </span>
                  <span class="tag-info">
                    <el-alert title="点击标签查看更多" type="info" show-icon :closable="false" />
                  </span>
                </div>
                <div class="video-cards">
                  <VideoThumbnailShow v-if="index === 0" :videos="getRecommendedCourses()"></VideoThumbnailShow>
                  <VideoThumbnailShow v-else :videos="getLatestCourses()"></VideoThumbnailShow>
                </div>
              </div>
            </el-main>
          </div>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import VideoThumbnailShow from '../components/video/VideoCoverCardWithTitle.vue';
import TopFunctionBar from '../components/global/TopFunctionBar.vue';
import TopMenu from '../components/global/TopMenu.vue';
import target from "@/utils/mockVideoInfo.js";
import { data, method } from '@/utils/searchInfo';

import { ref, reactive, onMounted, onBeforeMount } from 'vue';
import {
  useRouter
} from "vue-router";
const LATELY_LENGTH = 10;
const OTHER_LEHGTH = 20;
const switchCardImages = [
  "https://ts2.cn.mm.bing.net/th?id=OIP-C.f_sEou55jnzGiDFz58kCtwHaE4&w=307&h=203&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
  "https://ts4.cn.mm.bing.net/th?id=OIP-C.mEq-DkBG0x_8Ykl4pNqAlQHaEO&w=331&h=188&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
  "https://tse3-mm.cn.bing.net/th/id/OIP-C.zHrHOI1ULHd0iSWTGqd3WAHaDk?w=336&h=168&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  "https://tse1-mm.cn.bing.net/th/id/OIP-C.gKSO2Cw79snhIt_d0m3wVgHaD8?w=309&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
]
const homeVideoClassification = ["推荐课程", "最新课程"]
const getRecommendedCourses = () => {
  return target.slice(0, LATELY_LENGTH);
}
const getLatestCourses = () => {
  return target.slice(0, LATELY_LENGTH);
}
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
.switch-chart {
  margin-top: 20px;
}

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