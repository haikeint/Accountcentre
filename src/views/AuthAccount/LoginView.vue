<script lang="ts" setup>
import type { IInputEvent } from '@/interface/IInputEvent'
import type { IUserLogin } from '@/interface/IUserLogin'
import ReCaptchav2 from '@/components/ReCaptchav2.vue'
import { SHA256 } from 'crypto-js'
import { handleResponse, HttpStatusCode } from '@/Util/RequestError'

import InputText from '@/components/InputText.vue'
import ButtonView from '@/components/ButtonView.vue'

import { Constants } from '@/constants'

import { ref, reactive, toRaw, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useMutation } from '@vue/apollo-composable'
import { authencation } from '@/graphql/user'

const className = {
    valid: 'form-control valid-txt',
    invalid: 'form-control invalid-txt',
    form: 'form-control'
}

const { mutate: loginUser } = useMutation(authencation)

const btnLoginMessage = ref<string>('')
const inputDisabled = ref<boolean>(false)

const recVersion = ref<number>(3)
const recv2Token = ref<string>('')
const recv2Key = ref<number>(0)

const loginState: IUserLogin = reactive({
    username: '',
    password: '',
    isRemember: false
})

const validState: Record<string, string> = reactive({
    usernameClass: className.form,
    passwordClass: className.form
})
const validMessage: Record<string, string> = reactive({
    username: ''
})

onMounted(() => {
    const remember = localStorage.getItem(Constants.LS_REMEMBER)
    if (remember) {
        loginState.username = JSON.parse(remember)
        loginState.isRemember = true
    }
    initRecv3()
})

const validFn = {
    blurUsername: (value: string) => {
        // validState.usernameClass = event.target.value ? className.valid : className.invalid
        let validReslut: boolean = true
        let message: string[] = []
        if (!value) {
            validReslut = false
            message.push('Tên tài khoản không được để trống')
        }

        if (validReslut && value) {
            if (!(value.length >= 6 && value.length <= 16)) {
                validReslut = false
                message.push('Độ dài từ 6 - 16 kí tự')
            }

            if (/[A-Z]/.test(value)) {
                validReslut = false
                message.push('Không được có chữ in Hoa')
            }

            if (/[^A-Za-z0-9]/.test(value)) {
                validReslut = false
                message.push('Không được có kí tự đặc biệt')
            }
        }
        validMessage.username = validReslut ? '' : message.join('<br>')
        validState.usernameClass = validReslut
            ? 'form-control valid-txt'
            : 'form-control invalid-txt'
    },
    blurPassword: (event: IInputEvent) => {
        validState.passwordClass = event.target.value ? className.valid : className.invalid
    }
}

const checkValiation = () => {
    // validState.usernameClass = !loginState.username ? className.invalid : className.valid
    validFn.blurUsername(loginState.username)
    validState.passwordClass = !loginState.password ? className.invalid : className.valid
    return !Object.values(validState).some((value) => value == className.invalid)
}

const btnRefresh = (event: IInputEvent, isLoading: boolean, message: string) => {
    inputDisabled.value = isLoading
    btnLoginMessage.value = isLoading ? '' : message
    event.target.innerHTML = isLoading
        ? '<i class="fas fa-spinner fa-spin"></i> Đang xử lý'
        : 'Đăng nhập'
}

const renderRecaptcha = () => {
    return new Promise((res) => {
        window.grecaptcha
            .execute(import.meta.env.VITE_RECAPTCHAV3_KEY, {
                action: 'submit'
            })
            .then(function (token: string) {
                res(token)
            })
    })
}

const initRecv3 = () => {
    return new Promise((res) => {
        if (!window.recaptchav3) {
            const script = document.createElement('script')
            script.src = `https://www.google.com/recaptcha/api.js?render=${import.meta.env.VITE_RECAPTCHAV3_KEY}`
            script.async = true
            script.defer = true

            document.head.appendChild(script)
            script.onload = () => {
                window.grecaptcha.ready(async () => {
                    window.recaptchav3 = true
                    res(true)
                })
            }
        } else {
            res(true)
        }
    })
}

const getRecv3Token = () => {
    return new Promise((res) => {
        initRecv3().then(() => {
            res(renderRecaptcha())
        })
    })
}
const handleLogin = async (event: IInputEvent) => {
    btnRefresh(event, true, '')
    if (!checkValiation()) {
        btnRefresh(event, false, '')
        return
    }
    if (recVersion.value == 2 && recv2Token.value == '') {
        btnRefresh(event, false, 'Tick Recaptcha trước khi đăng nhập!')
        return
    }
    loginUser({
        username: loginState.username,
        password: loginState.password,
        rectoken: recVersion.value == 3 ? await getRecv3Token() : recv2Token.value,
        recver: recVersion.value
    })
        .then((result) => {
            if (result?.data?.login) {
                localStorage.setItem(Constants.LS_IS_LOGIN, String(result?.data?.login))
                // router.push({ name: 'home' })
                window.location.href = `${window.location.protocol}//${window.location.host}`
            } else {
                btnRefresh(event, false, 'Something went wrong')
            }
        })
        .catch(({ graphQLErrors, networkError }) => {
            if (graphQLErrors) {
                graphQLErrors.forEach(({ message, extensions }: any) => {
                    if (message == 'Unvalid token') {
                        recv2Key.value += 1
                        recVersion.value = 2
                        btnRefresh(
                            event,
                            false,
                            `Hành vi nghi ngờ robot, vui lòng tick vào recaptcha và đăng nhập lại.`
                        )
                    } else {
                        recv2Key.value += 1
                        btnRefresh(event, false, handleResponse(extensions.statusCode) ?? message)
                    }
                })
            }
            if (networkError) {
                console.error(`[Network error]: ${networkError}`)
                btnRefresh(event, false, `Lỗi: ${networkError}`)
            }
        })
}

const HandlePressEnter = () => {
    document.getElementById('btnLogin')?.click()
}
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
                                    <h3 class="txt-info">Đăng nhập</h3>
                                </div>
                                <div class="col-auto fs-10 text-600">
                                    <span class="mb-0 fw-semi-bold">Người dùng mới?</span>
                                    <span>
                                        <RouterLink :to="{ name: 'register' }">
                                            Tạo tài khoản</RouterLink
                                        >
                                    </span>
                                </div>
                            </div>
                            <form @keydown.enter="HandlePressEnter">
                                <div class="mb-3">
                                    <InputText
                                        id="ipUsername"
                                        label="Tài khoản"
                                        placeholder="nguyenvana"
                                        :message="validMessage.username"
                                        :className="validState.usernameClass"
                                        :disabled="inputDisabled"
                                        :value="toRaw(loginState.username)"
                                        :events="{
                                            blur: (event: IInputEvent) =>
                                                validFn.blurUsername(event.target.value),
                                            input: (event: IInputEvent) =>
                                                (loginState.username = event.target.value)
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
                                        :value="toRaw(loginState.password)"
                                        :events="{
                                            blur: validFn.blurPassword,
                                            input: (event: IInputEvent) =>
                                                (loginState.password = event.target.value)
                                        }"
                                    />
                                </div>
                                <ReCaptchav2
                                    v-if="recVersion == 2"
                                    @onVerify="(event: string) => (recv2Token = event)"
                                    @onError="() => (recv2Token = '')"
                                    @onExpire="() => (recv2Token = '')"
                                    :key="recv2Key"
                                />
                                <div class="row flex-between-center mt-2">
                                    <div class="col-auto">
                                        <div class="form-check mb-0">
                                            <InputText
                                                id="cb-remember"
                                                checkboxLabel="Lưu đăng nhập"
                                                className="form-check-input"
                                                type="checkbox"
                                                :disabled="inputDisabled"
                                                :value="toRaw(loginState.isRemember)"
                                                :events="{
                                                    input: (event: IInputEvent) =>
                                                        (loginState.isRemember = Boolean(
                                                            event.target.value
                                                        ))
                                                }"
                                            />
                                        </div>
                                    </div>
                                    <div class="col-auto">
                                        <RouterLink :to="{ name: 'forgetpassword' }" class="fs-10"
                                            >Quên mật khẩu?</RouterLink
                                        >
                                    </div>
                                </div>
                                <ButtonView
                                    id="btnLogin"
                                    className="btn btn-info d-block w-100 mt-3 mb-1"
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
                                <div class="divider-content-center"></div>
                            </div>
                            <!-- <div class="row g-2 mt-2">
                                <div class="col-sm-6">
                                    <a
                                        class="btn btn-outline-google-plus btn-sm d-block w-100"
                                        :class="{ disabled: inputDisabled }"
                                        href="#tinh_nang_dang_phat_trien"
                                    >
                                        <span
                                            class="fab fa-google-plus-g me-2"
                                            data-fa-transform="grow-8"
                                        ></span>
                                        google
                                    </a>
                                </div>
                                <div class="col-sm-6">
                                    <a
                                        class="btn btn-outline-facebook btn-sm d-block w-100"
                                        :class="{ disabled: inputDisabled }"
                                        href="#tinh_nang_dang_phat_trien"
                                    >
                                        <span
                                            class="fab fa-facebook-square me-2"
                                            data-fa-transform="grow-8"
                                        ></span>
                                        facebook
                                    </a>
                                </div>
                            </div> -->
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
