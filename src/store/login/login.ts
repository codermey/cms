import { defineStore } from 'pinia'
import router from '@/router'
import { postLoginApi, getUserApi, getMenuApi } from '@/service/api/login/login'
import type { Ilogin } from '@/service/api/login/type'
import { localCache } from '@/utils/cache'
import { mapMenusToPermissions, mapMenusToRoutes } from '@/utils/map-menus'

// 定义常量
const TOKEN = 'token'
const USER_INFO = 'userInfo'
const MENUS = 'menus'

interface IloginState {
  token: string
  userInfo: any
  menus: any[]
  permissions: any[]
}

const useLoginStore = defineStore('login', {
  state: (): IloginState => ({
    token: '',
    userInfo: {},
    menus: [],
    permissions: []
  }),
  actions: {
    async login(loginData: Ilogin) {
      // 账号登录获取token等信息
      const loginRes = await postLoginApi(loginData)
      const id = loginRes.data.id
      this.token = loginRes.data.token
      localCache.setCache(TOKEN, loginRes.data.token)

      // 获取登录用户的详细信息
      const userInfoRes = await getUserApi(id)
      const userInfo = userInfoRes.data
      this.userInfo = userInfo
      localCache.setCache(USER_INFO, userInfo)

      // 获取角色菜单
      const menuRes = await getMenuApi(userInfo.role.id)
      const menus = menuRes.data
      this.menus = menus
      localCache.setCache(MENUS, menus)

      // 获取登录用户所有按钮权限
      const permissions = mapMenusToPermissions(menus)
      this.permissions = permissions

      // 动态添加的路由
      const routes = mapMenusToRoutes(menus)
      routes.forEach((route) => router.addRoute('main', route))

      // 跳转到main页面
      router.replace('/main')
    },
    // 用户刷新加载本地数据
    loadLocalCacheAction() {
      const token = localCache.getCache(TOKEN)
      const userInfo = localCache.getCache(USER_INFO)
      const menus = localCache.getCache(MENUS)
      this.token = token
      this.userInfo = userInfo
      this.menus = menus
      if (token && userInfo && menus) {
        // 获取登录用户所有按钮权限
        const permissions = mapMenusToPermissions(menus)
        this.permissions = permissions

        // 动态添加的路由
        const routes = mapMenusToRoutes(menus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
