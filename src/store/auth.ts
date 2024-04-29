import type { IUserLogin } from '@/interface/IUserLogin'

import { FetchResult } from '@/wraper/FetchResult'
import { UserAuth } from '@/wraper/UserAuth'
import { Constants } from '@/constants'

import { defineStore } from 'pinia'
import makeHTTP from '@/ts/fetch'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    userAuth: new UserAuth()
  }),
  actions: {
    login(loginInfo: IUserLogin): Promise<FetchResult> {
      return new Promise((resolve) => {
        makeHTTP(Constants.URL_LOGIN, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: loginInfo.username, password: loginInfo.password })
        })
          .then((result: FetchResult) => {
            if (result.status == 200) {
              this.userAuth = new UserAuth(result.data.user_id, result.data.accessToken)
              localStorage.setItem(Constants.LS_USER_AUTH, JSON.stringify(this.userAuth))
              if (loginInfo.isRemember)
                localStorage.setItem(Constants.LS_IS_REMEMBER, JSON.stringify(loginInfo.username))
              else localStorage.removeItem(Constants.LS_IS_REMEMBER)
            }
            resolve(result)
          })
          .catch((error) => {
            resolve(error)
          })
      })
    },
    logout() {
      this.userAuth = new UserAuth()
      localStorage.removeItem(Constants.LS_USER_AUTH)
    }
  }
})
