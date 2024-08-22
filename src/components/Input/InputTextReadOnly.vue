<script lang="ts" setup>
import { ref } from 'vue'

const refInput = ref(null)

const emit = defineEmits(['update:value'])
const props = defineProps({
    isReadOnly: { type: Boolean, required: true },
    value: { type: String, required: true },
    placeholder: { type: String, required: true }
})

const updateValue = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('update:value', target.value)
}

const focus = () => {
    if (refInput.value != null) {
        let input = refInput.value as HTMLInputElement
        input.focus()
    }
}
defineExpose({
    focus
})
</script>
<template>
    <input
        :readonly="props.isReadOnly"
        class="form-control-plaintext outline-none"
        type="text"
        :value="props.value"
        :placeholder="placeholder"
        @input="updateValue"
        ref="refInput"
    />
</template>
