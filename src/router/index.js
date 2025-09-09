import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue';
import SignUp from '@/components/Signup.vue';
import UserForm from '@/components/UserForm.vue';
import UserList from '@/components/UserList.vue';
import UserInfo from '@/components/UserInfo.vue';
import NewsBoard from '@/components/NewsBoard.vue';
import SubscNewsBoard from '@/components/SubscNewsBoard.vue';
import RcmdNewsBoard from '@/components/RcmdNewsBoard.vue';
import ManageBoard from '@/components/ManageBoard.vue';
import KeywordList from '@/components/KeywordList.vue';
import KeywordForm from '@/components/keywordForm.vue';


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
  {
    path: '/subscNewsBoard',
    name: 'SubscNewsBoard',
    component: SubscNewsBoard,
  },
      {
    path: '/rcmdNewsBoard',
    name: 'RcmdNewsBoard',
    component: RcmdNewsBoard,
  },
  {
    path: '/manageBoard',
    name: 'ManageBoard',
    component: ManageBoard,
  },
  {
    path: '/keywordList',
    name: 'KeywordList',
    component: KeywordList,
  },
  {
    path: '/keywordForm',
    name: 'KeywordForm',
    component: KeywordForm,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;