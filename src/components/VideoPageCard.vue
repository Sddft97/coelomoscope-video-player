<template>
  <div>
    <el-table :data="filteredVideoInfoList" style="width: 100%">
      <el-table-column fixed>
        <template #default="{ row }">
          <div class="left-card">
            <el-link type="default" :href="`/play?videoNumber=${row.videoNumber}`" :underline="false">
              <el-image style="width: 100%;" :src="row.coverUrl" fit="contain" />
            </el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="videoName" class="right-card">
        <template #default="{ row }">
          <div class="right-card">
            <el-link type="default" :href="`/play?videoNumber=${row.videoNumber}`" :underline="false">
              <div class="link-font">
                {{ row.videoName }}
              </div>
            </el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import videoInfoList from '@/utils/mockVideoInfo.js'
import { mainVideo } from "@/utils/global.js";
import {
  reactive,
  onBeforeMount
} from "vue";

let filteredVideoInfoList = null;
onBeforeMount(() => {
  filteredVideoInfoList = reactive(videoInfoList.filter((video) => mainVideo.value.videoNumber !== video.videoNumber && mainVideo.value.videoType === video.videoType));
});

</script>
<style scoped>
.link-font {
  font-size: medium;
  font-weight: bold;
}
</style>