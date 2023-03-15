<script setup lang="ts">
import { ref } from 'vue'
import headerInfo from './header-info.vue'
import headerBreadcrumb from './header-breadcrumb.vue'
const emit = defineEmits(['changeAside'])

// 切换图标逻辑的处理
const isFold = ref(false)
const changeAside = () => {
  isFold.value = !isFold.value
  emit('changeAside', isFold.value)
}
</script>

<template>
  <div class="main-header">
    <div class="left">
      <el-icon size="28" @click="changeAside">
        <component :is="isFold ? 'Expand' : 'Fold'"></component>
      </el-icon>
      <div class="breadcrumb">
        <header-breadcrumb></header-breadcrumb>
      </div>
    </div>
    <div class="user-info">
      <header-info></header-info>
    </div>
  </div>
</template>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  height: 100%;
  .left {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    .el-icon {
      width: 28px;
      height: 28px;
    }
    .breadcrumb {
      padding-left: 18px;
    }
  }
}
</style>
