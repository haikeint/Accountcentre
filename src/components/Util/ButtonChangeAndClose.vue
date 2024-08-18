<script lang="ts" setup>
const props = defineProps({
    status: { type: Boolean, required: true },
    name: { type: String, required: true }
})

const emit = defineEmits(['click'])

const handleClick = () => {
    emit('click', props.name)
}
</script>

<template>
    <button class="btn btn-info rounded-pill" @click="handleClick">
        <template v-if="!status"><span class="fas fa-edit"></span> Thay đổi</template>
        <template v-if="status"><span class="fas fa-times-circle"></span> Đóng </template>
    </button>
</template>
