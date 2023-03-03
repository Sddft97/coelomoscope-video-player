<template>
  <div>
    <el-container direction="vertical">
      <el-header height="auto">
        <TopMenu active-menu-index="/search" />
      </el-header>
      <el-main>
        <div class="navigation-bar">
          <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="`/search/${getCourseType(courseId).value}`">{{ getCourseType(courseId).name }}
            </el-breadcrumb-item>
            <el-breadcrumb-item>{{ getCourseName(courseId) }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="course-cover">
          <el-card>
            <div class="course-cover__item">
              <el-image :src="courseCoverImgsrc" style="  width: 35%;border-radius: 6px;" />
              <div class="course-cover__text">
                <div class="course-cover__text__inner">
                  <div class="course-name">{{ getCourseName(courseId) }}</div>
                  <div class="course-type">{{ getCourseType(courseId).name }}</div>
                </div>
                <div class="enter-course-btn">
                  <el-button type="primary" size="large" @click="toCourseDetail(courseId)">进入课程</el-button>
                </div>
              </div>
            </div>
          </el-card>
        </div>
        <div class="course-introduction">
          <div class="course-introduction__left">
            <el-card shadow="never">
              <el-tabs v-model="courseTabActiveName" stretch>
                <el-tab-pane label="课程简介" name="简介">课程简介</el-tab-pane>
                <el-tab-pane label="课程评价" name="评价">课程评价</el-tab-pane>
              </el-tabs>
            </el-card>
          </div>
          <div class="course-introduction__right">
            <el-card shadow="never">
              <el-descriptions :column="1">
                <template #title>
                  <span class="brand-color-bar"></span>
                  <span class="info-header__text">
                    基本信息
                  </span>
                </template>
                <el-descriptions-item label="课程名称">{{ getCourseName(courseId) }}</el-descriptions-item>
                <el-descriptions-item label="课程分类">{{ getCourseType(courseId).name }}</el-descriptions-item>
                <el-descriptions-item label="所属科系">{{ getCourseType(courseId).name }}</el-descriptions-item>
              </el-descriptions>
            </el-card>
            <el-card shadow="never">
              <el-descriptions :column="1">
                <template #title>
                  <span class="brand-color-bar"></span>
                  <span class="info-header__text">
                    参与医师
                  </span>
                </template>
                <el-descriptions-item v-for="doctor in relatedDoctors">{{ doctor }}</el-descriptions-item>
              </el-descriptions>
            </el-card>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script setup>
import TopMenu from '../components/global/TopMenu.vue';
import {
  useRoute,
  useRouter
} from "vue-router";
import { getTypeName, typeList } from '@/utils/mockVideoInfo.js';
import { ArrowRight } from '@element-plus/icons-vue'
import { ref, reactive } from "vue";
const route = useRoute();
const router = useRouter();
const courseId = route.params.courseId;
const courseTabActiveName = ref('简介')
const courseCoverImgsrc = "https://ts2.cn.mm.bing.net/th?id=OIP-C.f_sEou55jnzGiDFz58kCtwHaE4&w=307&h=203&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
const relatedDoctors = ['张三', '李四', '刘备'];

const getCourseType = (courseId) => {
  // TODO 根据课程id查询课程类型
  return typeList[0];
}
const getCourseName = (courseId) => {
  // TODO 根据课程id查询课程名称
  return '前列腺癌根治术';
}
const toCourseDetail = (courseId) => {
  router.push(`/course/${courseId}/detail`);
}
</script>
<style lang="css" scoped>
.course-introduction {
  display: flex;
  justify-content: space-between
}

.course-introduction__left {
  width: 75%;
}

.course-introduction__right {
  width: 23%;
}

.course-introduction__right .el-card {
  margin-bottom: 8px;
}


.brand-color-bar {
  background-color: rgb(7, 240, 228);
  border-radius: 4px;
  margin-right: 8px;
  padding: 2px;
}

.info-header__text {
  font-size: 20px;
}

.course-cover__item {
  display: flex;
  justify-content: center;
}

.course-cover__text__inner {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  flex: 0 0 25%;
}

.enter-course-btn {
  flex: 0 1 20%;
}

.course-cover__text {
  width: 20%;
  margin-left: 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}


.el-main>* {
  padding-bottom: 16px;
}

.course-name {
  font-size: 1.5em;
  font-weight: bold;
  display: block;
}

.course-type {
  font-size: 18px;
  color: var(--el-text-color-regular);
}
</style>