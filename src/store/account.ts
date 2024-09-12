import { defineStore } from 'pinia'
import { reactive } from 'vue'
import fetchGraphQL, { type GraphQLResponse } from '@/graphql/fetchGraphQL'
import { AccountResult } from '@/wraper/AccountResult'
import { QUERY_GET_ACCOUNT } from '@/graphql/account'
import { HttpStatusCode } from '@/Util/RequestError'
import { Constants } from '@/constants'
import { useAuthStore } from '@/store/auth'
import { useNotifyStore } from '@/store/notify'

export const useAccountStore = defineStore('account', () => {
    const account = reactive<AccountResult>(new AccountResult())
    const getAccount = (router: any) => {
        fetchGraphQL(QUERY_GET_ACCOUNT)
            .then((result) => {
                const accountGQL = result.data.account
                for (const key in accountGQL) {
                    const accoutKey = key as keyof AccountResult
                    let accountResult = accountGQL[accoutKey]

                    if (accountResult !== null) {
                        switch (accoutKey) {
                            case 'gender':
                                accountResult = AccountResult.convertGender2String(
                                    Number(accountResult)
                                )
                                break
                            case 'createdat':
                                accountResult = accountResult.slice(0, 19).replace('T', ' ')
                                break
                            case 'birthdate':
                                accountResult = accountResult.slice(0, 10)
                                break
                            case 'isEmailVerified':
                                accountResult = accountResult ? accountResult : ''
                                break
                        }
                        account[accoutKey] = accountResult
                    }
                }
            })
            .catch((er: GraphQLResponse) => {
                if (
                    er.errors?.length &&
                    er.errors[0].extensions.statusCode == HttpStatusCode.Unauthorized
                ) {
                    localStorage.removeItem(Constants.LS_IS_LOGIN)
                    const authStore = useAuthStore()
                    const notifyStore = useNotifyStore()

                    authStore.isLogin = false
                    notifyStore.setNotify('Phiên đăng nhập hết hạn')
                    router.push({ name: 'login' })
                }
            })
    }

    return { account, getAccount }
})
