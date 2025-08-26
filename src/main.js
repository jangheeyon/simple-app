import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import 'vue3-toastify/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/main.css'; // 사용자 정의 스타일이 부트스트랩보다 우선 적용되도록 마지막에 import 합니다.

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

app.use(router);
app.use(pinia);
app.mount('#app');