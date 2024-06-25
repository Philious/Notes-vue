import { createApp } from 'vue';
import { router } from '@/router/router';
import './style.css';
import '@/assets/styles/styles.scss';
import { scroll } from '@/directives/scroll';
import App from './App.vue'

const app = createApp(App);
app.directive('scroll', scroll);
app.use(router)
app.mount('#app');
