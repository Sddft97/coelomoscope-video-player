<template >
  <div class="type-selector__outer">
    <el-tag style="margin-right: 8px;">视频类别</el-tag>
    <el-checkbox-group v-model="typeSelected" size="small" @change="typeChange">
      <el-checkbox-button v-for="typeInfo in typeList" :key="typeInfo.value" :label="typeInfo.value">
        {{ typeInfo.name }}
      </el-checkbox-button>
    </el-checkbox-group>
  </div>
</template>
<script setup>
import { typeList } from "@/utils/mockVideoInfo.js";
import { data, method } from '@/utils/searchInfo';
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  flushHandler: {
    type: Function,
    default: () => { }
  }
});
const typeSelected = ref([]);
const typeChange = (value) => {
  if (value.length > 1) {
    value.shift();
    typeSelected.value = [...value];
  }
  data.searchData.videoType = typeSelected.value.length > 0 ?
    (typeSelected.value)[0] : '';
  router.push('/search');
  props.flushHandler();
}
onMounted(() => {
  if (data.searchData.videoType !== '') {
    typeSelected.value.push(data.searchData.videoType);
  }
});
</script>
<style>
.type-selector__outer {
  display: flex;
}
</style>