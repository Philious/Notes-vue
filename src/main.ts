import { createApp } from 'vue';
import { router } from '@/router/router';
import './style.css';
import '@/assets/styles/styles.scss';
import { createPinia } from 'pinia';
import App from '@/App.vue'

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router)
app.mount('#app');
