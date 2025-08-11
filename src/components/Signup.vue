<template>
  <div class="card">
    <h1>회원가입</h1>
    <div class="error-msg" v-if="errorMsg">{{ errorMsg }}</div>
    <div class="success-msg" v-if="successMsg">{{ successMsg }}</div>
    <input type="text" v-model="userId" placeholder="아이디" />
    <input type="text" v-model="userName" placeholder="이름" />
    <input type="password" v-model="userPassword" placeholder="비밀번호" />
    <select v-model="role">
      <option value="">권한 선택</option>
      <option value="ROLE_ADMIN">관리자</option>
      <option value="ROLE_USER">일반</option>
    </select>
    <button class="btn-custom btn-signup" @click="signUp">회원가입</button>
    <button class="btn-custom btn-back" @click="goBack">뒤로가기</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { apiRequest } from '@/utils/apiRequest.js';

const router = useRouter();

const userId = ref('');
const userName = ref('');
const userPassword = ref('');
const role = ref('');

const errorMsg = ref('');
const successMsg = ref('');

async function signUp() {
  errorMsg.value = '';
  successMsg.value = '';

  if (!userId.value || !userName.value || !userPassword.value || !role.value) {
    errorMsg.value = '모든 항목을 입력하세요.';
    return;
  }

  try {
    const response = await fetch('/api/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userId.value,
        userName: userName.value,
        userPassword: userPassword.value,
        role: role.value,
      }),
    });

    if (response.ok) {
      successMsg.value = '회원가입이 완료되었습니다.';
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } else {
      errorMsg.value = '회원가입에 실패했습니다.';
    }
  } catch (err) {
    errorMsg.value = '회원가입 중 오류가 발생했습니다.';
    console.error(err);
  }
}

function goBack() {
  router.push('/');
}
</script>

<style scoped>
/* signup.html의 style 태그 내용을 여기에 복사 */
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
input, select {
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
.btn-signup {
    background-color: #007bff;
    color: white;
}
.btn-signup:hover {
    background-color: #0069d9;
    transform: scale(1.05);
}
.btn-back {
    background-color: #6c757d;
    color: white;
}
.btn-back:hover {
    background-color: #5a6268;
    transform: scale(1.05);
}
.error-msg {
    color: red;
    margin-bottom: 10px;
    display: block;
}
.success-msg {
    color: green;
    margin-bottom: 10px;
    display: block;
}
</style>