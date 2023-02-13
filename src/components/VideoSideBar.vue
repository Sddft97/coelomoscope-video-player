<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="introduction" name="introduction">
        <template #title>
          <el-tag effect="plain" round size="large">
            视频简介
          </el-tag>
        </template>
        <VideoIntroduction></VideoIntroduction>
      </el-collapse-item>
      <el-collapse-item title="other videos" name="other videos">
        <template #title>
          <el-tag effect="plain" round size="large">
            同一分类的其他视频
          </el-tag>
        </template>
        <VideoPageCard></VideoPageCard>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script setup>
import VideoIntroduction from './VideoIntroduction.vue';
import VideoPageCard from './VideoPageCard.vue';
import { ref, watch } from "vue";
import { mainVideo } from "@/utils/global.js";
const activeNames = ref(['introduction', 'other videos']);

</script>
<style>

</style>