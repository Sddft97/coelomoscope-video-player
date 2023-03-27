<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
</script>
<script>
export default {
  beforeRouteEnter(to, from) {
    // TODO 此处做登录校验
    return true;
  }
}
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>

</style>
