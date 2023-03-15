import Request from './request'
import { BASE_URL, TIME_OUT } from './config'
import { localCache } from '@/utils/cache'

const request = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      const token = localCache.getCache('token')
      if (config.headers && typeof config.headers.set === 'function') {
        config.headers.set('Authorization', `Bearer ${token}`)
      }
      return config
    }
  }
})

// export const request2 = new Request({
//   baseURL: 'http://codercba.com:1888/airbnb/api',
//   timeout: 6000,
//   interceptors: {
//     requestSuccessFn: (config) => {
//       console.log('request2请求成功拦截器')
//       return config
//     },
//     requestFailureFn: (reject) => {
//       console.log('request2请求失败拦截器')
//       return reject
//     },
//     responseSuccessFn: (res) => {
//       console.log('request2响应成功拦截器')
//       return res
//     },
//     responseFailureFn: (err) => {
//       console.log('request2响应失败拦截器')
//       return err
//     }
//   }
// })

export default request
