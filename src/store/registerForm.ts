import { defineStore } from 'pinia'

export const useRegisterStore = defineStore({
  id: 'register',
  state: () => ({
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
})
