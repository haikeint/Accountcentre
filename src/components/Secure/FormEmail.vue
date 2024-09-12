<script lang="ts" setup>
import { reactive, ref } from 'vue'
import InputText from '../Util/InputText.vue'
import LabelComp from '../Util/LabelComp.vue'

import type { IModal } from '../../interface/IModal'
import { useMutation } from '@vue/apollo-composable'

import { MUTATION_SEND_VERIFY_EMAIL, MUTATION_CHANGE_EMAIL } from '@/graphql/account'

const { mutate: sendVerifyEmail } = useMutation(MUTATION_SEND_VERIFY_EMAIL)
const { mutate: changeEmail } = useMutation(MUTATION_CHANGE_EMAIL)

const emit = defineEmits(['alert'])

defineProps({
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
    refModal.value?.show()
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
                    <div class="mb-3">
                        <LabelComp to="email-current" text="Email cũ"></LabelComp>
                        <InputText
                            id="email-current"
                            v-model:value="email.old"
                            placeholder="ABCabc@gmail.com"
                        ></InputText>
                    </div>
                </template>
                <div class="mb-3">
                    <LabelComp to="email-new" text="Email mới"></LabelComp>
                    <InputText
                        id="email-new"
                        v-model:value="email.new"
                        placeholder="ABCabc@gmail.com"
                    ></InputText>
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
