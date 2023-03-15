<script setup lang="ts">
import { ref, watch } from 'vue'
import { localCache } from '@/utils/cache'
import paneAccount from './pane-account.vue'
import paneIphone from './pane-iphone.vue'

// 定义常量
const REMEBER_PASSWORD = 'remeberPassword'
// 账号、手机号登录切换
const activeModel = ref('account')
// 是否记住密码
const isRemeberPassword = ref<boolean>(localCache.getCache(REMEBER_PASSWORD) ?? false)
watch(isRemeberPassword, (newValue) => {
  localCache.setCache(REMEBER_PASSWORD, newValue)
})
// 点击登录
const paneAccountRef = ref<InstanceType<typeof paneAccount>>()
const loginClick = () => {
  if (activeModel.value === 'account') {
    paneAccountRef.value?.loginFrom(isRemeberPassword.value)
  } else {
    console.log('手机号登录')
  }
}
</script>

<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs stretch type="border-card" v-model="activeModel">
      <el-tab-pane name="account">
        <template #label>
          <div class="tab-pane-title">
            <el-icon color="#409EFC">
              <UserFilled />
            </el-icon>
            <span class="text">账号登录</span>
          </div>
        </template>
        <pane-account ref="paneAccountRef"></pane-account>
      </el-tab-pane>
      <el-tab-pane label="手机登录" name="iphone">
        <template #label>
          <div class="tab-pane-title">
            <el-icon color="#409EFC">
              <Iphone />
            </el-icon>
            <span class="text">手机登录</span>
          </div>
        </template>
        <pane-iphone></pane-iphone>
      </el-tab-pane>
    </el-tabs>
    <div class="password">
      <el-checkbox v-model="isRemeberPassword" label="记住密码" size="large" />
      <el-link type="primary"> 忘记密码 </el-link>
    </div>
    <el-button class="login-btn" type="primary" size="large" @click="loginClick">
      立即登录
    </el-button>
  </div>
</template>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  .title {
    text-align: center;
  }
  .el-tabs {
    .tab-pane-title {
      display: flex;
      justify-content: center;
      align-items: center;
      .text {
        margin-left: 5px;
      }
    }
  }
  .password {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
