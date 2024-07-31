import { Constants } from '@/constants'
import { defineStore } from 'pinia'
import fetchGraphQL from '@/graphql/fetchGraphQL'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        isLogin: false
    }),
    actions: {
        logout() {
            return new Promise((res) => {
                const logoutMutate = `mutation Logout {
                    logout
                }`
                fetchGraphQL(logoutMutate).then((result) => {
                    this.isLogin = false
                    localStorage.removeItem(Constants.LS_IS_LOGIN)
                    res(result)
                })
            })
        }
    }
})
