<template>
  <div>
    <el-row>
      <el-col>
        <div class="top-menu" style="margin-top: 20px;">
          <el-menu :default-active="activeMenuIndex" class="el-menu-demo" mode="horizontal" background-color="#568ad6"
            text-color="#fff" active-text-color="#ffd04b" :ellipsis="false">
            <el-menu-item index="/" @click="toHome">首页</el-menu-item>
            <el-sub-menu index="/search">
              <template #title>课程资源</template>
              <el-menu-item index="/search" v-for="(vType) in additionalTypeList" :key="vType.value"
                @click="typeChange(vType.value)">{{ vType.name }}</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/course/dept">科系课程</el-menu-item>
            <el-menu-item index="/knowledge">知识库</el-menu-item>
            <el-menu-item index="/data/statistic">数据分析</el-menu-item>
            <el-menu-item index="/questionnaire">问卷填写</el-menu-item>
            <el-menu-item index="/feedback">建议反馈</el-menu-item>
            <div style="flex-grow: 1;" />
            <el-menu-item>
              <el-dropdown>
                <div class="menu-item__right">
                  <el-avatar :src="userInfo.avatar" />
                </div>
                <template #dropdown>
                  <div style="padding:8px">
                    <el-dropdown-menu>
                      <el-dropdown-item @click="toAccountView">
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
            </el-menu-item>
            <el-menu-item>
              <el-dropdown>
                <div class="menu-item__right">
                  <el-icon :size="40">
                    <Bell />
                  </el-icon>
                </div>
                <template #dropdown>
                  <div style="padding:8px">
                    <el-dropdown-menu>
                      <el-dropdown-item v-for="(_, index) in 5" :key="index">
                        <h4>这里是第{{ index+ 1}}条通知</h4>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </div>
                </template>
              </el-dropdown>
            </el-menu-item>
          </el-menu>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import userInfo from '@/utils/userInfoDto.js';
import { typeList } from '@/utils/mockVideoInfo.js';
import {
  useRouter
} from "vue-router";
import { data, method } from '@/utils/searchInfo';
const additionalTypeList = [{ name: "全部课程", value: "" }, ...typeList];
const router = useRouter();
const props = defineProps({
  activeMenuIndex: {
    type: String,
    default: '/'
  }
});
const typeChange = (type) => {
  data.searchData.videoType = type;
  router.push('/search');
  props.flushHandler();
}
const toHome = () => {
  method.reset();
  router.push('/');
}
const toAccountView = () => {
  const accountHomeUrl = router.resolve('/account/home');
  window.open(accountHomeUrl.href, '_blank');
}
</script>
<style lang="css" scoped>
.menu-item__right {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  height: var(--el-menu-item-height);
}
</style>