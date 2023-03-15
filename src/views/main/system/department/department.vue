<script setup lang="ts" name="department">
import searchConfig from './config/department-search'
import contentConfig from './config/department-content'
import modalConfig from './config/department-modal'
import useSelectModal from '@/hooks/useSelectModal'
import usePageModal from '@/hooks/usePageModal'
import usePageContent from '@/hooks/usePageContent'
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModal from '@/components/page-modal/page-modal.vue'

const { pageModalRef, newClick, editClick } = usePageModal()
const { pageContentRef, queryClick, refreshClick } = usePageContent()
const { pageModalConfig } = useSelectModal(modalConfig)
</script>

<template>
  <div class="department">
    <pageSearch
      :search-config="searchConfig"
      @query-click="queryClick"
      @refresh-click="refreshClick"
    >
    </pageSearch>
    <page-content
      ref="pageContentRef"
      :content-config="contentConfig"
      @new-click="newClick"
      @edit-click="editClick"
    >
    </page-content>
    <page-modal ref="pageModalRef" :modal-config="pageModalConfig"></page-modal>
  </div>
</template>

<style scoped lang="less"></style>
