// import { UserAuth } from '@/wraper/UserAuth'
import { Constants } from '@/constants'

import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import route from '@/router/route'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: route
})

const checkAuth = (name: string | null | undefined, requireAuth: boolean): string => {
    let path: string = ''
    const isLoginPath = name && name == 'login'

    const authStore = useAuthStore()
    if (!authStore.isLogin && (isLoginPath || requireAuth)) {
        const isLogin = localStorage.getItem(Constants.LS_IS_LOGIN)
        if (isLogin && isLogin == String(true)) {
            if (requireAuth || isLoginPath) {
                authStore.isLogin = true
                authStore.trackExpire(router)
            }

            if (isLoginPath) path = 'home'
        } else if (!isLoginPath) {
            path = 'login'
        }
    }
    return path
}

router.beforeEach((to, from, next) => {
    const path = checkAuth(to.name?.toString(), Boolean(to.meta.requireAuth))
    if (path) next({ name: path })
    else next()
})

// router.afterEach((to, from) => {
// });
export default router
