<script lang="ts" setup>
import { RouterLink } from 'vue-router'
const props = defineProps({
    name: { type: String, required: true },
    icon: { type: String, required: true },
    to: { type: String, required: true }
})
</script>

<template>
    <RouterLink :to="{ name: props.to }" exact-active-class="active" class="nav-link">
        <div class="d-flex align-items-center">
            <span class="nav-link-icon">
                <span :class="props.icon"></span>
            </span>
            <span class="nav-link-text ps-1">{{ props.name }}</span>
        </div>
    </RouterLink>
</template>
