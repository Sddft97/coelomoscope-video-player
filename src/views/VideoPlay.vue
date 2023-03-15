<script setup>
import VideoPlayer from '../components/video/VideoPlayer.vue';
import TopMenu from '../components/global/TopMenu.vue';
import VideoCoverCard from '../components/video/VideoCoverCard.vue';


import { ref, reactive, onMounted, onBeforeMount, watch } from 'vue';
import {
  useRoute,
  useRouter
} from "vue-router";
import target from "@/utils/mockVideoInfo.js";
import videoInfoList from '@/utils/mockVideoInfo.js';
import { getTypeName } from "@/utils/mockVideoInfo.js";
import { mainVideo } from "@/utils/global.js";
const route = useRoute();
const router = useRouter();
const videoPlayer = ref();
const enforceOptions = reactive({
  isAiIdentify: false,
  isAiDehazy: false
});
const activeName = ref('讨论')

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

watch(enforceOptions, (options) => {
  // TODO 检测到变化之后换源
  const videoNumber = route.query.videoNumber;
  mainVideo.value = videoInfoList.filter((video) => video.videoNumber === Number.parseInt(videoNumber) + 1 + '')[0];
  console.log(options);
  videoPlayer.value.changeVideo([{
    type: "video/mp4",
    src: mainVideo.value.videoUrl
  }]);
}, { deep: true })

</script>

<template>
  <div class="common-layout">
    <el-container direction="vertical">
      <el-header height="auto ">
        <TopMenu />
      </el-header>
      <el-container direction="horizontal">
        <el-aside width="350px">
          <div class="video-sidebar left-sidebar">
            <el-card shadow="hover">
              <template #header>
                <div class="return-button">
                  <div class="return-button__item">
                    <el-icon>
                      <ArrowLeft />
                    </el-icon>
                    <span>返回课程</span>
                  </div>
                </div>
              </template>
              <div class="other-videos-bar">
                <el-tag effect="plain" round size="large" style="margin:8px 0">
                  本课程下视频选集
                </el-tag>
                <el-divider />
                <div class="video-display-table">
                  <div class="video-display-table-row" v-for="video in target" :key="video.videoNumber">
                    <div class="video-display-table-row__item">
                      <div class="video-cover">
                        <VideoCoverCard :video="video" />
                      </div>
                      <div class="video-info">
                        <span class="video-name">{{ video.videoName }}</span>
                        <span class="operator-name">主刀医生：张三</span>
                        <span class="remarks">备注：XXX</span>
                      </div>
                    </div>
                    <el-divider />
                  </div>
                </div>
              </div>
            </el-card>
          </div>
        </el-aside>
        <el-main>
          <div class="main-container">
            <el-card shadow="never">
              <div class="title-area">
                <div class="course-name">
                  前列腺癌根除术
                </div>
                <div class="course-type">
                  {{ getTypeName(mainVideo.videoType) }}
                </div>
              </div>
              <div class="video-info">
                <div class="video-name">
                  {{ mainVideo.videoName }}
                </div>
                <div class="operator">
                  <span class="operator__label">主刀医师：</span>
                  <span class="operator__content">刘备</span>
                </div>
              </div>
            </el-card>
            <div class="video-area">
              <div class="switch-button">
                <span class="switch-button__item">
                  <el-switch v-model="enforceOptions.isAiIdentify" style="--el-switch-on-color: #13ce66;" />
                  <span class="switch-option-text">智能识别</span>
                </span>
                <span class="switch-button__item">
                  <el-switch v-model="enforceOptions.isAiDehazy" style="--el-switch-on-color: #13ce66;" />
                  <span class="switch-option-text">去烟雾</span>
                </span>
              </div>
              <VideoPlayer ref="videoPlayer"></VideoPlayer>
            </div>
            <div class="discussion-area">
              <el-tabs v-model="activeName" type="border-card">
                <el-tab-pane label="讨论" name="讨论">讨论区</el-tab-pane>
                <el-tab-pane label="疑问" name="疑问">疑问区</el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </el-main>
        <el-aside>
          <div class="video-sidebar right-sidebar">
            <el-card shadow="hover">
              <el-descriptions :column="2">
                <template #title>
                  <div class="info-header">
                    受术者信息
                  </div>
                </template>
                <el-descriptions-item label="年龄：">30-40岁</el-descriptions-item>
                <el-descriptions-item label="性别：">男</el-descriptions-item>
                <el-descriptions-item label="身高体重：" :span="2">178cm/70kg</el-descriptions-item>
                <el-descriptions-item label="术前情况：" :span="2">
                  xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                  xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                  xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                </el-descriptions-item>
              </el-descriptions>
            </el-card>
            <el-card shadow="hover">
              <div class="operation-brief">
                <div class="info-header">
                  手术简介
                </div>
                <div class="operation-brief__content content-textaria">
                  根治性前列腺切除术是指切除前列腺及其周围的精囊、射精管、输精管的一部分，
                  同时察看盆腔淋巴结有无转移并行清扫。手术是唯一可以根治前列腺癌的方法，
                  耻骨后前列腺癌根治术比较常用。
                </div>
              </div>
              <div class="operation-steps">
                <div class="info-header">
                  手术步骤
                </div>
                <div class="operation-steps__content content-textaria">
                  1. 经尿道插入气囊导尿管并排空膀胱。气囊注水10mL后留置。<br />
                  2. 在膀胱颈下方1cm处横行切开前列腺包膜。用止血钳钝性扩大被膜与腺体间距。腺体完全暴露后，用尖刀纵切前列腺联合部,接近前列腺底部的尿道表面时.用止血钳钝性分离使其完全裂开。<br />
                  3. 用7号丝线深缝前列腺—侧叶并向上牵拉，沿尿道周围剪除前列腺腺体。同法处理对侧。将前列腺包膜切缘的出血点与其周围组织纵缝，不缝合。
                </div>
              </div>
            </el-card>
          </div>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.main-container {
  --el-checkbox-text-color: #606266;
  --el-checkbox-font-weight: 500;
}

.switch-option-text {
  display: inline-block;
  padding-left: 8px;
  line-height: 1;
  font-size: var(--el-checkbox-font-size);
}

.switch-button__item {
  color: var(--el-checkbox-text-color);
  font-weight: var(--el-checkbox-font-weight);
  font-size: var(--el-font-size-base);
  position: relative;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  user-select: none;
  margin-right: 30px;
  height: 32px;
}

.main-container {
  display: flex;
  flex-direction: column;
}

.main-container>div:not(:last-child),
.main-container .el-card__body>div:not(:last-child) {
  margin-bottom: 16px;
}

.course-name {
  font-size: large;
  font-weight: bold;
}

.title-area>div {
  margin-bottom: 4px;
}

.title-area {
  text-align: left
}

.content-textaria {
  text-align: left;
}

.operation-brief__content {
  text-indent: 2em;
}

.right-sidebar>.el-card {
  margin-bottom: 8px;
}

.info-header {
  display: flex;
  align-items: flex-start;
  color: rgb(7, 240, 228);
  font-weight: bold;
  font-size: large;
  margin: 4px 0;
}

.video-cover {
  width: 55%;
}

.video-display-table-row__item {
  display: flex;
  align-items: center;
  justify-content: space-between
}

.video-info {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.other-videos-bar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.main-container {
  margin-top: 30px;
}

.switch-button {
  text-align: left;
  margin-bottom: 8px;
  display: flex;
}

.video-sidebar {
  margin-top: 50px;
}

.return-button {
  display: flex;
}

.return-button__item {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}

.return-button__item:hover {
  color: var(--el-menu-hover-text-color);
}

:deep(.el-divider--horizontal) {
  margin: 8px 0;
}
</style>