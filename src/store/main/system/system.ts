import { defineStore } from 'pinia'
import {
  postRoleApi,
  postDepartmentListApi,
  postMenuListApi
} from '@/service/api/main/system/system'

interface ISystem {
  roleList: any[]
  departmentList: any[]
  menuList: any[]
}

const useSystemStore = defineStore('system', {
  state: (): ISystem => ({
    // 角色列表
    roleList: [],
    // 部门列表
    departmentList: [],
    // 菜单列表
    menuList: []
  }),
  actions: {
    // 获取角色列表
    async postRole() {
      const res = await postRoleApi()
      this.roleList = res.data.list
    },

    // 获取部门列表
    async postDepartmentList() {
      const res = await postDepartmentListApi()
      this.departmentList = res.data.list
    },

    // 获取菜单列表
    async postMenuList() {
      const res = await postMenuListApi()
      this.menuList = res.data.list
    }
  }
})

export default useSystemStore
