import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/global.scss'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { createPinia } from 'pinia'

createApp(App).use(VueSweetalert2).use(router).use(createPinia()).mount('#app')

