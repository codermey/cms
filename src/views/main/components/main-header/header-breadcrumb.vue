<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import useLoginStore from '@/store/login/login'
import { mapPathToBreadcrumbs } from '@/utils/map-menus'

const route = useRoute()
const loginStore = useLoginStore()
const menus = loginStore.menus
const breadcrumbs = computed(() => mapPathToBreadcrumbs(route.path, menus))
</script>

<template>
  <div class="header-breadcrumb">
    <el-breadcrumb separator-icon="CaretRight">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<style lang="less" scoped></style>
