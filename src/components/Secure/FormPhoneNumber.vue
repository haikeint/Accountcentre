<script lang="ts" setup>
import type { IInputEvent } from '@/interface/IInputEvent'
import { reactive, ref, toRaw } from 'vue'
// import InputText from '../Util/InputText.vue'
import InputText from '@/components/InputText.vue'
// import LabelComp from '../Util/LabelComp.vue'
import type { IModal } from '../../interface/IModal'

import { useMutation } from '@vue/apollo-composable'
import { MUTATION_CHANGE_PHONE } from '@/graphql/account'
const { mutate: changePhone } = useMutation(MUTATION_CHANGE_PHONE)

const refModal = ref<IModal>()
const loading = ref<boolean>(false)

const props = defineProps({
    isExisted: { type: Boolean, required: true }
})

const phoneNumber = reactive({
    old: '',
    new: ''
})

const validMessage: Record<string, string> = reactive({
    oldPhone: '',
    newPhone: ''
})

const validState = reactive({
    oldPhoneClass: 'form-control',
    newPhoneClass: 'form-control'
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
    }
}

const emit = defineEmits(['alert'])

const checkInput = (event: IInputEvent) => {
    const element = event.target as HTMLInputElement
    return element.value.replace(/[^0-9]/g, '')
}
const update = () => {
    // if (props.isExisted) validFn.checkOldPhone(phoneNumber.old)
    validFn.checkNewPhone(phoneNumber.new)

    if (!Object.values(validMessage).some((value) => Boolean(value))) {
        refModal.value?.show()
    }
}
const confirmedModal = () => {
    loading.value = true
    changePhone({
        oldPhone: phoneNumber.old,
        newPhone: phoneNumber.new
    })
        .then((res) => {
            loading.value = false
            emit('alert', {
                type: 'success',
                message: res?.data.changePhone
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
                        label="SĐT mới"
                        placeholder="0900111222"
                        :message="validMessage.newPhone"
                        :value="toRaw(phoneNumber.new)"
                        :disabled="loading"
                        :events="{
                            blur: (event: IInputEvent) => validFn.checkOldPhone(event.target.value),
                            input: (event: IInputEvent) => (phoneNumber.new = checkInput(event))
                        }"
                    />
                </div>
                <button class="btn btn-danger rounded-pill" @click="update">Cập nhật</button>
            </div>
        </div>
        <ModalView ref="refModal" @confirmedModal="confirmedModal"></ModalView>
    </div>
</template>
