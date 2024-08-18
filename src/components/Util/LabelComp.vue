<script lang="ts" setup>
defineProps({
    to: { type: String, required: true },
    text: { type: String, required: true }
})
</script>
<template>
    <label class="form-label" :for="to">{{ text }}</label>
</template>
