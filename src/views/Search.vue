<template >
  <div>
    <el-container direction="horizontal">
      <el-container direction="vertical">
        <HeaderBar :flushHandler="flushData" activeMenuIndex="/search"></HeaderBar>
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
import VideoThumbnailShow from '@/components/VideoThumbnailShow.vue';
import HeaderBar from '@/components/HeaderBar.vue';
import { getTypeName } from '@/utils/mockVideoInfo.js';

import { ref, reactive, onMounted, onBeforeMount, computed } from 'vue';
import {
  useRoute,
  useRouter
} from "vue-router";
import { data, method } from '@/utils/searchInfo';
const route = useRoute();
const router = useRouter();
const filteredVideoList = ref([]);
const filterLabel = computed(() => getTypeName(data.searchData.videoType));
onMounted(() => {
  filteredVideoList.value = method.search();
})
const flushData = () => {
  filteredVideoList.value = method.search();
}
const toHome = () => {
  method.reset();
  router.push('/');
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