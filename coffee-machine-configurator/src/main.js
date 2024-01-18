import App from './App.vue'
import router from './router/router';
import { useStore } from "./store/store";
import { createApp } from 'vue'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
    .use(router)
    .mount('#app')
