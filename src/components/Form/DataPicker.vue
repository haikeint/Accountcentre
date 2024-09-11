<script lang="ts" setup>
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import { Vietnamese } from 'flatpickr/dist/l10n/vn.js'
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['update:value'])

defineProps({
    value: { type: String, requred: true }
})

const datepickerVal = ref(null)
let fpInstance: any = null

onMounted(() => {
    if (datepickerVal.value) {
        fpInstance = flatpickr(datepickerVal.value, {
            disableMobile: true,
            allowInput: true,
            locale: Vietnamese
        })
    }
})

onUnmounted(() => {
    if (fpInstance != null) fpInstance.destroy()
})

const change = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('update:value', target.value)
}
</script>
<template>
    <input
        ref="datepickerVal"
        class="form-control datetimepicker"
        id="datepickerVal"
        type="text"
        placeholder="yyyy/mm/dd"
        :value="value"
        @input="change"
    />
</template>

<style>
.flatpickr-day.selected {
    background-color: #17a2b8;
    border-color: #17a2b8;
}
.flatpickr-day.selected:hover {
    background-color: #17a2b8;
    border-color: #17a2b8;
}
</style>
