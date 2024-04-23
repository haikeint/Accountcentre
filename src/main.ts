// import './assets/main.css'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap'
import 'simplebar/dist/simplebar.min.css'

import './assets/css/theme.min.css'

const app = createApp(App)
app.use(router)
// app.use(ElementPlus)
app.mount('#app')

// import 'bootstrap/dist/js/bootstrap.js'
