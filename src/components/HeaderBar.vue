<template>
  <el-header>
    <el-row :gutter="20">
      <el-col :span="2">
        <div class="home-icon" @click="toHome">
          <el-icon :size="40">
            <HomeFilled />
          </el-icon>
        </div>
      </el-col>
      <el-col :span="20">
        <el-row>
          <el-col>
            <TopSearchBar :flushHandler="props.flushHandler"></TopSearchBar>
          </el-col>
        </el-row>
        <el-row class="type-selector">
          <el-col>
            <TypeSelector :flushHandler="props.flushHandler"></TypeSelector>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="2">
        <el-dropdown>
          <div style="cursor: pointer;">
            <el-avatar :icon="Avatar" />
          </div>
          <template #dropdown>
            <div style="padding:8px">
              <el-dropdown-menu>
                <el-dropdown-item>
                  <span>
                    <el-icon>
                      <User />
                    </el-icon>
                  </span>
                  <span>
                    用户中心
                  </span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <span>
                    <el-icon>
                      <Files />
                    </el-icon>
                  </span>
                  <span>
                    影像管理
                  </span>
                </el-dropdown-item>
                <el-divider />
                <el-dropdown-item>
                  <span>
                    <el-icon>
                      <SwitchButton />
                    </el-icon>
                  </span>
                  <span>
                    退出登录
                  </span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </div>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>
  </el-header>
</template>
<script setup>
import { Avatar } from '@element-plus/icons-vue'
import TopSearchBar from '@/components/TopSearchBar.vue';
import TypeSelector from '@/components/TypeSelector.vue';
import {
  useRouter
} from "vue-router";
import { data, method } from '@/utils/searchInfo';
const router = useRouter();
const props = defineProps({
  flushHandler: {
    type: Function,
    default: () => { }
  }
});
const toHome = () => {
  method.reset();
  router.push('/');
}
</script>
<style scoped>
.home-icon {
  cursor: pointer;
}

.type-selector {
  margin-top: 8px;
}
</style>