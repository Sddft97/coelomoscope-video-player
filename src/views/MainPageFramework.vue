<template>
  <div>
    <el-container direction="vertical">
      <el-header height="auto">
        <TopFunctionBar v-if="isFunctionBarShow" />
        <TopMenu />
      </el-header>
      <el-main>
        <RouterView></RouterView>
      </el-main>
    </el-container>
  </div>
</template>
<script setup>
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { ref, onMounted } from "vue";
import TopFunctionBar from '../components/global/TopFunctionBar.vue';
import TopMenu from '../components/global/TopMenu.vue';
const route = useRoute();
const isFunctionBarShow = ref(true);
const showFunctionBarPages = ['home', 'CourseSearch'];
onMounted(() => {
  isFunctionBarShow.value = showFunctionBarPages.includes(route.name);// 只有主页和搜索页显示搜索栏
})
</script>
<style lang="css" scoped>

</style>