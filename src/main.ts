import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/global.scss'
import VueSweetalert2 from 'vue-sweetalert2'
import { createPinia } from 'pinia'
createApp(App).use(VueSweetalert2).use(router).use(createPinia()).mount('#app')


