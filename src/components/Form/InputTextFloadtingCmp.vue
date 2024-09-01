<script lang="ts" setup>
const emit = defineEmits(['update:value'])
defineProps({
    id: { type: String, required: true },
    label: { type: String },
    value: { type: String, required: true },
    disabled: { type: Boolean, default: false }
})
const updateValue = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('update:value', target.value)
}
</script>
<template>
    <div class="form-floating mb-3">
        <input
            class="form-control"
            :id="id"
            type="text"
            placeholder=""
            @input="updateValue"
            :disabled="disabled"
        />
        <label :for="id">{{ label }}</label>
    </div>
</template>
