<script lang="ts" setup>
import { reactive, ref, toRaw } from 'vue'
import InputText from '@/components/InputText.vue'
import type { IModal } from '../../interface/IModal'
import type { IInputEvent } from '@/interface/IInputEvent'

import { useMutation } from '@vue/apollo-composable'
import { MUTATION_CHANGE_PASSWORD } from '@/graphql/account'
const { mutate: changePassword } = useMutation(MUTATION_CHANGE_PASSWORD)

const placeholder = 'abcABC@123'
const refModal = ref<IModal>()

const loading = ref<boolean>(false)

const password = reactive({
    old: '',
    new: '',
    repeat: ''
})

const validState = reactive({
    oldPasswordClass: 'form-control',
    newPasswordClass: 'form-control',
    repeatPasswordClass: 'form-control'
})

const validMessage: Record<string, string> = reactive({
    oldPassword: '',
    newPassword: '',
    repeatPassword: ''
})

const validPassword = (value: string) => {
    let validReslut: boolean = true
    let message: string[] = []
    if (!value) {
        validReslut = false
        message.push('Mật khẩu không được để trống.')
    }

    if (validReslut && value) {
        if (placeholder == value) {
            validReslut = false
            message.push('Mật khẩu không được giống với gợi ý')
        }
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
    return validReslut ? '' : message.join('<br>')
}

const validFn = {
    checkOldPassword: (value: string) => {
        let message: string = validPassword(value)

        validMessage.oldPassword = message
        validState.oldPasswordClass = !message
            ? 'form-control valid-txt'
            : 'form-control invalid-txt'
    },
    checkNewPassword: (value: string) => {
        let message: string = validPassword(value)
        if (!message && password.new == password.old) {
            message = 'Mật khẩu mới không được giống với mật khẩu hiện tại.'
        }
        validMessage.newPassword = message
        validState.newPasswordClass = !message
            ? 'form-control valid-txt'
            : 'form-control invalid-txt'
    },
    checkRepeatPassword: (value: string) => {
        let message: string = validPassword(value)
        if (!message && password.new != password.repeat) {
            message = 'Mật khẩu vừa nhập không khớp.'
        }
        validMessage.repeatPassword = message
        validState.repeatPasswordClass = !message
            ? 'form-control valid-txt'
            : 'form-control invalid-txt'
    }
}
const emit = defineEmits(['alert'])

const update = () => {
    validFn.checkOldPassword(password.old)
    validFn.checkNewPassword(password.new)
    validFn.checkRepeatPassword(password.repeat)
    if (!Object.values(validMessage).some((value) => Boolean(value))) {
        refModal.value?.show()
    }
}

const confirmedModal = () => {
    loading.value = true
    changePassword({
        oldPassword: password.old,
        newPassword: password.new
    })
        .then((res) => {
            loading.value = false
            emit('alert', {
                type: 'success',
                message: res?.data.changePassword
            })
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

    refModal.value?.hide()
}
</script>
<template>
    <div>
        <div class="row">
            <div
                class="col-md-1 col-sm-1 d-none d-sm-flex justify-content-center align-items-center"
            ></div>
            <div class="col-md-6 col-sm-9">
                <div class="mb-3">
                    <InputText
                        id="ipres-oldpassword"
                        type="password"
                        :className="validState.oldPasswordClass"
                        label="Mật khẩu hiện tại"
                        :placeholder="placeholder"
                        :message="validMessage.oldPassword"
                        :value="toRaw(password.old)"
                        :disabled="loading"
                        :events="{
                            blur: (event: IInputEvent) =>
                                validFn.checkOldPassword(event.target.value),
                            change: (event: IInputEvent) => (password.old = event.target.value)
                        }"
                    />
                </div>

                <div class="mb-3">
                    <InputText
                        id="ipres-newpassword"
                        type="password"
                        :className="validState.newPasswordClass"
                        label="Mật khẩu mới"
                        :placeholder="placeholder"
                        :message="validMessage.newPassword"
                        :value="toRaw(password.new)"
                        :disabled="loading"
                        :events="{
                            blur: (event: IInputEvent) =>
                                validFn.checkNewPassword(event.target.value),
                            change: (event: IInputEvent) => (password.new = event.target.value)
                        }"
                    />
                </div>
                <div class="mb-3">
                    <InputText
                        id="ipres-repeatPassword"
                        type="password"
                        :className="validState.repeatPasswordClass"
                        label="Nhập lại mật khẩu mới"
                        :placeholder="placeholder"
                        :message="validMessage.repeatPassword"
                        :value="toRaw(password.repeat)"
                        :disabled="loading"
                        :events="{
                            blur: (event: IInputEvent) =>
                                validFn.checkRepeatPassword(event.target.value),
                            change: (event: IInputEvent) => (password.repeat = event.target.value)
                        }"
                    />
                </div>
                <button class="btn btn-danger rounded-pill" :disabled="loading" @click="update">
                    <template v-if="loading"
                        ><span class="fas fa-spinner fa-spin"></span> Đang xử lý</template
                    >
                    <template v-else>Cập nhật</template>
                </button>
            </div>
        </div>
        <ModalView ref="refModal" @confirmedModal="confirmedModal"></ModalView>
    </div>
</template>
