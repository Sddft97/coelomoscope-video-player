<template>
  <div>
    <AccountFramework active-menu-index="/account/userInfo">
      <template #main>
        <el-card>
          <template #header>
            <div class="card-header">
              <el-icon :size="24">
                <User />
              </el-icon>
              <h3>用户信息</h3>
            </div>
          </template>
          <div class="user-info-body">
            <div class="user-avatar">
              <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"
                :on-error="handleUploadError">
                <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon">
                  <Plus />
                </el-icon>
              </el-upload>
            </div>
            <div class="user-info">
              <el-form :model="userInfo" label-width="120px">
                <el-form-item label="姓名">
                  <el-input v-model="userInfo.uname" />
                </el-form-item>
                <el-form-item label="角色">
                  <el-input v-model="userInfo.role" />
                </el-form-item>
                <el-form-item label="科室">
                  <el-input v-model="userInfo.dept" />
                </el-form-item>
                <el-form-item label="工作编号">
                  <el-input v-model="userInfo.uid" />
                </el-form-item>
                <el-form-item label="电子邮箱">
                  <el-input v-model="userInfo.email" />
                </el-form-item>
                <el-form-item label="手机号码">
                  <el-input v-model="userInfo.phone" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">保存</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-card>
      </template>
    </AccountFramework>
  </div>
</template>
<script setup>
import AccountFramework from '../components/account/AccountFramework.vue';
import { ElMessage } from 'element-plus'
import { ref, reactive } from "vue";
import userInfo from '@/utils/userInfoDto.js';

const onSubmit = () => {
  ElMessage.success('保存')
}
const handleAvatarSuccess = (
  response,
  uploadFile
) => {
  userInfo.avatar = URL.createObjectURL(uploadFile.raw)
}
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('头像需要为jpg或png格式图片!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('头像大小不能超过2MB!')
    return false
  }
  return true
}
const handleUploadError = (error, uploadFile, uploadFiles) => {
  ElMessage.error("上传失败，" + error)
}
</script>
<style scoped>
.user-info-body>* {
  margin-bottom: 50px
}

.avatar-uploader .avatar {
  width: 90px;
  height: 90px;
  display: block;
}

::v-deep .avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 100%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

::v-deep .avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

::v-deep .el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 90px;
  height: 90px;
  text-align: center;
}


.card-header {
  display: flex;
  align-items: center;
}

.card-header>* {
  margin-right: 8px;
}
</style>