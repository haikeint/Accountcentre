<script lang="ts" setup>
import type { IInputEvent } from '@/interface/IInputEvent'
import type { IUserLogin } from '@/interface/IUserLogin'

import { FetchResult } from '@/wraper/FetchResult'

import InputText from '@/components/InputText.vue'
import ButtonView from '@/components/ButtonView.vue'

import { Constants } from '@/constants'

import { ref, reactive, toRaw, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()
const router = useRouter()

const btnLoginMessage = ref<string>('')
const inputDisabled = ref<boolean>(false)

const loginState: IUserLogin = reactive({
  username: '',
  password: '',
  isRemember: false
})

const validState: Record<string, string> = reactive({
  usernameClass: 'form-control',
  passwordClass: 'form-control'
})

onMounted(() => {
  const remember = localStorage.getItem(Constants.LS_IS_REMEMBER)
  if (remember) {
    loginState.username = remember
    loginState.isRemember = true
  }
})

const validFn = {
  blurUsername: (event: IInputEvent) => {
    validState.usernameClass = event.target.value
      ? 'form-control valid-txt'
      : 'form-control invalid-txt'
  },
  blurPassword: (event: IInputEvent) => {
    validState.passwordClass = event.target.value
      ? 'form-control valid-txt'
      : 'form-control invalid-txt'
  }
}

const checkValiation = () => {
  validState.usernameClass = !loginState.username
    ? 'form-control invalid-txt'
    : 'form-control valid-txt'
  validState.passwordClass = !loginState.password
    ? 'form-control invalid-txt'
    : 'form-control valid-txt'

  return !Object.values(validState).some((value) => value == 'form-control invalid-txt')
}

const btnRefresh = (event: IInputEvent, isLoading: boolean, message: string) => {
  inputDisabled.value = isLoading
  btnLoginMessage.value = isLoading ? '' : message
  event.target.innerHTML = isLoading
    ? '<i class="fas fa-spinner fa-spin"></i> Đang đăng nhập'
    : 'Đăng nhập'
}

const handleLogin = (event: IInputEvent) => {
  btnRefresh(event, true, '')
  if (checkValiation()) {
    authStore.login(toRaw(loginState)).then((result: FetchResult) => {
      if (result.error) {
        btnRefresh(event, false, `Lỗi: ${result.error.message}`)
      } else {
        router.push({ name: 'home' })
      }
    })
  } else {
    btnRefresh(event, false, '')
  }
}
</script>
<template>
  <div class="row">
    <div class="col-6 d-none d-lg-block position-relative">
      <div
        class="bg-holder min-vh-100"
        style="background-image: url(src/assets/img/generic/14.jpg); background-position: 50% 20%"
      ></div>
    </div>
    <div class="col-sm-10 col-md-6 px-sm-0 align-self-center mx-auto py-5 mg-15vh">
      <div class="row justify-content-center g-0">
        <div class="col-lg-9 col-xl-8 col-xxl-6">
          <div class="card">
            <div class="card-header bg-circle-shape bg-shape text-center p-2">
              <a
                class="font-sans-serif fw-bolder fs-5 z-1 position-relative link-light"
                href="../../../index.html"
                data-bs-theme="light"
                >falcon</a
              >
            </div>
            <div class="card-body p-4">
              <div class="row flex-between-center">
                <div class="col-auto">
                  <h3>Đăng nhập</h3>
                </div>
                <div class="col-auto fs-10 text-600">
                  <span class="mb-0 fw-semi-bold">Người dùng mới?</span>
                  <span>
                    <RouterLink :to="{ name: 'register' }"> Tạo tài khoản</RouterLink>
                  </span>
                </div>
              </div>
              <form>
                <div class="mb-3">
                  <InputText
                    id="ipUsername"
                    label="Tài khoản"
                    placeholder="nguyenvana"
                    message="Tài khoản không được để trống."
                    :className="validState.usernameClass"
                    :disabled="inputDisabled"
                    :events="{
                      blur: validFn.blurUsername,
                      change: (event: IInputEvent) => (loginState.username = event.target.value)
                    }"
                  />
                </div>
                <div class="mb-3">
                  <InputText
                    id="ipPassword"
                    label="Mật khẩu"
                    placeholder="abcABC@123"
                    message="Mật khẩu không được để trống."
                    type="password"
                    :className="validState.passwordClass"
                    :disabled="inputDisabled"
                    :events="{
                      blur: validFn.blurPassword,
                      change: (event: IInputEvent) => (loginState.password = event.target.value)
                    }"
                  />
                </div>
                <div class="row flex-between-center">
                  <div class="col-auto">
                    <div class="form-check mb-0">
                      <InputText
                        id="cb-remember"
                        checkboxLabel="Ghi nhớ tài khoản"
                        className="form-check-input"
                        type="checkbox"
                        :disabled="inputDisabled"
                        :events="{
                          change: (event: IInputEvent) =>
                            (loginState.isRemember = Boolean(event.target.value))
                        }"
                      />
                    </div>
                  </div>
                  <div class="col-auto">
                    <a class="fs-10" href="../../../pages/authentication/split/forgot-password.html"
                      >Quên mật khẩu?</a
                    >
                  </div>
                </div>
                <ButtonView
                  className="btn btn-primary d-block w-100 mt-3 mb-1"
                  html="Đăng nhập"
                  type="button"
                  :message="btnLoginMessage"
                  :disabled="inputDisabled"
                  :events="{
                    click: handleLogin
                  }"
                ></ButtonView>
              </form>
              <div class="position-relative mt-4">
                <hr />
                <div class="divider-content-center">hoặc đăng nhập bằng</div>
              </div>
              <div class="row g-2 mt-2">
                <div class="col-sm-6">
                  <a
                    class="btn btn-outline-google-plus btn-sm d-block w-100"
                    :class="{ disabled: inputDisabled }"
                    href="https://google.com"
                  >
                    <span class="fab fa-google-plus-g me-2" data-fa-transform="grow-8"></span>
                    google
                  </a>
                </div>
                <div class="col-sm-6">
                  <a
                    class="btn btn-outline-facebook btn-sm d-block w-100"
                    :class="{ disabled: inputDisabled }"
                    href="https://facebook.com"
                  >
                    <span class="fab fa-facebook-square me-2" data-fa-transform="grow-8"></span>
                    facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <ModalView @toggle="(event: Modal) => (MyModal = event)"></ModalView> -->
  <!-- <AlertView></AlertView> -->
</template>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.75s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
