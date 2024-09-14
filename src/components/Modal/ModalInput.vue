<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Modal } from 'bootstrap'

const myModal = ref<Modal | null>(null)
const emit = defineEmits(['toggle', 'confirmedModal', 'cancel'])

onMounted(() => {
    myModal.value = new Modal(document.getElementById('staticBackdrop') as HTMLElement)
    emit('toggle', myModal.value)
})

const hide = () => {
    myModal.value?.hide()
}

const show = () => {
    myModal.value?.show()
}

const confirmedModal = () => {
    emit('confirmedModal')
}

const cancel = () => {
    hide()
    emit('cancel')
}
defineExpose({
    hide,
    show
})
</script>

<template>
    <!-- <div class="modal fade" id="modal-confirm" tabindex="-1" role="dialog" aria-hidden="true"> -->
    <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-keyboard="false"
        data-bs-backdrop="static"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 500px">
            <div class="modal-content position-relative">
                <div class="modal-body p-0">
                    <div class="rounded-top-3 py-3 bg-body-tertiary text-center">
                        <h4>Xác thực số điện thoại</h4>
                    </div>
                    <!-- <h5 class="p-4 pb-0 mb-4 text-center" id="modalExampleDemoLabel">
                        Lưu thay đổi thông tin ?
                    </h5> -->
                    <slot></slot>
                </div>
                <div class="modal-footer justify-content-center">
                    <button
                        @click="confirmedModal"
                        class="btn btn-info rounded-pill custom-border"
                        type="button"
                    >
                        <span class="fas fa-check"></span>
                        Xác nhận
                    </button>

                    <button
                        @click="cancel"
                        class="btn btn-secondary rounded-pill custom-border"
                        type="button"
                        data-bs-dismiss="modal"
                    >
                        <span class="fas fa-times-circle"></span>
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.custom-border {
    border: 2px solid black; /* Border dày 2px, màu đỏ */
}
/* style="background-color: #17a2b8" */
</style>
