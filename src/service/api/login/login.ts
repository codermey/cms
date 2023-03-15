import request from '../../index'
import type { Ilogin } from './type'

// 用户登录
export function postLoginApi(data: Ilogin) {
  return request.post({
    url: '/login',
    data
  })
}

// 查询用户
export function getUserApi(id: number) {
  return request.get({
    url: `/users/${id}`
  })
}

// 查询角色菜单
export function getMenuApi(id: number) {
  return request.get({
    url: `/role/${id}/menu`
  })
}
