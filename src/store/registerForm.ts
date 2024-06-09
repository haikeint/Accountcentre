import { defineStore } from 'pinia'

export const useRegisterStore = defineStore({
  id: 'register',
  state: () => ({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
})
