import { createRouter, createWebHashHistory } from 'vue-router'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'

const routes = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/main/main.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/not-found/not-found.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to) => {
  const token = localCache.getCache('token')
  // 没有登录跳转到登录页面
  if (to.path !== '/login' && !token) {
    return '/login'
  }
  // 跳转到第一个菜单路径对应的路由
  if (to.path === '/main') {
    return firstMenu.url
  }
})
export default router
