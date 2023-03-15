import { defineStore } from 'pinia'
import { postListApi, deleteApi, postNewApi, patchEditApi } from '@/service/api/main/main'

interface IMain {
  pageList: any[]
  pageTotalCount: number
}

const useMainStore = defineStore('main', {
  state: (): IMain => ({
    // 列表数据
    pageList: [],
    // 列表总数
    pageTotalCount: 0
  }),
  actions: {
    // 获取列表
    async postList(pageName: string, queryInfo: any) {
      const res = await postListApi(pageName, queryInfo)
      this.pageList = res.data.list
      this.pageTotalCount = res.data.totalCount
    },
    // 删除
    async delete(pageName: string, id: number) {
      const { code, data } = await deleteApi(pageName, id)
      return { code, data }
    },
    // 新建
    async new(pageName: string, data: any) {
      const res = await postNewApi(pageName, data)
      this.postList(pageName, { size: 10, offset: 0 })
      return res
    },
    // 编辑
    async edit(pageName: string, id: number, data: any) {
      const res = await patchEditApi(pageName, id, data)
      this.postList(pageName, { size: 10, offset: 0 })
      return res
    }
  }
})

export default useMainStore
