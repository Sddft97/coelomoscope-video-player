<template >
  <div>
    <el-container direction="horizontal">
      <el-container direction="vertical">
        <el-header height="auto">
          <TopFunctionBar :flushHandler="flushData" />
          <TopMenu active-menu-index="/search" :flushHandler="flushData" />
        </el-header>
        <div class="main-container">
          <el-main>
            <div class="view">
              <div class="view-label">
                <el-tag effect="plain" round size="large" type="success">
                  筛选类别：{{ filterLabel }}
                </el-tag>
              </div>
              <div class="video-cards">
                <VideoThumbnailShow :videos="filteredVideoList"></VideoThumbnailShow>
              </div>
            </div>
          </el-main>
        </div>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import VideoThumbnailShow from '../components/video/VideoCoverCardWithTitle.vue';
import TopFunctionBar from '../components/global/TopFunctionBar.vue';
import TopMenu from '../components/global/TopMenu.vue';
import { ref, reactive, onMounted, onBeforeMount, computed } from 'vue';
import {
  useRoute,
  useRouter
} from "vue-router";
import { courseQueryCriteria, globalCourseSearch } from "../utils/global-search/course";
const route = useRoute();
const router = useRouter();
const filteredVideoList = ref([]);
const filterLabel = computed(() => courseQueryCriteria.courseTypeName || '未指定');
onMounted(() => {
  flushData()
})
const flushData = () => {
  globalCourseSearch()
    .then(res => filteredVideoList.value = res.data)
    .catch(err => console.error(err))
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

.type-selector {
  margin-top: 8px;
}

.main-container {
  margin-top: 20px;
}
</style>