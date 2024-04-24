import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'simplebar/dist/simplebar.min.css'
import './assets/css/theme.min.css'
const app = createApp(App)
app.use(router)
app.mount('#app')
