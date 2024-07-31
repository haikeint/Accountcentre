<template>
    <div ref="recaptchaContainer" class="g-recaptcha"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const emit = defineEmits(['onVerify', 'onError', 'onExpire'])

const recaptchaContainer = ref(null)

const SITE_KEY = import.meta.env.VITE_RECAPTCHAV2_KEY

const renderRecaptcha = () => {
    window.grecaptcha.render(recaptchaContainer.value, {
        sitekey: SITE_KEY,
        callback: (token: string) => emit('onVerify', token),
        'expired-callback': () => emit('onError'),
        'error-callback': () => emit('onExpire')
    })
}
onMounted(() => {
    if (window.grecaptcha && window.recaptchav2) {
        renderRecaptcha()
    } else {
        const script = document.createElement('script')
        script.src = `https://www.google.com/recaptcha/api.js?render=explicit`
        script.async = true
        script.defer = true
        document.head.appendChild(script)

        script.onload = () => {
            window.recaptchav2 = true
            window.grecaptcha.ready(() => {
                renderRecaptcha()
            })
        }
    }
})
</script>
