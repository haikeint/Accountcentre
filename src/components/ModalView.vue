<script lang="ts" setup>
import { onMounted, ref, defineExpose } from 'vue'
import { Modal } from 'bootstrap'

const myModal = ref<Modal | null>(null)
const emit = defineEmits(['toggle', 'confirmedModal'])

onMounted(() => {
    myModal.value = new Modal(document.getElementById('modal-confirm') as HTMLElement)
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

defineExpose({
    hide,
    show
})
</script>

<template>
    <div class="modal fade" id="modal-confirm" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 500px">
            <div class="modal-content position-relative">
                <!-- <div class="position-absolute top-0 end-0 mt-2 me-2 z-1">
                    <button
                        class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        @click="hide"
                    ></button>
                </div> -->
                <div class="modal-body p-0">
                    <div class="rounded-top-3 py-3 bg-body-tertiary text-center">
                        <h4>Xác nhận thông tin</h4>
                        <!-- <h4 class="mb-1" id="modalExampleDemoLabel">Xác nhận thông tin</h4> -->
                    </div>
                    <h5 class="p-4 pb-0 mb-4 text-center" id="modalExampleDemoLabel">
                        Lưu thay đổi thông tin ?
                    </h5>
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
                        @click="hide"
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
