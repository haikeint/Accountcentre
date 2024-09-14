<script lang="ts" setup>
import type { IInputEvent } from '@/interface/IInputEvent'
import { reactive, ref, toRaw } from 'vue'
// import InputText from '../Util/InputText.vue'
import InputText from '@/components/InputText.vue'
// import LabelComp from '../Util/LabelComp.vue'
import type { IModal } from '../../interface/IModal'

import ModalInput from '../Modal/ModalInput.vue'

import { useMutation } from '@vue/apollo-composable'
import { SEND_OTP_TO_PHONE, VERIFY_OTP_TO_PHONE } from '@/graphql/account'
const { mutate: sendOtpToPhone } = useMutation(SEND_OTP_TO_PHONE)
const { mutate: verifyOtpToPhone } = useMutation(VERIFY_OTP_TO_PHONE)

const refModal = ref<IModal>()
const loading = ref<boolean>(false)
const ModalMessage = ref<string>('')

defineProps({
    isExisted: { type: Boolean, required: true }
})

const phoneNumber = reactive({
    old: '',
    new: '',
    otp: ''
})

const validMessage: Record<string, string> = reactive({
    oldPhone: '',
    newPhone: '',
    otp: ''
})

const validState = reactive({
    oldPhoneClass: 'form-control',
    newPhoneClass: 'form-control',
    otpClass: 'form-control'
})

const validFn = {
    checkOldPhone: (value: string) => {
        let result = value.length == 0 ? 'SĐT không được để trống.' : ''
        validMessage.oldPhone = result
        validState.oldPhoneClass = result ? 'form-control invalid-txt' : 'form-control valid-txt'
    },
    checkNewPhone: (value: string) => {
        let result = value.length == 0 ? 'SĐT không được để trống.' : ''
        validMessage.newPhone = result
        validState.newPhoneClass = result ? 'form-control invalid-txt' : 'form-control valid-txt'
    },
    checkOTP: (value: string) => {
        let result = value.length == 0 ? 'Mã OTP không được để trống.' : ''
        validMessage.otp = result
        validState.otpClass = result ? 'form-control invalid-txt' : 'form-control valid-txt'
    }
}

const emit = defineEmits(['alert'])

const checkInput = (event: IInputEvent) => {
    const element = event.target as HTMLInputElement
    element.value = element.value.replace(/[^0-9]/g, '').slice(0, 10)
    return element.value
}

const checkInputOTP = (event: IInputEvent) => {
    const element = event.target as HTMLInputElement
    element.value = element.value.replace(/[^0-9]/g, '').slice(0, 6)
    return element.value
}

const update = () => {
    // if (props.isExisted) validFn.checkOldPhone(phoneNumber.old)
    validFn.checkNewPhone(phoneNumber.new)

    if (!Object.values(validMessage).some((value) => Boolean(value))) {
        loading.value = true
        sendOtpToPhone({
            // oldPhone: phoneNumber.old,
            newPhone: phoneNumber.new
        })
            .then((res) => {
                loading.value = false
                refModal.value?.show()
                ModalMessage.value = res?.data.sendOtpToPhone
                // emit('alert', {
                //     type: 'success',
                //     message: res?.data.changePhone
                // })
            })
            .catch(({ graphQLErrors, networkError }) => {
                loading.value = false
                if (graphQLErrors && graphQLErrors.length != 0) {
                    const { message } = graphQLErrors[0]
                    emit('alert', {
                        type: 'danger',
                        message: message
                    })
                }
                if (networkError) {
                    emit('alert', {
                        type: 'danger',
                        message: networkError
                    })
                }
            })
        // refModal.value?.show()
    }
}

const confirmedModal = () => {
    validFn.checkOTP(phoneNumber.otp)
    if (!Object.values(validMessage).some((value) => Boolean(value))) {
        loading.value = true
        verifyOtpToPhone({
            newPhone: phoneNumber.new,
            otp: phoneNumber.otp
        })
            .then((res) => {
                loading.value = false
                refModal.value?.hide()
                emit('alert', {
                    type: 'success',
                    message: res?.data.verifyOtpToPhone
                })
            })
            .catch(({ graphQLErrors, networkError }) => {
                loading.value = false
                if (graphQLErrors && graphQLErrors.length != 0) {
                    const { message } = graphQLErrors[0]
                    validMessage.otp = message
                    validState.otpClass = 'form-control invalid-txt'

                    // emit('alert', {
                    //     type: 'danger',
                    //     message: message
                    // })
                }
                if (networkError) {
                    validMessage.otp = networkError
                    validState.otpClass = 'form-control invalid-txt'
                    // emit('alert', {
                    //     type: 'danger',
                    //     message: networkError
                    // })
                }
            })
    } else loading.value = false
}

const cancelModal = () => {
    loading.value = false
    validMessage.otp = ''
    validState.otpClass = 'form-control valid-txt'
}
</script>
<template>
    <div>
        <div class="row">
            <div
                class="col-md-1 col-sm-1 d-none d-sm-flex justify-content-center align-items-center"
            ></div>
            <div class="col-md-6 col-sm-9">
                <!-- <div class="mb-2" v-if="isExisted">
                    <InputText
                        id="ipres-old-phone"
                        :className="validState.oldPhoneClass"
                        label="SĐT hiện tại"
                        placeholder="0900111222"
                        :message="validMessage.oldPhone"
                        :value="toRaw(phoneNumber.old)"
                        :disabled="loading"
                        :events="{
                            blur: (event: IInputEvent) => validFn.checkOldPhone(event.target.value),
                            input: (event: IInputEvent) => (phoneNumber.old = checkInput(event))
                        }"
                    />
                </div> -->
                <div class="mb-3">
                    <InputText
                        id="ipres-new-phone"
                        :className="validState.newPhoneClass"
                        label="Số điện thoại mới"
                        placeholder="0900111222"
                        :message="validMessage.newPhone"
                        :value="toRaw(phoneNumber.new)"
                        :disabled="loading"
                        :events="{
                            blur: (event: IInputEvent) => validFn.checkOldPhone(event.target.value),
                            input: (event: IInputEvent) => (phoneNumber.new = checkInput(event))
                            // input: (event: IInputEvent) => (phoneNumber.new = checkInput(event))
                        }"
                    />
                </div>
                <button class="btn btn-danger rounded-pill" @click="update">
                    <template v-if="loading"
                        ><span class="fas fa-spinner fa-spin"></span> Đang xử lý</template
                    >
                    <template v-else>Cập nhật</template>
                </button>
            </div>
        </div>
        <!-- <ModalView ref="refModal" @confirmedModal="confirmedModal"></ModalView> -->
        <ModalInput ref="refModal" @confirmedModal="confirmedModal" @cancel="cancelModal">
            <div class="mb-2" style="padding: 0px 2rem 0px 2rem">
                <InputText
                    id="ipres-otp-phone"
                    :className="validState.otpClass"
                    label="Mã OTP"
                    placeholder="123123"
                    :message="validMessage.otp"
                    :value="toRaw(phoneNumber.otp)"
                    :disabled="loading"
                    :events="{
                        blur: (event: IInputEvent) => validFn.checkOTP(event.target.value),
                        input: (event: IInputEvent) => (phoneNumber.otp = checkInputOTP(event))
                    }"
                />
                <div
                    class="mt-2"
                    style="color: var(--falcon-form-valid-color); font-weight: bold; font-size: 75%"
                >
                    <span class="fas fa-check-circle"></span> {{ ModalMessage }}
                </div>
            </div>
        </ModalInput>
    </div>
</template>
<style scoped></style>
