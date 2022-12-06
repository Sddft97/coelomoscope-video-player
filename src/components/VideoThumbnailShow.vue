<template>
  <div>
    <el-space wrap>
      <div v-for="video in videos" :key="video.videoNumber">
        <div class="video-card">
          <el-link type="default" :href="`/play?videoNumber=${video.videoNumber}`" :underline="false">
            <el-image style="width: 100%;" :src="video.coverUrl" fit="contain" />
          </el-link>
          <div class="link-font__outer">
            <el-link type="default" :href="`/play?videoNumber=${video.videoNumber}`" :underline="false">
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
import { defineProps } from 'vue';
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