import { ref } from 'vue'
import type pageContent from '@/components/page-content/page-content.vue'

function usePageContent() {
  const pageContentRef = ref<InstanceType<typeof pageContent>>()
  // 查询用户
  const queryClick = (searchForm: any) => {
    pageContentRef.value?.fetchUserList(searchForm)
  }
  // 重置表格
  const refreshClick = () => {
    pageContentRef.value?.fetchUserList()
  }

  return { pageContentRef, queryClick, refreshClick }
}

export default usePageContent
