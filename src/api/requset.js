import axios from 'axios'
import store from '../store'
import { ElLoading, ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'

let loadingInstance = null

export function request(config, loading = true) {
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:3000',
    timeout: 5000, // 超时配置
    headers: {
      token: store.getters.token
    }
  })

  // 添加请求拦截器
  instance.interceptors.request.use(config => {
    // 在发送请求之前做什么
    loadingInstance = loading ? ElLoading.service() : null
    return config
  }, error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  })
  
  // 添加响应拦截器
  instance.interceptors.response.use(res => {
    // 响应数据处理
    loadingInstance?.close()
    console.log(res)
    if(res.data.code === 401 || res.data.code === 0) {
      ElMessage({
        message: res.data.msg,
        type: 'error',
      })
    } else {
      return res
    }
  }, error => {
    // 对响应错误处理
    loadingInstance?.close()
    ElMessage({
      message: '服务端异常',
      type: 'error',
    })
  })

  return instance(config)
}