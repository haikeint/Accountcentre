<script lang="ts" setup>
import { ref } from 'vue'
const props = defineProps({
    value: { type: Boolean, required: true },
    lefttime: { type: Number, required: true }
})

const emit = defineEmits(['update:value'])

const leftTime = ref<number>(props.lefttime)

let alertTimeoutId: ReturnType<typeof setInterval> = setInterval(() => {
    leftTime.value--
    if (leftTime.value == 0) {
        clearInterval(alertTimeoutId)
        emit('update:value', false)
    }
}, 1000)
</script>
<template>
    <div v-if="leftTime > props.lefttime - 3" style="color: #00d27a">
        <span class="fas fa-check-circle"></span> Đã gửi vào Email
    </div>
    <div v-else style="color: #f5803e">
        &nbsp;&nbsp;&nbsp;<span class="fas fa-hourglass-half fa-pulse"></span>&nbsp;&nbsp;&nbsp;{{
            leftTime
        }}s
    </div>
</template>
