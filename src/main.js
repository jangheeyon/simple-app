import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from "pinia";

import 'vue3-toastify/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.mount('#app');