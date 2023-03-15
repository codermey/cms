<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useLoginStore from '@/store/login/login'
import { mapPathToMenu } from '@/utils/map-menus'

defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})
const loginStore = useLoginStore()
const menus = loginStore.menus

// 监听 el-menu-item 点击，跳转到对应路由
const router = useRouter()
const handleItemClick = (url: any) => {
  router.push(url)
}

// 刷新页面保持菜单
const route = useRoute()
const defaultActive = computed(() => {
  const pathMenu = mapPathToMenu(route.path, menus)
  return String(pathMenu.id)
})
</script>

<template>
  <div class="main-menu">
    <div class="logo">
      <img src="@/assets/img/logo.svg" alt="" />
      <h2 v-show="!isFold">小马后台管理系统</h2>
    </div>
    <el-menu
      :default-active="defaultActive"
      class="el-menu"
      text-color="rgb(183, 189, 195)"
      background-color="#001529"
      :collapse="isFold"
    >
      <template v-for="item in menus" :key="item.id">
        <el-sub-menu :index="String(item.id)">
          <template #title>
            <el-icon>
              <component :is="item.icon.split('-icon-')[1]"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <template v-for="i in item.children" :key="i.id">
            <el-menu-item :index="String(i.id)" @click="handleItemClick(i.url)">
              {{ i.name }}
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<style lang="less" scoped>
.main-menu {
  background-color: #001529;
  .logo {
    display: flex;
    align-items: center;
    padding: 12px 10px 8px;
    height: 28px;
    background-color: #001529;
    overflow: hidden;
    img {
      margin: 0 10px;
      height: 100%;
    }
    h2 {
      font-size: 16px;
      color: #fff;
      white-space: nowrap;
    }
  }
  .el-menu {
    border-right: none !important;
    .el-menu-item {
      background-color: #0c2135;
    }
    .el-menu-item.is-active {
      background-color: #0a60bd;
    }
  }
}
</style>
