<script setup lang="ts" name="main">
import { ref } from 'vue'
import mainMenu from './components/main-menu/main-menu.vue'
import mainHeader from './components/main-header/main-header.vue'

// 折叠逻辑的处理
const isFold = ref(false)
const handleAside = (flag: boolean) => {
  isFold.value = flag
}
</script>
<template>
  <div class="main">
    <el-container>
      <el-aside :width="isFold ? '64px' : '210px'">
        <main-menu :is-fold="isFold"></main-menu>
      </el-aside>
      <el-container>
        <el-header height="48px">
          <main-header @change-aside="handleAside"></main-header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style lang="less" scoped>
.main {
  height: 100%;
  .el-container {
    height: 100%;
    .el-aside {
      background-color: #0c2135;
      transition: width 0.4s ease;
    }
    .el-main {
      background-color: #f0f2f5;
    }
  }
}
</style>
