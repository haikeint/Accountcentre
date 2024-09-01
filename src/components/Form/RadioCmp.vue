<script lang="ts" setup>
const emit = defineEmits(['update:value'])
defineProps({
    id: { type: String, required: true },
    value: { type: String, required: true },
    checked: { type: Boolean, default: false }
})
const updateValue = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('update:value', target.value)
}
</script>
<template>
    <div class="form-check">
        <input
            class="form-check-input"
            :checked="checked"
            :id="id"
            @change="updateValue"
            type="radio"
        />
        <label class="form-check-label" :for="id"><slot></slot></label>
    </div>
</template>
<style scoped>
.form-check label {
    float: left;
}
</style>
