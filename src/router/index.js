import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue';
import SignUp from '@/components/Signup.vue';
import UserForm from '@/components/UserForm.vue';
import UserList from '@/components/UserList.vue';
import UserInfo from '@/components/UserInfo.vue';
import NewsBoard from '@/components/NewsBoard.vue';


const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/userForm',
    name: 'UserForm',
    component: UserForm,
  },
  {
    path: '/userList',
    name: 'UserList',
    component: UserList,
  },
  {
    path: '/userInfo',
    name: 'UserInfo',
    component: UserInfo,
  },
    {
    path: '/newsBoard',
    name: 'NewsBoard',
    component: NewsBoard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;