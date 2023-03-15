<script setup lang="ts" name="menu">
import contentConfig from './config/menu-content'
import pageContent from '@/components/page-content/page-content.vue'
</script>

<template>
  <div class="menu">
    <page-content :content-config="contentConfig"> </page-content>
  </div>
</template>

<style scoped></style>
