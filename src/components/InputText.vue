<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
const inputText = ref<HTMLInputElement>()

const props = defineProps({
  id: { type: String, required: true },
  type: { type: String, default: 'text' },
  className: { type: String, default: '' },
  labelClassName: { type: String, default: 'form-label' },
  value: { type: String, default: '' },
  label: { type: String, default: '' },
  checkboxLabelClassName: { type: String, default: 'form-check-label mb-0' },
  checkboxLabel: { type: String, default: '' },
  message: { type: String, defaule: '' },
  placeholder: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  events: { type: Object, default: new Object() }
})

const isShow = computed(() =>
  props.className.indexOf('invalid') > -1 && props.message ? true : false
)

onMounted(() => {
  if (inputText.value)
    for (let key in props.events) inputText.value.addEventListener(key, props.events[key])
})
</script>

<template>
  <label v-if="props.label" :class="props.labelClassName" :for="props.id">
    {{ props.label }}
  </label>
  <input
    :id="props.id"
    :type="props.type"
    :class="props.className"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    ref="inputText"
    autocomplete="on"
  />
  <label v-if="props.checkboxLabel" :class="props.checkboxLabelClassName" :for="props.id">
    {{ props.checkboxLabel }}
  </label>
  <Transition>
    <div v-if="isShow" class="invalid-feedback">
      {{ props.message }}
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
