<script setup>
import VideoPlayer from '@/components/VideoPlayer.vue';
import VideoSideBar from '@/components/VideoSideBar.vue';
import HeaderBar from '@/components/HeaderBar.vue';


import { ref, reactive, onMounted, onBeforeMount, watch } from 'vue';
import {
  useRoute,
  useRouter
} from "vue-router";
import videoInfoList from '@/utils/mockVideoInfo.js';
import { mainVideo } from "@/utils/global.js";
import { data, method } from "@/utils/searchInfo.js";
const route = useRoute();
const router = useRouter();
const videoPlayer = ref();
const isAIEnforced = ref(false);

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

watch(isAIEnforced, (aiSwitchOption) => {
  // TODO 检测到变化之后换源
  const videoNumber = route.query.videoNumber;
  if (aiSwitchOption) {
    // ai增强版
    mainVideo.value = videoInfoList.filter((video) => video.videoNumber === Number.parseInt(videoNumber) + 1 + '')[0];
  } else {
    // 原版
    mainVideo.value = videoInfoList.filter((video) => video.videoNumber === videoNumber)[0];
  }
  console.log(mainVideo.value);
  videoPlayer.value.changeVideo([{
    type: "video/mp4",
    src: mainVideo.value.videoUrl
  }]);
})

const toHome = () => {
  method.reset();
  router.push('/');
}

</script>

<template>
  <div class="common-layout">
    <el-container direction="horizontal">
      <el-container direction="vertical">
        <HeaderBar></HeaderBar>
        <div class="main-container">
          <el-main>
            <div class="switch-button">
              <el-radio-group v-model="isAIEnforced" size="small">
                <el-radio-button :label="false">
                  <template #default>
                    <h4>原版</h4>
                  </template>
                </el-radio-button>
                <el-radio-button :label="true">
                  <template #default>
                    <h4>去雾版</h4>
                  </template></el-radio-button>
              </el-radio-group>
            </div>
            <VideoPlayer ref="videoPlayer"></VideoPlayer>
          </el-main>
        </div>
      </el-container>
      <el-aside width="350px">
        <VideoSideBar></VideoSideBar>
      </el-aside>
    </el-container>
  </div>
</template>

<style scoped>
.main-container {
  margin-top: 50px;
}

.home-icon {
  cursor: pointer;
}

.type-selector {
  margin-top: 8px;
}

.switch-button {
  text-align: left;
  margin-bottom: 8px;
  display: flex;
}
</style>