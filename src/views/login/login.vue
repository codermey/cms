<script setup lang="ts">
import loginPanel from './components/login-panel.vue'
</script>
<template>
  <div class="login">
    <login-panel></login-panel>
  </div>
</template>
<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url(@/assets/img/login-bg.svg);
}
</style>
