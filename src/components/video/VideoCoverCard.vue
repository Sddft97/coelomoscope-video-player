<template>
  <div class="video-card__wrap">
    <div class="video-image">
      <el-link type="default" :href="`/play?videoNumber=${video.videoNumber}`" :underline="false" target="_blank">
        <video :src="video.videoUrl" style="width: 100%;border-radius: 6px;"></video>
      </el-link>
    </div>
    <div class="video-mask">
      <div class="video-stats">
        <div class="video-stats--left">
          <span class="video-stats--item">{{ getTypeName(video.videoType) }}</span>
          <span class="video-stats--item">{{ video.createTime }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { getTypeName } from '@/utils/mockVideoInfo.js';
defineProps({
  video: {
    type: Object,
    required: true,
  }
})
</script>
<style lang="css" scope>
.video-card__wrap {
  position: relative;
  border-radius: 6px;
  z-index: 1;
}

.video-stats--item {
  display: -webkit-flex;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-right: 12px;
}

.video-stats--left {
  min-width: 0;
  flex: 1;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.video-stats {
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 16px 8px 6px;
  width: 100%;
  height: 38px;
  font-size: 13px;
  line-height: 18px;
  color: #fff;
  background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .5) 100%);
  z-index: 2;
  box-sizing: border-box;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  word-break: keep-all;
  opacity: 1;
}

.video-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  opacity: 1;
  transition: all .2s linear .2s;
  pointer-events: none;
}
</style>