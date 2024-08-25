import { Constants } from '@/constants'
import { defineStore } from 'pinia'
import fetchGraphQL from '@/graphql/fetchGraphQL'
import { MUTATION_LOGOUT } from '@/graphql/account'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        isLogin: false
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
        }
    }
})
