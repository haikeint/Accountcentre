<script lang="ts" setup>
const emit = defineEmits(['update:value'])
const props = defineProps({
    isReadOnly: { type: Boolean, required: true },
    value: { type: String, required: true }
})

const updateValue = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('update:value', target.value)
}
</script>
<template>
    <input
        :readonly="props.isReadOnly"
        class="form-control-plaintext outline-none"
        type="text"
        :value="props.value"
        @input="updateValue"
    />
</template>
