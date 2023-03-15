<script setup lang="ts" name="role">
import { nextTick, ref } from 'vue'
import { storeToRefs } from 'pinia'
import searchConfig from './config/role-search'
import contentConfig from './config/role-content'
import modalConfig from './config/role-modal'
import usePageModal from '@/hooks/usePageModal'
import usePageContent from '@/hooks/usePageContent'
import { mapMenuListToIds } from '@/utils/map-menus'
import useSystemStore from '@/store/main/system/system'
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModal from '@/components/page-modal/page-modal.vue'
import type { ElTree } from 'element-plus'

const { pageModalRef, newClick, editClick } = usePageModal(editCallback)
const { pageContentRef, queryClick, refreshClick } = usePageContent()

// 获取菜单列表数据
const systemStore = useSystemStore()
const { menuList } = storeToRefs(systemStore)
systemStore.postMenuList()

// 选中的菜单
const selectMenu = ref<number[]>([])
const handleElTreeCheck = (data1: any, data2: any) => {
  selectMenu.value = [...data2.checkedKeys, ...data2.halfCheckedKeys]
}

// 点击编辑 el-tree 数据回显
const elTreeRef = ref<InstanceType<typeof ElTree>>()
function editCallback(formItem: any) {
  const menuIds = mapMenuListToIds(formItem.menuList)
  nextTick(() => {
    elTreeRef.value?.setCheckedKeys(menuIds)
  })
}
</script>

<template>
  <div class="role">
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
    <page-modal ref="pageModalRef" :modal-config="modalConfig" :menu-list="selectMenu">
      <template #menulist>
        <el-tree
          ref="elTreeRef"
          :data="menuList"
          node-key="id"
          :props="{
            children: 'children',
            label: 'name'
          }"
          show-checkbox
          @check="handleElTreeCheck"
        />
      </template>
    </page-modal>
  </div>
</template>

<style scoped></style>
