<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="2">
        <div class="home-icon" @click="toHome">
          <el-icon :size="40">
            <HomeFilled />
          </el-icon>
        </div>
      </el-col>
      <el-col :span="22">
        <TopSearchBar :flushHandler="props.flushHandler"></TopSearchBar>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import TopSearchBar from './private/TopSearchBar.vue';
import { courseQueryCriteria, globalCourseSearch } from "../../utils/global-search/course";
import { resetQueryCriteria } from "../../utils/global-search/common";
import {
  useRouter
} from "vue-router";
const router = useRouter();
const props = defineProps({
  flushHandler: {
    type: Function,
    default: () => { }
  }
});
const toHome = () => {
  resetQueryCriteria(courseQueryCriteria);
  router.push('/');
}
</script>
<style lang="css" scoped>
.home-icon {
  cursor: pointer;
}
</style>