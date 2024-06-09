<script lang="ts" setup>
import type { IInputEvent } from '@/interface/IInputEvent'
import { SHA256 } from 'crypto-js'

import InputText from '@/components/InputText.vue'
import ButtonView from '@/components/ButtonView.vue'

import { useRegisterStore } from '@/store/registerForm'
import { ref, reactive, toRaw } from 'vue'

import { useMutation } from '@vue/apollo-composable'
import { addUserMutate } from '@/graphql/user'

const inputDisabled = ref<boolean>(false)
const btnLoginMessage = ref<string>('')

const { mutate: addUser } = useMutation(addUserMutate)

const validMessage: Record<string, string> = reactive({
  email: '',
  username: '',
  password: '',
  confirmPassword: ''
})

const validState = reactive({
  usernameClass: 'form-control',
  emailClass: 'form-control',
  passwordClass: 'form-control',
  confirmPasswordClass: 'form-control'
})

const registerStore = useRegisterStore()

const validFn = {
  checkUsername: (value: string) => {
    validMessage.username = value ? '' : 'Tài khoản không được để trống.'
    validState.usernameClass = value ? 'form-control valid-txt' : 'form-control invalid-txt'
  },
  checkEmail: (value: string) => {
    let result = ''
    if (value) {
      let emailEl = value.split('@')
      if (emailEl.length < 2) result = 'Email cần có ký tự: @'
      if (!result && !emailEl[0]) result = 'Phía trước @ không được để trống'
      if (!result && !emailEl[1].includes('.')) result = 'Phía sau @ cần có ký tự: "."'
      else if (!result) {
        let beforeEmailEl = emailEl[1].split('.')
        if (!beforeEmailEl[1]) result = 'Phía sau "." không được để trống'
        if (!beforeEmailEl[0]) result = 'Phía trước "." không được để trống'
      }
    } else result = 'Email không được để trống.'

    validMessage.email = result
    validState.emailClass = result ? 'form-control invalid-txt' : 'form-control valid-txt'
  },
  checkPassword: (value: string) => {
    let validReslut: boolean = true
    let message: string[] = []
    if (!value) {
      validReslut = false
      message.push('Mật khẩu không được để trống.')
    }

    if (validReslut && value) {
      if (!(value.length >= 6 && value.length <= 16)) {
        validReslut = false
        message.push('Độ dài từ 6 - 16 ký tự')
      }

      if (!/[A-Z]/.test(value)) {
        validReslut = false
        message.push('Ít nhất 1 chữ in Hoa')
      }

      if (!/[a-z]/.test(value)) {
        validReslut = false
        message.push('Ít nhất 1 chữ thường')
      }
      if (!/[0-9]/.test(value)) {
        validReslut = false
        message.push('Ít nhất 1 số')
      }
      if (!/[^A-Za-z0-9]/.test(value)) {
        validReslut = false
        message.push('Ít nhất 1 ký tự đặc biệt')
      }
    }
    validMessage.password = validReslut ? '' : message.join('<br>')
    validState.passwordClass = validReslut ? 'form-control valid-txt' : 'form-control invalid-txt'
  },
  checkConfirmPassword: (value: string) => {
    let message = ''
    if (!value) message = 'Hãy nhập lại mật khẩu.'
    if (!message && value && value != registerStore.password)
      message = 'Mật khẩu vừa nhập không khớp.'

    validMessage.confirmPassword = message ? message : ''
    validState.confirmPasswordClass = message
      ? 'form-control invalid-txt'
      : 'form-control valid-txt'
  }
}

const checkValiation = () => {
  validFn.checkUsername(registerStore.username)
  validFn.checkEmail(registerStore.email)
  validFn.checkPassword(registerStore.password)
  validFn.checkConfirmPassword(registerStore.confirmPassword)
  return !Object.values(validMessage).some((value) => Boolean(value))
}

const btnRefresh = (event: IInputEvent, isLoading: boolean, message: string) => {
  inputDisabled.value = isLoading
  btnLoginMessage.value = isLoading ? '' : message
  event.target.innerHTML = isLoading
    ? '<i class="fas fa-spinner fa-spin"></i> Đang xử lý'
    : 'Đăng ký'
}

const handleRegister = (event: IInputEvent) => {
  btnRefresh(event, true, '')
  if (checkValiation()) {
    console.log('handle Register')
    addUser({
      username: registerStore.username,
      password: SHA256(registerStore.password).toString(),
      email: registerStore.email
    })
      .then(() => {
        btnRefresh(event, false, `Đăng ký thành công`)
      })
      .catch((er) => {
        btnRefresh(event, false, `Lỗi: ${er.message}`)
      })
  } else btnRefresh(event, false, '')
}
</script>
<template>
  <div class="row">
    <div class="col-6 d-none d-lg-block position-relative">
      <div
        class="bg-holder min-vh-100"
        style="background-image: url(../src/assets/img/generic/19.jpg)"
      ></div>
      <!--/.bg-holder-->
    </div>
    <div class="col-sm-10 col-md-6 px-sm-0 mx-auto py-5 mg-10vh">
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
                  <h3>Đăng ký</h3>
                </div>
                <div class="col-auto fs-10 text-600">
                  <span class="mb-0 fw-semi-bold">Đã có tài khoản?</span>
                  <span>
                    <!-- <a href="../../../pages/authentication/split/login.html">Login</a> -->
                    <RouterLink :to="{ name: 'login' }"> Đăng nhập</RouterLink>
                  </span>
                </div>
              </div>
              <form>
                <div class="mb-1">
                  <InputText
                    id="ipres-username"
                    :className="validState.usernameClass"
                    label="Tài khoản"
                    placeholder="nguyenvana"
                    message="Tài khoản không được để trống."
                    :value="toRaw(registerStore.username)"
                    :disabled="inputDisabled"
                    :events="{
                      blur: (event: IInputEvent) => validFn.checkUsername(event.target.value),
                      change: (event: IInputEvent) => (registerStore.username = event.target.value)
                    }"
                  />
                </div>
                <div class="mb-1">
                  <InputText
                    id="ipres-email"
                    :className="validState.emailClass"
                    label="Email"
                    placeholder="example@gmail.com"
                    :message="validMessage.email"
                    :value="toRaw(registerStore.email)"
                    :disabled="inputDisabled"
                    :events="{
                      blur: (event: IInputEvent) => validFn.checkEmail(event.target.value),
                      change: (event: IInputEvent) => (registerStore.email = event.target.value)
                    }"
                  />
                </div>
                <div class="row gx-2 mb-3">
                  <div class="col-sm-6">
                    <InputText
                      id="ipres-password"
                      label="Mật khẩu"
                      placeholder="abcABC@123"
                      :message="validMessage.password"
                      type="password"
                      :className="validState.passwordClass"
                      :value="toRaw(registerStore.password)"
                      :disabled="inputDisabled"
                      :events="{
                        blur: (event: IInputEvent) => validFn.checkPassword(event.target.value),
                        change: (event: IInputEvent) =>
                          (registerStore.password = event.target.value)
                      }"
                    />
                  </div>
                  <div class="col-sm-6">
                    <InputText
                      id="ipres-confirmpassword"
                      label="Nhập lại mật khẩu"
                      placeholder="abcABC@123"
                      :message="validMessage.confirmPassword"
                      type="password"
                      :className="validState.confirmPasswordClass"
                      :value="toRaw(registerStore.confirmPassword)"
                      :disabled="inputDisabled"
                      :events="{
                        blur: (event: IInputEvent) =>
                          validFn.checkConfirmPassword(event.target.value),
                        change: (event: IInputEvent) =>
                          (registerStore.confirmPassword = event.target.value)
                      }"
                    />
                  </div>
                </div>
                <div class="form-label">
                  Bằng việc tiếp tục đăng ký, bạn đồng ý với <a href="#!">điều khoản </a>và
                  <a class="white-space-nowrap" href="#!">chính sách</a> của chúng tôi.
                </div>
                <div class="mb-3">
                  <ButtonView
                    className="btn btn-primary d-block w-100 mt-3"
                    html="Đăng ký"
                    :message="btnLoginMessage"
                    :disabled="inputDisabled"
                    :events="{
                      click: handleRegister
                    }"
                  />
                </div>
              </form>
              <div class="position-relative mt-4">
                <hr />
                <div class="divider-content-center">hoặc đăng ký bằng</div>
              </div>
              <div class="row g-2 mt-2">
                <div class="col-sm-6">
                  <a
                    class="btn btn-outline-google-plus btn-sm d-block w-100"
                    :class="{ disabled: inputDisabled }"
                    href="#"
                    ><span class="fab fa-google-plus-g me-2" data-fa-transform="grow-8"></span>
                    google</a
                  >
                </div>
                <div class="col-sm-6">
                  <a
                    class="btn btn-outline-facebook btn-sm d-block w-100"
                    :class="{ disabled: inputDisabled }"
                    href="#"
                    ><span class="fab fa-facebook-square me-2" data-fa-transform="grow-8"></span>
                    facebook</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
