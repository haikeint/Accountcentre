export class UserAuth {
  public user_id: string
  public accessToken: string
  public isAuthenticated: boolean

  constructor(user_id: string = '', accessToken: string = '') {
    this.user_id = user_id
    this.accessToken = accessToken
    this.isAuthenticated = user_id && accessToken ? true : false
  }
}
