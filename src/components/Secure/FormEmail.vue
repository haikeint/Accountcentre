<script lang="ts" setup>
import { reactive, ref } from 'vue'
import InputText from '../Util/InputText.vue'
import LabelComp from '../Util/LabelComp.vue'
import type { IModal } from '../../interface/IModal'

const emit = defineEmits(['update'])

defineProps({
    isExisted: { type: Boolean, required: true }
})

const refModal = ref<IModal>()

const email = reactive({
    old: '',
    new: ''
})

const update = () => {
    refModal.value?.show()
}

const confirmedModal = () => {
    emit('update', {
        oldEmail: email.old,
        newEmail: email.new
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
                    <LabelComp to="email-current" text="Email cũ"></LabelComp>
                    <InputText
                        id="email-current"
                        v-model:value="email.old"
                        placeholder="ABCabc@gmail.com"
                    ></InputText>
                </div>
                <div class="mb-3">
                    <LabelComp to="email-new" text="Email mới"></LabelComp>
                    <InputText
                        id="email-new"
                        v-model:value="email.new"
                        placeholder="ABCabc@gmail.com"
                    ></InputText>
                </div>
                <button @click="update" class="btn btn-danger rounded-pill">Cập nhật</button>
            </div>
        </div>
        <ModalView ref="refModal" @confirmedModal="confirmedModal"></ModalView>
    </div>
</template>
