import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import money from './assets/money'

createApp(App).use(store).use(router).use(money).mount('#app')
