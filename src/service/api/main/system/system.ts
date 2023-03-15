import request from '@/service'

// 获取角色列表
export function postRoleApi() {
  return request.post({
    url: '/role/list'
  })
}
// 获取部门列表
export function postDepartmentListApi() {
  return request.post({
    url: '/department/list'
  })
}

// 获取菜单列表
export function postMenuListApi() {
  return request.post({
    url: '/menu/list'
  })
}
