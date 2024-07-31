// import { UserAuth } from '@/wraper/UserAuth'
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

    if (requireAuth && !authStore.isLogin) {
        // const authInfo = JSON.parse(String(localStorage.getItem(Constants.LS_USER_ID))) as UserAuth
        const isLogin = localStorage.getItem(Constants.LS_IS_LOGIN)
        if (isLogin && isLogin == String(true)) {
            authStore.isLogin = true
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
