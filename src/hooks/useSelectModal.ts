import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
import type { ImodalConfig } from '@/components/page-modal/type'

function useSelectModal(modalConfig: ImodalConfig) {
  const systemStore = useSystemStore()
  systemStore.postRole()
  systemStore.postDepartmentList()
  const { roleList, departmentList } = storeToRefs(systemStore)
  const pageModalConfig = computed(() => {
    modalConfig.formItems.forEach((item) => {
      if (item.options?.length === 0) {
        if (item.prop === 'departmentId' || item.prop === 'parentId') {
          item.options?.push(...departmentList.value)
        } else if (item.prop === 'roleId') {
          item.options?.push(...roleList.value)
        }
      }
    })
    return modalConfig
  })
  return { pageModalConfig }
}

export default useSelectModal
