<script lang="ts" setup>
import type { IAlert } from '@/interface/IAlert'

import StepNavItem from '@/components/StepNavItem.vue'
import RadioCmp from '@/components/Form/RadioCmp.vue'
import InputText from '@/components/InputText.vue'
import ReCaptchav2 from '@/components/ReCaptchav2.vue'
import CountDown from '@/components/CountDown.vue'

import { ref, reactive, toRaw } from 'vue'
import { RouterLink } from 'vue-router'

import axios from 'axios'
import type { IInputEvent } from '@/interface/IInputEvent'

import { URL_FR_USERNAME, URL_FR_SEND_CODE, URL_FR_VERIRY_CODE } from '@/api/url'
import { formatString } from '@/Util/util'

const refAlert = ref<IAlert>()
const recaptchaToken = ref<string>()
const recaptchaComponentKey = ref<number>(0)
const invalidMessage = ref<string>('')
const validMessage = ref<string>('')

const disabled = ref<boolean>(false)
const displayCoutdown = ref<boolean>(false)

const account = reactive({
    username: '',
    email: '',
    code: '',
    password: '',
    confirmPassword: '',
    recaptchaToken: '',
    token: ''
})

const inputValidMessage: Record<string, string> = reactive({
    code: '',
    username: '',
    password: '',
    confirmPassword: ''
})

const validState = reactive({
    codeClass: 'form-control',
    usernameClass: 'form-control',
    passwordClass: 'form-control',
    confirmPasswordClass: 'form-control'
})

const validFn = {
    checkCode: (value: string) => {
        let validReslut: boolean = true
        let message: string[] = []
        if (!value) {
            validReslut = false
            message.push('Không được để trống')
        }

        inputValidMessage.code = validReslut ? '' : message.join('<br>')
        validState.codeClass = validReslut ? 'form-control valid-txt' : 'form-control invalid-txt'
    },
    checkUsername: (value: string) => {
        let validReslut: boolean = true
        let message: string[] = []
        if (!value) {
            validReslut = false
            message.push('Không được để trống')
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
        inputValidMessage.username = validReslut ? '' : message.join('<br>')
        validState.usernameClass = validReslut
            ? 'form-control valid-txt'
            : 'form-control invalid-txt'
    },
    checkPassword: (value: string) => {
        let validReslut: boolean = true
        let message: string[] = []
        if (!value) {
            validReslut = false
            message.push('Không được để trống.')
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
        inputValidMessage.password = validReslut ? '' : message.join('<br>')
        validState.passwordClass = validReslut
            ? 'form-control valid-txt'
            : 'form-control invalid-txt'
    },
    checkConfirmPassword: (value: string) => {
        let message = ''
        if (!value) message = 'Hãy nhập lại mật khẩu.'
        if (!message && value && value != account.password)
            message = 'Mật khẩu vừa nhập không khớp.'

        inputValidMessage.confirmPassword = message ? message : ''
        validState.confirmPasswordClass = message
            ? 'form-control invalid-txt'
            : 'form-control valid-txt'
    }
}
const checkValiationSetep3 = () => {
    validFn.checkCode(account.code)
    validFn.checkPassword(account.password)
    validFn.checkConfirmPassword(account.confirmPassword)
    return !Object.values(inputValidMessage).some((value) => Boolean(value))
}

const checkValiationSetep1 = () => {
    validFn.checkUsername(account.username)
    return !Object.values(inputValidMessage).some((value) => Boolean(value))
}
const setepCurrent = ref<number>(1)

const hdlMessage = (validMes: string, invalid: string) => {
    validMessage.value = validMes
    invalidMessage.value = invalid
}
const hdlSetep1 = async () => {
    if (!checkValiationSetep1()) return false

    if (!recaptchaToken.value) {
        hdlMessage('', 'Tick Recaptcha trước khi qua bước tiếp theo!')
        return false
    }
    disabled.value = true
    try {
        const response = await axios.get(formatString(URL_FR_USERNAME, account.username), {
            params: {
                token: recaptchaToken.value
            }
        })
        disabled.value = false
        if (response.status != 200 && response.data.error) {
            hdlMessage('', response.data.error)
            return false
        }

        account.email = response.data.email
        account.token = response.data.token

        return true
    } catch (error: any) {
        disabled.value = false
        recaptchaComponentKey.value++
        recaptchaToken.value = ''
        if (typeof error.response.data.error == 'string') {
            hdlMessage('', error.response.data.error)
        }
        return false
    }
}

const sendCode = async () => {
    if (displayCoutdown.value) return false
    hdlMessage('', '')
    try {
        disabled.value = true
        const response = await axios.get(formatString(URL_FR_SEND_CODE), {
            params: {
                token: account.token
            }
        })
        disabled.value = false
        if (response.status != 200 && response.data.error) {
            hdlMessage('', response.data.error)
            return false
        }
        account.token = response.data.token
        displayCoutdown.value = true
        return true
    } catch (error) {
        disabled.value = false
        return false
    }
}

const hdlSetep2 = async () => {
    if (account.email) {
        return true
    }
}

const hdlSetep3 = async () => {
    try {
        if (!checkValiationSetep3()) return false
        disabled.value = true
        const response = await axios.get(formatString(URL_FR_VERIRY_CODE, account.code), {
            params: {
                token: account.token,
                password: account.password
            }
        })
        account.token = ''
        return response.status == 200
    } catch (error: any) {
        if (typeof error.response.data.error == 'string') {
            hdlMessage('', error.response.data.error)
        }
        disabled.value = false
        return false
    }
}

const btnNext = async () => {
    hdlMessage('', '')
    if (setepCurrent.value == 1 && (await hdlSetep1())) {
        setepCurrent.value++
        return
    }
    if (setepCurrent.value == 2 && (await hdlSetep2())) {
        setepCurrent.value++
        return
    }
    if (setepCurrent.value == 3 && (await hdlSetep3())) {
        setepCurrent.value++
        return
    }
    if (setepCurrent.value == 4) {
        invalidMessage.value = ''
        validMessage.value = ''
        return
    }
}

const btnPrevious = () => {
    setepCurrent.value--
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
                                <img
                                    class="me-2"
                                    src="/assets/logo/create/hbplay.png"
                                    width="220"
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
                            <div class="theme-wizard">
                                <div class="card-header bg-body-tertiary pt-3 pb-2">
                                    <ul class="nav justify-content-between nav-wizard">
                                        <StepNavItem
                                            icon="fas fa-lock"
                                            title="Tài khoản"
                                            :className="
                                                setepCurrent == 1
                                                    ? 'active'
                                                    : setepCurrent > 1
                                                      ? 'done'
                                                      : ''
                                            "
                                            >Tài khoản</StepNavItem
                                        >
                                        <StepNavItem
                                            icon="fas fa-wrench"
                                            title="Tài khoản"
                                            :className="
                                                setepCurrent == 2
                                                    ? 'active'
                                                    : setepCurrent > 2
                                                      ? 'done'
                                                      : ''
                                            "
                                            >Phương thức</StepNavItem
                                        >
                                        <StepNavItem
                                            icon="fas fa-check-circle"
                                            title="Tài khoản"
                                            :className="
                                                setepCurrent == 3
                                                    ? 'active'
                                                    : setepCurrent > 3
                                                      ? 'done'
                                                      : ''
                                            "
                                            >Xác thực</StepNavItem
                                        >
                                        <StepNavItem
                                            icon="fas fa-thumbs-up"
                                            title="Tài khoản"
                                            :className="setepCurrent == 4 ? 'done' : ''"
                                            >Hoàn tất</StepNavItem
                                        >
                                    </ul>
                                </div>
                                <div class="card-body">
                                    <div class="tab-content">
                                        <div class="tab-pane active">
                                            <div v-if="setepCurrent == 1" class="row">
                                                <div class="col-12">
                                                    <InputText
                                                        id="ipres-username"
                                                        :className="validState.usernameClass"
                                                        label="Tài khoản"
                                                        placeholder="nguyenvana"
                                                        :message="inputValidMessage.username"
                                                        :value="toRaw(account.username)"
                                                        :disabled="disabled"
                                                        :events="{
                                                            blur: (event: IInputEvent) =>
                                                                validFn.checkUsername(
                                                                    event.target.value
                                                                ),
                                                            change: (event: IInputEvent) =>
                                                                (account.username =
                                                                    event.target.value)
                                                        }"
                                                    />
                                                </div>
                                            </div>
                                            <div v-if="setepCurrent == 1" class="row mt-3">
                                                <ReCaptchav2
                                                    @onVerify="
                                                        (event: string) => (recaptchaToken = event)
                                                    "
                                                    @onError="() => (recaptchaToken = '')"
                                                    @onExpire="() => (recaptchaToken = '')"
                                                    :key="recaptchaComponentKey"
                                                />
                                            </div>

                                            <RadioCmp
                                                v-if="setepCurrent == 2"
                                                id="rd-forgetpassword"
                                                name="rd-forgetpassword"
                                                :checked="true"
                                                :value="account.email"
                                                :disabled="disabled"
                                            />
                                            >
                                            <div v-if="setepCurrent == 3" class="row gx-2 mb-1">
                                                <div class="col-6">
                                                    <InputText
                                                        id="ipres-code"
                                                        :className="validState.codeClass"
                                                        label="Mã OTP"
                                                        placeholder="123123"
                                                        :message="inputValidMessage.code"
                                                        :value="toRaw(account.code)"
                                                        :disabled="disabled"
                                                        :events="{
                                                            blur: (event: IInputEvent) =>
                                                                validFn.checkCode(
                                                                    event.target.value
                                                                ),
                                                            change: (event: IInputEvent) =>
                                                                (account.code = event.target.value)
                                                        }"
                                                    />
                                                </div>
                                                <div class="col-6">
                                                    <label class="form-label">&nbsp;</label>
                                                    <div @click="sendCode">
                                                        <CountDown
                                                            v-if="displayCoutdown"
                                                            v-model:value="displayCoutdown"
                                                            :lefttime="60"
                                                        ></CountDown>
                                                        <a
                                                            class="btn btn-info"
                                                            v-if="!displayCoutdown && !disabled"
                                                        >
                                                            Nhận mã
                                                        </a>
                                                        <a class="btn btn-info" v-if="disabled">
                                                            <span
                                                                class="fas fa-spinner fa-spin"
                                                            ></span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-if="setepCurrent == 3" class="row gx-2">
                                                <div class="col-sm-6">
                                                    <InputText
                                                        id="ipres-password"
                                                        label="Mật khẩu"
                                                        placeholder="abcABC@123"
                                                        :message="inputValidMessage.password"
                                                        type="password"
                                                        :className="validState.passwordClass"
                                                        :value="toRaw(account.password)"
                                                        :disabled="disabled"
                                                        :events="{
                                                            blur: (event: IInputEvent) =>
                                                                validFn.checkPassword(
                                                                    event.target.value
                                                                ),
                                                            change: (event: IInputEvent) =>
                                                                (account.password =
                                                                    event.target.value)
                                                        }"
                                                    />
                                                </div>
                                                <div class="col-sm-6">
                                                    <InputText
                                                        id="ipres-confirmpassword"
                                                        label="Nhập lại mật khẩu"
                                                        placeholder="abcABC@123"
                                                        :message="inputValidMessage.confirmPassword"
                                                        type="password"
                                                        :className="validState.confirmPasswordClass"
                                                        :value="toRaw(account.confirmPassword)"
                                                        :disabled="disabled"
                                                        :events="{
                                                            blur: (event: IInputEvent) =>
                                                                validFn.checkConfirmPassword(
                                                                    event.target.value
                                                                ),
                                                            change: (event: IInputEvent) =>
                                                                (account.confirmPassword =
                                                                    event.target.value)
                                                        }"
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                v-if="setepCurrent == 4"
                                                class="mb-0 fw-semi-bold text-center"
                                            >
                                                Đã khôi phục mật khẩu thành công
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Transition>
                                    <div
                                        v-if="invalidMessage?.length > 0"
                                        class="card-footer bg-body-tertiary text-center mb-3"
                                    >
                                        <div class="invalid-feedback text-center">
                                            {{ invalidMessage }}
                                        </div>
                                    </div>
                                </Transition>
                                <Transition>
                                    <div
                                        v-if="validMessage?.length > 0"
                                        class="card-footer bg-body-tertiary text-center mb-3"
                                    >
                                        <div class="valid-feedback text-center">
                                            {{ validMessage }}
                                        </div>
                                    </div>
                                </Transition>

                                <div class="card-footer bg-body-tertiary">
                                    <ul class="pager wizard list-inline mb-0">
                                        <li class="previous">
                                            <button
                                                v-if="setepCurrent != 1 && setepCurrent != 4"
                                                @click="btnPrevious"
                                                class="btn btn-link ps-0"
                                                type="button"
                                                :disabled="disabled"
                                            >
                                                <svg
                                                    class="svg-inline--fa fa-chevron-left fa-w-10 me-2"
                                                    data-fa-transform="shrink-3"
                                                    aria-hidden="true"
                                                    focusable="false"
                                                    data-prefix="fas"
                                                    data-icon="chevron-left"
                                                    role="img"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 320 512"
                                                    data-fa-i2svg=""
                                                    style="transform-origin: 0.3125em 0.5em"
                                                >
                                                    <g transform="translate(160 256)">
                                                        <g
                                                            transform="translate(0, 0)  scale(0.8125, 0.8125)  rotate(0 0 0)"
                                                        >
                                                            <path
                                                                fill="currentColor"
                                                                d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"
                                                                transform="translate(-160 -256)"
                                                            ></path>
                                                        </g>
                                                    </g>
                                                </svg>
                                                Lùi lại
                                            </button>
                                        </li>
                                        <li class="next">
                                            <button
                                                v-if="setepCurrent != 4"
                                                @click="btnNext"
                                                class="btn btn-info px-5 px-sm-6"
                                                type="button"
                                                :disabled="disabled"
                                            >
                                                <template v-if="disabled"
                                                    ><span class="fas fa-spinner fa-spin"></span>
                                                    Đang xử lý</template
                                                >
                                                <template v-else>
                                                    Kế tiếp
                                                    <svg
                                                        class="svg-inline--fa fa-chevron-right fa-w-10 ms-2"
                                                        data-fa-transform="shrink-3"
                                                        aria-hidden="true"
                                                        focusable="false"
                                                        data-prefix="fas"
                                                        data-icon="chevron-right"
                                                        role="img"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 320 512"
                                                        data-fa-i2svg=""
                                                        style="transform-origin: 0.3125em 0.5em"
                                                    >
                                                        <g transform="translate(160 256)">
                                                            <g
                                                                transform="translate(0, 0)  scale(0.8125, 0.8125)  rotate(0 0 0)"
                                                            >
                                                                <path
                                                                    fill="currentColor"
                                                                    d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                                                                    transform="translate(-160 -256)"
                                                                ></path>
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </template>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <!--  -->
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
.bg-body-tertiary {
    --falcon-bg-opacity: 0;
}

.btn-link {
    color: #17a2b8;
}

.card-header {
    padding: unset;
}

.card-body {
    padding: 0.5rem;
}
.card-footer {
    padding: unset;
}
</style>
