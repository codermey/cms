<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import useLoginStore from '@/store/login/login'
import { localCache } from '@/utils/cache'

// 定义常量
const LOGIN_NAME = 'login/name'
const LOGIN_PASSWORD = 'login/password'

const accountForm = reactive({
  name: localCache.getCache(LOGIN_NAME) ?? '',
  password: localCache.getCache(LOGIN_PASSWORD) ?? ''
})

// 校验规则
const rules = reactive<FormRules>({
  name: [
    {
      required: true,
      message: 'Please input login account',
      trigger: 'blur'
    },
    { min: 6, max: 18, message: 'Length should be 6 to 18', trigger: 'blur' }
  ],
  password: [
    {
      required: true,
      message: 'Please input login password',
      trigger: 'blur'
    },
    { min: 6, max: 18, message: 'Length should be 6 to 18', trigger: 'blur' }
  ]
})

// 登录逻辑
const accountFormRef = ref<FormInstance>()
const loginStore = useLoginStore()
const loginFrom = (isRemeberPassword: boolean) => {
  accountFormRef.value?.validate((valid) => {
    if (!valid) return
    // 登录账号和密码
    const { name, password } = accountForm
    loginStore.login({ name, password }).then(() => {
      // 记住登录账号和密码
      if (isRemeberPassword) {
        localCache.setCache(LOGIN_NAME, name)
        localCache.setCache(LOGIN_PASSWORD, password)
      } else {
        localCache.removeCache(LOGIN_NAME)
        localCache.removeCache(LOGIN_PASSWORD)
      }
    })
  })
}

defineExpose({
  loginFrom
})
</script>

<template>
  <div class="pane-account">
    <el-form
      :model="accountForm"
      :rules="rules"
      label-width="60px"
      size="large"
      ref="accountFormRef"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="accountForm.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="accountForm.password" type="password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped></style>
