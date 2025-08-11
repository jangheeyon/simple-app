import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 라우터 가져오기
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS import

const app = createApp(App);
app.use(router); // 라우터 사용
app.mount('#app');