import request from '@/service'

/* 增删改查网络请求 */
// 1. 查
export function postListApi(pageName: string, data: any) {
  return request.post({
    url: `/${pageName}/list`,
    data
  })
}
// 2. 删
export function deleteApi(pageName: string, id: number) {
  return request.delete({
    url: `/${pageName}/${id}`
  })
}
// 3. 增
export function postNewApi(pageName: string, data: any) {
  return request.post({
    url: `/${pageName}`,
    data
  })
}
// 4. 改
export function patchEditApi(pageName: string, id: number, data: any) {
  return request.patch({
    url: `${pageName}/${id}`,
    data
  })
}
