<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
const button = ref<HTMLButtonElement>()

const props = defineProps({
  type: { type: String, default: 'button' },
  className: { type: String, default: '' },
  message: { type: String, defaule: '' },
  html: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  events: { type: Object, default: new Object() }
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
  <button :class="props.className" ref="button" :type="btnType" :disabled="props.disabled">
    {{ props.html }}
  </button>
  <Transition>
    <div v-if="message" class="invalid-feedback">
      <span class="center">{{ props.message }}</span>
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
