<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
const button = ref<HTMLButtonElement>()

const props = defineProps({
    id: { type: String, required: true },
    type: { type: String, default: 'button' },
    className: { type: String, default: '' },
    message: { type: String, defaule: '' },
    messageType: { type: String, defaule: 'invalid' },
    html: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    events: { type: Object, default: new Object() }
})

const messageType = computed(() => {
    return props.messageType == 'valid' ? 'valid-feedback' : 'invalid-feedback'
})

const btnType = computed(() => {
    return props.type as 'button' | 'submit' | 'reset' | undefined
})

onMounted(() => {
    if (button.value)
        for (let key in props.events) button.value.addEventListener(key, props.events[key])
})
</script>

<template>
    <button
        :id="props.id"
        :class="props.className"
        ref="button"
        :type="btnType"
        :disabled="props.disabled"
    >
        {{ props.html }}
    </button>
    <Transition>
        <div v-if="message" :class="messageType">
            <span class="center mt-2">{{ props.message }}</span>
        </div>
    </Transition>
</template>
<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.75s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
