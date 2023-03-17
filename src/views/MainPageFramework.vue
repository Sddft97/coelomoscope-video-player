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
import { useRoute } from "vue-router";
import { ref, onMounted, watch } from "vue";
import TopFunctionBar from '../components/global/TopFunctionBar.vue';
import TopMenu from '../components/global/TopMenu.vue';
const route = useRoute();
const isFunctionBarShow = ref(true);
const showFunctionBarPages = ['Home', 'CourseSearch'];
watch(() => route.name, (newVal, oldVal) => {
  isFunctionBarShow.value = showFunctionBarPages.includes(newVal);
}, { immediate: true });
</script>
<style lang="css" scoped>

</style>