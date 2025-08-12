<template>
  <div id="signup-page">
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
  </div>
</template>

<script setup>
import "@/assets/css/login.css";
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