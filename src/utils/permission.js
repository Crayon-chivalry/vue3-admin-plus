import store from '../store'
import router from '../router'
import Layout from '@/layout'
import NProgress from 'nprogress' 
import 'nprogress/nprogress.css'

const whiteList = ['/login'] // 白名单

router.beforeEach(async(to, from, next) => {
  NProgress.start()

  document.title = to.meta.title ? to.meta.title : ''

  if(store.getters.token) {
    if(to.path == '/login') {
      next({path: '/'})
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if(hasRoles) {
        next()
      } else {
        let roles = await store.dispatch('user/getInfo')
        addRoute(roles)
        next({ ...to, replace: true })
      }
    }
  } else {
    if(whiteList.includes(to.path)) { // 免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向回登录页
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

// 添加动态路由
function addRoute(roles) {
  roles.forEach(item => {
    item = makeASyncRoutes(item)
    router.addRoute(item)
  })
}

// 重构异步路由结构
function makeASyncRoutes(data) {
  if(data.component === 'Layout') data.component = Layout
  else data.component = loadView(data.component)
  // 路由递归，转换组件对象和路径
  if(data.children && data.children.length > 0) {
    data.children.forEach(item => {
      item = makeASyncRoutes(item)
    })
  }
  return data
}

// 路由拼接
function loadView(view) {
  return () => import(`@/views/${view}`)
}