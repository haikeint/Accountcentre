<script lang="ts" setup>
import { reactive } from 'vue'

let alertTimeout: number | undefined = undefined

const props = defineProps({
    duration: { type: Number, default: 3000 }
})

const info = reactive({
    enable: false,
    type: '',
    message: '',
    style: '',
    duration: props.duration
})

const show = (type: 'success' | 'danger' | 'warning', message: string) => {
    info.style = `left: ${window.innerWidth / 2}px`
    info.type = type
    info.message = message
    info.enable = true
    if (alertTimeout !== undefined) clearTimeout(alertTimeout)
    alertTimeout = setTimeout(() => {
        info.enable = false
        alertTimeout = undefined
    }, info.duration)
}

defineExpose({
    show
})
</script>

<template>
    <Transition name="slide">
        <div v-if="info.enable" class="liveAlertPlaceholder" :style="info.style">
            <div
                v-if="info.type == 'success'"
                class="rounded-pill me-3 show fade alert alert-success alert-dismissible border-0 d-flex align-items-center alert-custom border-success"
                role="alert"
            >
                <div class="bg-success me-3 icon-item">
                    <span class="fas fa-check-circle text-white fs-6"></span>
                </div>

                <p class="mb-0 flex-1">{{ info.message }}&nbsp;&nbsp;</p>
                <!-- <button
                    class="btn-close"
                    type="button"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                ></button> -->
            </div>
            <div
                v-if="info.type == 'danger'"
                class="rounded-pill me-3 show fade alert alert-danger alert-dismissible border-0 d-flex align-items-center alert-custom border-danger"
                role="alert"
            >
                <div class="bg-danger me-3 icon-item">
                    <span class="fas fa-times-circle text-white fs-6"></span>
                </div>
                <p class="mb-0 flex-1">{{ info.message }}&nbsp;&nbsp;</p>
                <!-- <button
                    class="btn-close"
                    type="button"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                ></button> -->
            </div>
            <div
                v-if="info.type == 'warning'"
                class="rounded-pill me-3 show fade alert alert-warning alert-dismissible border-0 d-flex align-items-center alert-custom border-warning"
                role="alert"
            >
                <div class="bg-warning me-3 icon-item">
                    <svg
                        class="svg-inline--fa fa-exclamation-circle fa-w-16 text-white fs-6"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="exclamation-circle"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        data-fa-i2svg=""
                    >
                        <path
                            fill="currentColor"
                            d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                        ></path>
                    </svg>
                </div>
                <p class="mb-0 flex-1">{{ info.message }}&nbsp;&nbsp;</p>
                <!-- <button
                    class="btn-close"
                    type="button"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                ></button> -->
            </div>
        </div>
    </Transition>
</template>
<style scoped>
.liveAlertPlaceholder {
    position: fixed;
    top: 5vh;
    transform: translateX(-50%);
    z-index: 9999;
}

.border-success {
    border: solid 1px #00d27a !important;
    color: #00d27a;
}
.border-danger {
    color: #e63757;
    border: solid 1px #e63757 !important;
}
.border-warning {
    color: #ac5a2b;
    border: solid 1px #ac5a2b !important;
}
.alert-custom {
    padding: 0.5rem;
    font-weight: bold;
    /* --falcon-bg-opacity: 1;
  background-color: rgba(var(--falcon-danger-rgb), var(--falcon-bg-opacity)) !important; */
}

.alert-custom .bg-danger svg {
    background-color: rgba(var(--falcon-danger-rgb), var(--falcon-bg-opacity)) !important;
}

.alert-custom .btn-close {
    /* border: unset; */
    margin-left: 1rem;
}

.slide-enter-active,
.slide-leave-active {
    transition: all 1s ease;
}

.slide-enter-from, .slide-leave-to /* Đoạn này áp dụng cho trạng thái ban đầu khi vào và kết thúc khi ra */ {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
}

.slide-enter-to, .slide-leave-from /* Đoạn này áp dụng cho trạng thái cuối cùng khi vào và ban đầu khi ra */ {
    max-height: 1000px; /* Bạn có thể điều chỉnh max-height để phù hợp với nội dung của bạn */
    opacity: 1;
}
</style>
