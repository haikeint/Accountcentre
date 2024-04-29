<script lang="ts" setup>
import { useRegisterStore } from '@/store/registerForm'
import { onMounted, reactive } from 'vue'
import InitValidation from '@/ts/validattion'

const validState = reactive({
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
  isAcceptTerms: ''
})

const registerStore = useRegisterStore()

// const onChangeCB = () => {
//   validState.isAcceptTerms = !registerStore.isAcceptTerms ? 'invalid-cb' : 'valid-cb'
// }

const invalidFeedback = (className: string) => {
  return className.indexOf('invalid') > -1 ? 'visibility:visible' : 'visibility:hidden'
  // return className.indexOf('invalid') > -1 ? 'display:block' : 'display:none'
}

const checkValiation = () => {
  validState.userName = !registerStore.userName ? 'invalid-txt' : 'valid-txt'
  validState.email = !registerStore.email ? 'invalid-txt' : 'valid-txt'
  validState.password = !registerStore.password ? 'invalid-txt' : 'valid-txt'

  validState.confirmPassword =
    !registerStore.password || registerStore.password != registerStore.confirmPassword
      ? 'invalid-txt'
      : 'valid-txt'

  return !Object.values(validState).some((value) => value == 'invalid-txt')
}

const onRegister = () => {
  if (checkValiation()) {
    console.log('handle Register')
  }
}

onMounted(() => InitValidation())
</script>

<template>
  <form @submit.prevent="onRegister">
    <div>
      <label class="form-label" for="split-name">Tài khoản</label>
      <input
        class="form-control"
        :class="validState.userName"
        type="text"
        autocomplete="on"
        id="split-name"
        v-model="registerStore.userName"
        placeholder="nguyenvana"
      />

      <div class="invalid-feedback" :style="invalidFeedback(validState.userName)">
        Tài khoản không được để trống.
      </div>
    </div>
    <div>
      <label class="form-label" for="split-email">Email</label>
      <input
        class="form-control"
        :class="validState.email"
        type="text"
        autocomplete="on"
        id="split-email"
        v-model="registerStore.email"
        placeholder="example@gmail.com"
      />
      <div class="invalid-feedback" :style="invalidFeedback(validState.email)">
        Email không được để trống.
      </div>
    </div>
    <div class="row gx-2">
      <div class="col-sm-6">
        <label class="form-label" for="split-password">Mật khẩu</label>
        <input
          class="form-control"
          :class="validState.password"
          type="password"
          autocomplete="on"
          id="split-password"
          v-model="registerStore.password"
          placeholder="abcABC@123"
        />
        <div class="invalid-feedback" :style="invalidFeedback(validState.password)">
          Mật khẩu phải có ít nhất 6 kí tự.
        </div>
      </div>
      <div class="col-sm-6">
        <label class="form-label" for="split-confirm-password">Nhập lại mật khẩu</label>
        <input
          class="form-control"
          :class="validState.confirmPassword"
          type="password"
          autocomplete="on"
          id="split-confirm-password"
          v-model="registerStore.confirmPassword"
          placeholder="abcABC@123"
        />
        <div class="invalid-feedback" :style="invalidFeedback(validState.confirmPassword)">
          {{
            registerStore.password
              ? 'Nhập lại mật khẩu không khớp.'
              : 'Mật khẩu không được để trống.'
          }}
        </div>
      </div>
    </div>
    <div class="form-label">
      Bằng việc tiếp tục đăng ký, bạn đồng ý với <a href="#!">điều khoản </a>và
      <a class="white-space-nowrap" href="#!">chính sách</a> của chúng tôi.
    </div>
    <!-- <div class="form-check">
      <input
        class="form-check-input"
        :class="validState.isAcceptTerms"
        type="checkbox"
        id="cover-register-checkbox"
        @change="onChangeCB"
        v-model="registerStore.isAcceptTerms"
      />
      <label class="form-label" for="cover-register-checkbox"
        >Tôi chấp nhận <a href="#!">điều khoản </a>và
        <a class="white-space-nowrap" href="#!">chính sách.</a></label
      >
      <div class="invalid-feedback mt-0" :style="invalidFeedback(validState.isAcceptTerms)">
        You must agree before submitting.
      </div>
    </div> -->
    <div class="mb-3">
      <button class="btn btn-primary d-block w-100 mt-3" type="submit" name="submit">
        Register
      </button>
    </div>
  </form>
</template>
<style scoped>
/* .valid-txt {
  border-color: var(--falcon-form-valid-border-color);
  padding-right: calc(1.5em + 0.625rem);
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'><path fill='%2300d27a' d='M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/></svg>");
  background-repeat: no-repeat;
  background-position: right calc(0.375em + 0.15625rem) center;
  background-size: calc(0.75em + 0.3125rem) calc(0.75em + 0.3125rem);
}
.valid-txt:focus {
  border-color: var(--falcon-form-valid-border-color);
  -webkit-box-shadow:
    var(--falcon-box-shadow-inset),
    0 0 0 0.25rem rgba(var(--falcon-success-rgb), 0.25);
  box-shadow:
    var(--falcon-box-shadow-inset),
    0 0 0 0.25rem rgba(var(--falcon-success-rgb), 0.25);
}

.invalid-txt {
  border-color: var(--falcon-form-invalid-border-color);
  padding-right: calc(1.5em + 0.625rem);
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23e63757'><circle cx='6' cy='6' r='4.5'/><path stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/><circle cx='6' cy='8.2' r='.6' fill='%23e63757' stroke='none'/></svg>");
  background-repeat: no-repeat;
  background-position: right calc(0.375em + 0.15625rem) center;
  background-size: calc(0.75em + 0.3125rem) calc(0.75em + 0.3125rem);
}

.invalid-txt:focus {
  border-color: var(--falcon-form-invalid-border-color);
  -webkit-box-shadow:
    var(--falcon-box-shadow-inset),
    0 0 0 0.25rem rgba(var(--falcon-danger-rgb), 0.25);
  box-shadow:
    var(--falcon-box-shadow-inset),
    0 0 0 0.25rem rgba(var(--falcon-danger-rgb), 0.25);
} */

/* .valid-cb {
  color: var(--falcon-form-valid-color);
  border-color: var(--falcon-form-valid-border-color);
  background-color: var(--falcon-form-valid-color);
}
.valid-cb:focus {
  border-color: var(--falcon-form-valid-border-color);
  -webkit-box-shadow:
    var(--falcon-box-shadow-inset),
    0 0 0 0.25rem rgba(var(--falcon-success-rgb), 0.25);
  box-shadow:
    var(--falcon-box-shadow-inset),
    0 0 0 0.25rem rgba(var(--falcon-success-rgb), 0.25);
}

.valid-cb + label {
  color: var(--falcon-form-valid-color);
}

.valid-cb + label a {
  color: var(--falcon-form-valid-color);
}

.invalid-cb {
  border-color: var(--falcon-form-invalid-border-color);
}

.invalid-cb:focus {
  border-color: var(--falcon-form-invalid-border-color);
  -webkit-box-shadow:
    var(--falcon-box-shadow-inset),
    0 0 0 0.25rem rgba(var(--falcon-danger-rgb), 0.25);
  box-shadow:
    var(--falcon-box-shadow-inset),
    0 0 0 0.25rem rgba(var(--falcon-danger-rgb), 0.25);
}

.invalid-cb + label {
  color: var(--falcon-form-invalid-color);
}

.invalid-cb + label a {
  color: var(--falcon-form-invalid-color);
}

.invalid-feedback {
  font-weight: bold;
  display: unset;
}

.form-label {
  margin-bottom: 0rem;
} 

*/
/* .invalid-feedback {
  font-weight: bold;
  display: unset;
}

.form-label {
  margin-bottom: 0rem;
} */
</style>
