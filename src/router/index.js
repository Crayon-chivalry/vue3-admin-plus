import { createRouter, createWebHashHistory } from 'vue-router'

/**
 * 路由字段
 */
// 当设置 true 的时候该路由不会出现在侧边栏，如401、login等
// hidden: false

// 设置为 true, 显示根路由
// alwaysShow: true

// 设置 true 则不会被 <keep-alive> 缓存
// meta.noCache: true

// 设置 true, 则会固定在 tags-view 中
// affix: true

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
