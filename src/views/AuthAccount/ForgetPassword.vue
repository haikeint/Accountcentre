<script lang="ts" setup>
import type { IInputEvent } from '@/interface/IInputEvent'
// import type { IUserLogin } from '@/interface/IUserLogin'

// import { FetchResult } from '@/wraper/FetchResult'

import InputText from '@/components/InputText.vue'
import ButtonView from '@/components/ButtonView.vue'

// import { Constants } from '@/constants'

import { ref, reactive, toRaw, onMounted, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
// import { useAuthStore } from '@/store/auth'

// const authStore = useAuthStore()
// const router = useRouter()
const className = {
    valid: 'form-control valid-txt',
    invalid: 'form-control invalid-txt',
    form: 'form-control'
}

const btnLoginMessage = ref<string>('')
const inputDisabled = ref<boolean>(false)

const forgetPWState = reactive({
    username: '',
    email: ''
})

const validState: Record<string, string> = reactive({
    usernameClass: className.form,
    emailClass: className.form
})

const validFn = {
    checkUsername: (event: IInputEvent) => {
        validState.usernameClass = event.target.value ? className.valid : className.invalid
    },
    checkEmail: (event: IInputEvent) => {
        validState.emailClass = event.target.value ? className.valid : className.invalid
    }
}

const checkValiation = () => {
    validState.usernameClass = !forgetPWState.username ? className.invalid : className.valid
    validState.emailClass = !forgetPWState.email ? className.invalid : className.valid

    return !Object.values(validState).some((value) => value == className.invalid)
}

const btnRefresh = (event: IInputEvent, isLoading: boolean, message: string) => {
    inputDisabled.value = isLoading
    btnLoginMessage.value = isLoading ? '' : message
    event.target.innerHTML = isLoading
        ? '<i class="fas fa-spinner fa-spin"></i> Đang xử lý'
        : 'Xử lý'
}

const refAlert = ref<IAlert>()
const handleLogin = (event: IInputEvent) => {
    refAlert.value?.show('danger', 'banh trành hết rồi chời đất ơi')
    // btnRefresh(event, true, '')
    // if (checkValiation()) {
    //     console.log('dang xử lý')
    // } else {
    //     btnRefresh(event, false, '')
    // }
}
//--Apolo client
import { useQuery, useLazyQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import type { IAlert } from '@/interface/IAlert'

// const { load, result, loading, error } = useLazyQuery(gql`
//   query GetUsers {
//     authors {
//       id
//       name
//     }
//   }
// `)
const { result, loading, error } = useQuery(
    gql`
        query GetUsers {
            authors {
                id
                name
            }
        }
    `,
    {
        fetchResults: true
    }
)

console.log(result.value)
</script>
<template>
    <div class="row">
        <div class="col-6 d-none d-lg-block position-relative">
            <div
                class="bg-holder min-vh-100"
                style="
                    background-image: url(/assets/img/generic/14.jpg);
                    background-position: 50% 20%;
                "
            ></div>
        </div>
        <div class="col-sm-10 col-md-6 px-sm-0 align-self-center mx-auto py-5 mg-15vh">
            <div class="row justify-content-center g-0">
                <div class="col-lg-9 col-xl-8 col-xxl-6">
                    <div class="card">
                        <div class="card-header bg-circle-shape bg-shape text-center p-2">
                            <div
                                class="font-sans-serif fw-bolder fs-5 z-1 position-relative link-light"
                            >
                                <!-- <img
                                    class="me-2"
                                    src="/assets/img/icons/spot-illustrations/falcon.png"
                                    alt=""
                                    width="40"
                                /><span class="font-sans-serif">S84</span> -->
                                <img
                                    class="me-2"
                                    src="/assets/logo/own/fulllogo_transparent_nobuffer.png"
                                    alt=""
                                    width="90"
                                />
                            </div>
                        </div>
                        <div class="card-body p-4">
                            <div class="row flex-between-center">
                                <div class="col-auto">
                                    <h3 class="txt-info">Quên mật khẩu</h3>
                                </div>
                                <div class="col-auto fs-10 text-600">
                                    <span class="mb-0 fw-semi-bold">Đã nhớ mật khẩu?</span>
                                    <span>
                                        <RouterLink :to="{ name: 'login' }"> Đăng nhập</RouterLink>
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
                                        :value="toRaw(forgetPWState.username)"
                                        :events="{
                                            blur: validFn.checkUsername,
                                            change: (event: IInputEvent) =>
                                                (forgetPWState.username = event.target.value)
                                        }"
                                    />
                                </div>
                                <div class="mb-3">
                                    <InputText
                                        id="ipforget-email"
                                        label="Email"
                                        placeholder="example@gmail.com"
                                        message="Email không được để trống."
                                        :className="validState.usernameClass"
                                        :disabled="inputDisabled"
                                        :value="toRaw(forgetPWState.email)"
                                        :events="{
                                            blur: validFn.checkEmail,
                                            change: (event: IInputEvent) =>
                                                (forgetPWState.email = event.target.value)
                                        }"
                                    />
                                </div>
                                <ButtonView
                                    id="btnSend"
                                    className="btn btn-info d-block w-100 mt-3 mb-1"
                                    html="Xử lý"
                                    type="button"
                                    :message="btnLoginMessage"
                                    :disabled="inputDisabled"
                                    :events="{
                                        click: handleLogin
                                    }"
                                ></ButtonView>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <ModalView @toggle="(event: Modal) => (MyModal = event)"></ModalView> -->
    <AlertView ref="refAlert"></AlertView>
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
