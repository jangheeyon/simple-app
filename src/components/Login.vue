<template>
  <div class="card">
    <h1>로그인</h1>
    <div class="error-msg" v-if="errorMsg">{{ errorMsg }}</div>
    <input type="text" v-model="userId" placeholder="아이디" />
    <input type="password" v-model="userPassword" placeholder="비밀번호" />
    <button class="btn-custom btn-login" @click="login">로그인</button>
    <button class="btn-custom btn-signup" @click="goToSignUp">회원가입</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// apiRequest 함수를 사용하지 않으므로 import 제거

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

<style scoped>
/* 기존 index.html의 style 태그 내용을 여기에 복사 */
body {
    background: linear-gradient(to right, #f8f9fa, #e9ecef);
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.card {
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
    background-color: white;
    width: 350px;
    text-align: center;
}
h1 {
    font-weight: 600;
    color: #343a40;
    margin-bottom: 30px;
}
input {
    margin-bottom: 20px;
    height: 40px;
    font-size: 1rem;
    padding: 0 10px;
    width: 100%;
    border-radius: 8px;
    border: 1px solid #ced4da;
}
.btn-custom {
    font-size: 1.1rem;
    padding: 10px 0;
    width: 100%;
    border-radius: 30px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    margin-bottom: 10px;
}
.btn-login {
    background-color: #28a745;
    color: white;
}
.btn-login:hover {
    background-color: #218838;
    transform: scale(1.05);
}
.btn-signup {
    background-color: #007bff;
    color: white;
}
.btn-signup:hover {
    background-color: #0069d9;
    transform: scale(1.05);
}
.error-msg {
    color: red;
    margin-bottom: 10px;
    display: block;
}
</style>