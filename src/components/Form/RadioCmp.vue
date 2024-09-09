<script lang="ts" setup>
const emit = defineEmits(['cheked'])
const props = defineProps({
    id: { type: String, required: true },
    name: { type: String, required: true },
    value: { type: String, required: true },
    checked: { type: Boolean, default: false }
})
const updateValue = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.checked) {
        emit('cheked', props.value)
    }
}
</script>
<template>
    <div class="form-check">
        <input
            class="form-check-input"
            :checked="checked"
            :id="id"
            :name="name"
            :value="value"
            @change="updateValue"
            type="radio"
        />
        <label class="form-check-label" :for="id">{{ value }}</label>
    </div>
</template>
<style scoped>
.form-check label {
    float: left;
}
</style>
