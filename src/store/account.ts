import { defineStore } from 'pinia'
import { reactive } from 'vue'
import fetchGraphQL from '@/graphql/fetchGraphQL'
import { AccountResult } from '@/wraper/AccountResult'
import { QUERY_GET_ACCOUNT } from '@/graphql/account'

export const useAccountStore = defineStore('account', () => {
    const account = reactive<AccountResult>(new AccountResult())
    const getAccount = () => {
        fetchGraphQL(QUERY_GET_ACCOUNT).then((result) => {
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
                    }

                    account[accoutKey] = accountResult
                }
            }
        })
    }

    return { account, getAccount }
})
