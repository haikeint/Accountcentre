import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import ModalView from '@/components/ModalView.vue'
import AlertView from '@/components/AlertView.vue'

const app = createApp(App)
app.component('ModalView', ModalView)
app.component('AlertView', AlertView)
app.use(router)
app.use(createPinia())
app.mount('#app')
