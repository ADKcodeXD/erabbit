import axios from 'axios'
import store from '@/store'
import router from '@/router'

export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net'
const instance = axios.create({
  baseURL,
  timeout: 5000
})

instance.interceptors.request.use(config => {
  // 携带token
  const {
    profile
  } = store.state.user
  if (profile.token) {
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

instance.interceptors.response.use((response) => {
  return response.data
}, err => {
  if (err.response && err.response.status === 401) {
    // 未登录 跳转登录页 并携带当前路由地址
    // 使用$route.fullPath
    store.commit('user/setUser', {})
    // 使用encode进行转码  防止解析地址出问题
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    router.push('/login?redirectUrl=' + fullPath)
  }
  return Promise.reject(err)
})

// 工具函数
export default (url, method, submitData) => {
  // 负责发请求
  return instance({
    url,
    method,
    // 如果是get 请求 使用params 使用其他请求 使用data
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
