<script lang="ts" setup>
defineProps({
    id: { type: String, required: true },
    placeholder: { type: String, default: '' },
    value: { type: String, required: true }
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
        type="text"
        class="form-control"
        :placeholder="placeholder"
        :value="value"
        @input="updateValue"
        autocomplete="off"
    />
</template>
