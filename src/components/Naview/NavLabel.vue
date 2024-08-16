<script lang="ts" setup>
const props = defineProps({
    name: { type: String, required: true }
})
</script>
<template>
    <div class="row navbar-vertical-label-wrapper mt-3 mb-2">
        <div class="col-auto navbar-vertical-label">{{ props.name }}</div>
        <div class="col ps-0">
            <hr class="mb-0 navbar-vertical-divider" />
        </div>
    </div>
</template>
