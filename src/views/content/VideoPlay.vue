<script setup>
import VideoCoverCard from '../../components/video/VideoCoverCard.vue';
import VideoPlayer from '../../components/video/VideoPlayer.vue';


import { onMounted, reactive, ref, watch } from 'vue';
import {
  useRoute,
  useRouter
} from "vue-router";
import { getCourseByCourseId } from "../../utils/request/course";
import { getVideoByVideoId, getVideosByCourseId } from "../../utils/request/video";
import { toCourseDetail } from "../../utils/router/routeJumper";
const route = useRoute();
const router = useRouter();
const videoId = route.params.videoId;
const videoPlayer = ref();
const otherVideoList = ref([]);
const activeVideoCourse = reactive({
  courseId: '',
  courseName: '',
  courseTypeName: '',
  courseTypeLabel: ''
});
const activeVideo = reactive({
  id: '',
  videoId: '',
  videoName: '',
  videoUrl: '',
  coverImgUrl: '',
  createdAt: '',
  lastViewedAt: '',
  courseId: '',
  resolutionVersion: []
});
const enforceOptions = reactive({
  isAiIdentify: false,
  isAiDehazy: false
});
const activeTabName = ref('讨论');
const activeVideoQualityList = ref([]);
const hasDataPrepared = ref(false)

onMounted(async () => {
  await getActiveVideo();
  getRelatedVideos(activeVideo.courseId);
  getActiveVideoCourse(activeVideo.courseId);
  setQualityForVideo();
  hasDataPrepared.value = true;
});

watch(() => enforceOptions.isAiIdentify, (isAiIdentify) => {
  // TODO 智能标注显示
  console.log(isAiIdentify);
})

watch(() => enforceOptions.isAiDehazy, (isAiDehazy) => {
  videoPlayer.value.switchHazeMode(isAiDehazy);
})

const getActiveVideo = async () => {
  try {
    const video = (await getVideoByVideoId(videoId)).data.results[0];
    for (const key in video) {
      if (Object.hasOwnProperty.call(video, key)) {
        if (activeVideo.hasOwnProperty(key)) {
          activeVideo[key] = video[key];
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
}

const setQualityForVideo = () => {
  activeVideoQualityList.value = activeVideo.resolutionVersion?.map(resolution => {
    const [width, height] = resolution.split('x');
    return {
      name: resolution,
      url: activeVideo.videoUrl,
      meta: { width: parseInt(width), height: parseInt(height) }
    }
  });
}

const getRelatedVideos = async (courseId) => {
  try {
    const videosOfCourse = (await getVideosByCourseId({ courseId })).data.results;
    otherVideoList.value = videosOfCourse.filter(video => video.videoId !== activeVideo.videoId);
  } catch (err) {
    console.log(err);
  }
}

const getActiveVideoCourse = async (courseId) => {
  try {
    const course = (await getCourseByCourseId(courseId)).data.results[0];
    activeVideoCourse.courseId = course.courseId;
    activeVideoCourse.courseName = course.courseName;
    activeVideoCourse.courseTypeName = course.courseType?.name;
    activeVideoCourse.courseTypeLabel = course.courseType?.label;
  } catch (err) {
    console.error(err);
  }
}

</script>

<template>
  <div>
    <el-container direction="horizontal">
      <el-aside width="350px">
        <div class="video-sidebar left-sidebar">
          <el-card shadow="hover">
            <template #header>
              <div class="return-button" @click="toCourseDetail(router,activeVideoCourse.courseId)">
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
                <div class="video-display-table-row" v-for="video in otherVideoList" :key="video.videoId">
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
                {{ activeVideoCourse.courseName }}
              </div>
              <div class="course-type">
                {{ activeVideoCourse.courseTypeName }}
              </div>
            </div>
            <div class="video-info">
              <div class="video-name">
                {{ activeVideo.videoName }}
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
            <VideoPlayer ref="videoPlayer" :quality="activeVideoQualityList" :src="activeVideo.videoUrl"
              v-if="hasDataPrepared"></VideoPlayer>
          </div>
          <div class="discussion-area">
            <el-tabs v-model="activeTabName" type="border-card">
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