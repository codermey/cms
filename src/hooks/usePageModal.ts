import { ref } from 'vue'
import type pageModal from '@/components/page-modal/page-modal.vue'

type callbackTepy = (data?: any) => void

function usePageModal(editCallback?: callbackTepy) {
  const pageModalRef = ref<InstanceType<typeof pageModal>>()
  // 新建用户
  const newClick = () => {
    pageModalRef.value?.setModalVisible()
  }
  // 编辑
  const editClick = (formItem: any) => {
    pageModalRef.value?.setModalVisible(false, formItem)
    if (editCallback) editCallback(formItem)
  }

  return { pageModalRef, newClick, editClick }
}

export default usePageModal
