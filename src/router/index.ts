import { createRouter, createWebHashHistory, RouteRecordRaw, RouteLocationNormalized } from 'vue-router'
import Login from '../views/login.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '登录',
    component: Login
  },
  {
    path: '/nav',
    name: 'nav',
    redirect: '/home',
    component: () => import('../views/layout/index.vue'),
    children: [
      {
        path: '/home',
        name: '首页',
        component: () => import('../views/home/index.vue'),
        meta: {
          breadcrumb: [],
          parent: '首页'
        }
      },
      {
        path: '/vuextable',
        name: '表格',
        component: () => import('../views/table/index.vue'),
        meta: {
          breadcrumb: [],
          parent: '表格'
        }
      },
      {
        path: '/Suspense',
        name: 'Suspense',
        component: () => import('../views/Suspense/index.vue'),
        meta: {
          breadcrumb: [],
          parent: 'Suspense'
        }
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
const canUserAccess = (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  if (to.path == '/') {
    return true;
  } else {
    if (sessionStorage.getItem('token')) {
      return true;
    } else {
      return !to.meta.parent ? true : router.push({ path: '/' })
    }
  }
}
router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  return await canUserAccess(to, from)
})
export default router
