<script lang="ts" setup>
defineProps({
    id: { type: String, required: true },
    placeholder: { type: String, default: '' },
    type: { type: String, default: 'text' },
    value: { type: String, required: true },
    disabled: { type: Boolean, defalt: false }
})

const emit = defineEmits(['update:value'])

const updateValue = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('update:value', target.value)
}
</script>
<template>
    <input
        :id="id"
        :type="type"
        class="form-control"
        :placeholder="placeholder"
        :value="value"
        :disabled="disabled"
        @input="updateValue"
        autocomplete="off"
    />
</template>
