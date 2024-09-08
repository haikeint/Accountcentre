import { Constants } from '@/constants'
import { defineStore } from 'pinia'
import fetchGraphQL from '@/graphql/fetchGraphQL'
import { MUTATION_LOGOUT } from '@/graphql/account'
import { useNotifyStore } from '@/store/notify'

const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
        return parts.pop()?.split(';').shift() || null
    }
    return null
}

const startTimeOut = (ms: number) => {
    return new Promise((res) => {
        setTimeout(() => {
            console.log('startTimeOut')
            res(true)
        }, ms)
    })
}

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        isLogin: false,
        isTrackExpire: false
    }),
    actions: {
        logout() {
            return new Promise((res) => {
                fetchGraphQL(MUTATION_LOGOUT).then((result) => {
                    this.isLogin = false
                    localStorage.removeItem(Constants.LS_IS_LOGIN)
                    res(result)
                })
            })
        },
        trackExpire(route: any) {
            if (!this.isTrackExpire) {
                this.isTrackExpire = true
                this.checkExpire(route)
            }
        },
        async checkExpire(route: any) {
            let timeDifference = 0
            do {
                const AccessTokenExpire = getCookie(Constants.ACCESS_TOKEN_EXPIRE)
                const serverTimeUTCString = decodeURIComponent(AccessTokenExpire ?? '') || null

                if (serverTimeUTCString == null) break
                const serverDate = new Date(serverTimeUTCString)
                const currentDate = new Date()
                timeDifference = serverDate.getTime() - currentDate.getTime()

                if (timeDifference <= 0) break
            } while (await startTimeOut(timeDifference))

            if (this.isLogin) {
                const notifyStore = useNotifyStore()
                notifyStore.setNotify('Phiên đăng nhập hết hạn')
                route.push({ name: 'login' })
            }
        }
    }
})
