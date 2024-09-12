<script lang="ts" setup>
import type { IInputEvent } from '@/interface/IInputEvent'
import { reactive, ref, toRaw } from 'vue'

import InputText from '@/components/InputText.vue'

import type { IModal } from '../../interface/IModal'
import { useMutation } from '@vue/apollo-composable'

import { MUTATION_SEND_VERIFY_EMAIL, MUTATION_CHANGE_EMAIL } from '@/graphql/account'

const { mutate: sendVerifyEmail } = useMutation(MUTATION_SEND_VERIFY_EMAIL)
const { mutate: changeEmail } = useMutation(MUTATION_CHANGE_EMAIL)

const validMessage: Record<string, string> = reactive({
    oldEmail: '',
    newEmail: ''
})

const validState = reactive({
    oldEmailClass: 'form-control',
    newEmailClass: 'form-control'
})

const validFn = {
    checkOldEmail: (value: string) => {
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

        validMessage.oldEmail = result
        validState.oldEmailClass = result ? 'form-control invalid-txt' : 'form-control valid-txt'
    },
    checkNewEmail: (value: string) => {
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

        validMessage.newEmail = result
        validState.newEmailClass = result ? 'form-control invalid-txt' : 'form-control valid-txt'
    }
}
const emit = defineEmits(['alert'])

const props = defineProps({
    isExisted: { type: Boolean, required: true },
    isVerify: { type: Boolean, required: true },
    emailMask: { type: String, default: '' }
})

const refModal = ref<IModal>()
const loading = ref<boolean>(false)
const hidden = ref<boolean>(false)

const email = reactive({
    old: '',
    new: ''
})

const verifyEmail = () => {
    loading.value = true
    sendVerifyEmail()
        .then((res) => {
            console.log(res)
            loading.value = false
            hidden.value = true
            emit('alert', {
                type: 'success',
                message: 'Đã gửi Email xác thực'
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
}
const update = () => {
    if (props.isVerify) validFn.checkOldEmail(email.old)
    validFn.checkNewEmail(email.new)

    if (!Object.values(validMessage).some((value) => Boolean(value))) {
        refModal.value?.show()
    }
}

const confirmedModal = () => {
    loading.value = true
    changeEmail({
        oldEmail: email.old,
        newEmail: email.new
    })
        .then((res) => {
            loading.value = false
            emit('alert', {
                type: 'success',
                message: res?.data.changeEmail
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
                <template v-if="!isVerify">
                    <div class="mt-3">
                        Emai: {{ emailMask }}
                        <button
                            v-if="!hidden"
                            :disabled="loading"
                            class="btn btn-outline-danger rounded-pill"
                            style="padding: 0px 10px 0px 10px"
                            @click="verifyEmail"
                        >
                            <template v-if="loading">
                                <span class="fas fa-spinner fa-spin"></span> Đang xử lý
                            </template>
                            <template v-else>Gửi mail xác thực</template>
                        </button>
                    </div>
                    <hr />
                </template>
                <template v-else>
                    <div class="mb-2">
                        <InputText
                            id="ipres-old-mail"
                            :className="validState.oldEmailClass"
                            label="Email hiện tại"
                            placeholder="abc@gmail.com"
                            :message="validMessage.oldEmail"
                            :value="toRaw(email.old)"
                            :disabled="loading"
                            :events="{
                                blur: (event: IInputEvent) =>
                                    validFn.checkOldEmail(event.target.value),
                                change: (event: IInputEvent) => (email.old = event.target.value)
                            }"
                        />
                    </div>
                </template>
                <div class="mb-3">
                    <InputText
                        id="ipres-new-mail"
                        :className="validState.newEmailClass"
                        label="Email mới"
                        placeholder="abc@gmail.com"
                        :message="validMessage.newEmail"
                        :value="toRaw(email.new)"
                        :disabled="loading"
                        :events="{
                            blur: (event: IInputEvent) => validFn.checkNewEmail(event.target.value),
                            change: (event: IInputEvent) => (email.new = event.target.value)
                        }"
                    />
                </div>

                <button :disabled="loading" @click="update" class="btn btn-danger rounded-pill">
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
