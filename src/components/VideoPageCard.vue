<template>
  <div>
    <el-table :data="videoInfoList" style="width: 100%">
      <el-table-column fixed>
        <template v-slot:default="{ row }">
          <div class="left-card">
            <el-link type="primary" :href="`/play?${row.videoName}`" :underline="false">
              <el-image style="width: 100%;" :src="row.coverUrl" fit="contain" />
            </el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="videoName" class="right-card">
        <template v-slot:default="{ row }">
          <div class="right-card">
            <el-link type="primary" :href="`/play?${row.videoName}`" :underline="false">
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
</script>
<style scoped>
.left-card {
  cursor: pointer;
}

.right-card {
  cursor: pointer;
}

.link-font {
  font-size: medium;
  font-weight: bold;
}
</style>