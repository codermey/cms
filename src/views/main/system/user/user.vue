<script setup lang="ts">
import usePageModal from '@/hooks/usePageModal'
import usePageContent from '@/hooks/usePageContent'
import useSelectModal from '@/hooks/useSelectModal'
import searchConfig from './config/user-search'
import contentConfig from './config/user-content'
import modalConfig from './config/user-modal'
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModal from '@/components/page-modal/page-modal.vue'

/* 获取角色列表和部门列表逻辑处理 */
// const systemStore = useSystemStore()
// systemStore.postRole()
// systemStore.postDepartmentList()
// const { roleList, departmentList } = storeToRefs(systemStore)
// const userModalConfig = computed(() => {
//   modalConfig.formItems.forEach((item) => {
//     if (item.prop === 'departmentId') {
//       item.options?.push(...departmentList.value)
//     } else if (item.prop === 'roleId') {
//       item.options?.push(...roleList.value)
//     }
//   })
//   return modalConfig
// })
/* 查询 重置 用户数据相关操作 */
const { pageContentRef, queryClick, refreshClick } = usePageContent()
/* 新建 编辑 用户相关操作 */
const { pageModalRef, newClick, editClick } = usePageModal()
/* 获取 modal 部门、角色数据 */
const { pageModalConfig } = useSelectModal(modalConfig)
</script>

<template>
  <div class="user">
    <page-search
      :search-config="searchConfig"
      @query-click="queryClick"
      @refresh-click="refreshClick"
    >
    </page-search>
    <page-content
      ref="pageContentRef"
      :content-config="contentConfig"
      @new-click="newClick"
      @edit-click="editClick"
    >
      <template #enable="scope">
        <el-button size="small" plain :type="scope.row.enable ? 'success' : 'danger'">
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
    </page-content>
    <page-modal ref="pageModalRef" :modal-config="pageModalConfig"></page-modal>
  </div>
</template>

<style scoped lang="less"></style>
