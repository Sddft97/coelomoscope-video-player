<template>
  <div>
    <el-space wrap>
      <div v-for="video in videos" :key="video.videoNumber">
        <div class="video-card">
          <VideoCoverCard :video="video"></VideoCoverCard>
          <div class="link-font__outer">
            <el-link type="default" :href="`/play?videoNumber=${video.videoNumber}`" :underline="false" target="_blank">
              <div class="link-font">
                {{ video.videoName }}
              </div>
            </el-link>
          </div>
        </div>
      </div>
    </el-space>
  </div>
</template>
<script setup>
import { getTypeName } from '@/utils/mockVideoInfo.js';
import VideoCoverCard from './VideoCoverCard.vue';
defineProps({
  videos: {
    type: Array,
    required: true,
  }
})

</script>
<style scoped>
.video-card {
  width: 250px;
  margin: 8px;
}

.link-font {
  font-size: medium;
  font-weight: bold;
}

.link-font__outer {
  text-align: center;
  margin-top: 5px;
}
</style>