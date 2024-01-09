import axios from 'axios'
import store from '../store'
import router from '../router'
import { ElLoading, ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'

let loadingInstance = null

export function request(config, loading = true) {
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:3000',
    timeout: 5000,
    headers: {
      token: store.getters.token
    }
  })

  // 添加请求拦截器
  instance.interceptors.request.use(config => {
    loadingInstance = loading ? ElLoading.service() : null
    return config
  }, error => {
    return Promise.reject(error)
  })
  
  // 添加响应拦截器
  instance.interceptors.response.use(res => {
    loadingInstance?.close()
    if(res.data.code === 401 || res.data.code === 0) {
      ElMessage({
        message: res.data.msg,
        type: 'error',
      })
      // 登录失效
      if(res.data.code === 401) {
        store.dispatch('user/resetToken').then(() => {
          router.push('/login')
        })
      }
      return Promise.reject(error);
    }
    return res
  }, error => {
    loadingInstance?.close()
    ElMessage({
      message: '服务端异常',
      type: 'error',
    })
    return Promise.reject(error);
  })

  return instance(config)
}