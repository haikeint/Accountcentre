import { UserAuth } from '@/wraper/UserAuth'
import { Constants } from '@/constants'

import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import route from '@/router/route'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: route
})

const checkAuth = (requireAuth: boolean): string => {
  let path: string = ''
  const authStore = useAuthStore()

  if (requireAuth && !authStore.userAuth.isAuthenticated) {
    const authInfo = JSON.parse(String(localStorage.getItem(Constants.LS_USER_AUTH))) as UserAuth

    if (authInfo?.isAuthenticated) {
      authStore.userAuth = authInfo
    } else path = 'login'
  }
  return path
}

router.beforeEach((to, from, next) => {
  const path = checkAuth(Boolean(to.meta.requireAuth))
  if (path) next({ name: path })
  else next()
})

// router.afterEach((to, from) => {
// });
export default router
