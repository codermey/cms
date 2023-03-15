<script setup lang="ts">
import { reactive } from 'vue'

const iphoneForm = reactive({
  iphone: '',
  code: ''
})
</script>

<template>
  <div class="pane-iphone">
    <el-form ref="iphoneFormRef" :model="iphoneForm" label-width="60px" size="large">
      <el-form-item label="手机号" prop="iphone">
        <el-input v-model="iphoneForm.iphone" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="verify-code">
          <el-input v-model="iphoneForm.code" />
          <el-button type="primary" class="btn-code">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.pane-iphone {
  .verify-code {
    display: flex;
    .btn-code {
      margin-left: 8px;
    }
  }
}
</style>
