import type { RouteRecordRaw } from 'vue-router'

/**
 * 动态获取本地所有路由
 * @returns {Array} 本地路由对象数组
 */
export function loadLocalRoutes() {
  const localRoutes: RouteRecordRaw[] = []
  // 读取router/main所有的ts文件
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
    eager: true
  })
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}

export let firstMenu: any = null

/**
 * 菜单列表映射路由权限
 * @param menus 菜单数组
 * @returns {Array} 路由对象数组
 */
export function mapMenusToRoutes(menus: any[]) {
  // 获取本地所有路由路径
  const localRoutes = loadLocalRoutes()
  // 根据菜单去匹配正确的路由
  const routes: RouteRecordRaw[] = []
  for (const menu of menus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        routes.push(route)
      }
      // 记录第一个匹配的菜单
      if (!firstMenu && route) firstMenu = submenu
    }
  }
  return routes
}
/**
 * 根据路径匹配需要显示的菜单
 * @param path 需要匹配的路由路径
 * @param menus 所有的菜单
 */
export function mapPathToMenu(path: string, menus: any[]) {
  for (const menu of menus) {
    for (const subMenu of menu.children) {
      if (path === subMenu.url) {
        return subMenu
      }
    }
  }
}

/**
 * 根据路径匹配面包屑
 * @param path {String} 路径
 * @param menus {Array} 菜单
 * @returns {Array}
 */
export function mapPathToBreadcrumbs(path: string, menus: any[]) {
  const breadcrumbs: any[] = []
  for (const menu of menus) {
    for (const subMenu of menu.children) {
      if (path === subMenu.url) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: subMenu.name, path: subMenu.url })
      }
    }
  }
  return breadcrumbs
}

/**
 * 菜单列表映射id
 * @param menuList 菜单列表
 * @returns { ids } id列表
 */
export function mapMenuListToIds(menuList: any[]) {
  const ids: number[] = []
  function recursionGetIds(menuList: any[]) {
    for (const item of menuList) {
      if (item.children) {
        recursionGetIds(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  recursionGetIds(menuList)
  return ids
}

/**
 * 菜单列表映射按钮权限
 * @param {Array} menuList 菜单列表
 * @returns { permissions } 按钮权限列表
 */
export function mapMenusToPermissions(menuList: any[]) {
  const permissions: string[] = []

  function recurseGetPermission(menuList: any[]) {
    for (const item of menuList) {
      if (item.type === 3) {
        permissions.push(item.permission)
      } else {
        recurseGetPermission(item.children ?? [])
      }
    }
  }
  recurseGetPermission(menuList)
  return permissions
}
