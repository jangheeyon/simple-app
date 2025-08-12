<template>
  <div id="login-page">
    <div class="wrapper">
      <div class="card">
        <h1>로그인</h1>
        <div class="error-msg" v-if="errorMsg">{{ errorMsg }}</div>
        <input type="text" v-model="userId" placeholder="아이디" />
        <input type="password" v-model="userPassword" placeholder="비밀번호" />
        <button class="btn-custom btn-login" @click="login">로그인</button>
        <button class="btn-custom btn-signup" @click="goToSignUp">회원가입</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import "@/assets/css/login.css";
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const userId = ref('');
const userPassword = ref('');
const errorMsg = ref('');

async function login() {
  errorMsg.value = '';

  if (!userId.value || !userPassword.value) {
    errorMsg.value = '아이디와 비밀번호를 모두 입력하세요.';
    return;
  }

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userId.value,
        userPassword: userPassword.value,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const accessToken = data.accessToken;
      const refreshToken = data.refreshToken;

      if (accessToken && refreshToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        router.push('/userList');
      } else {
        throw new Error('토큰이 응답에 없습니다.');
      }
    } else {
      errorMsg.value = '아이디 또는 비밀번호가 올바르지 않습니다.';
    }
  } catch (err) {
    errorMsg.value = '로그인 중 오류가 발생했습니다.';
    console.error(err);
  }
}

function goToSignUp() {
  router.push('/signup');
}
</script>
