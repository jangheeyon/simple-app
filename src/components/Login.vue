<template>
  <div class="d-flex vh-100 justify-content-center align-items-center bg-gradient">
    <div class="card p-4 shadow-lg rounded-4" style="width: 100%; max-width: 400px;">
      <h1 class="text-center mb-4 text-primary fw-bold">로그인</h1>

      <div v-if="errorMsg" class="alert alert-danger py-2">
        {{ errorMsg }}
      </div>

      <div class="mb-3">
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-person"></i></span>
          <input type="text" v-model="userId" class="form-control" placeholder="아이디" />
        </div>
      </div>

      <div class="mb-3">
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-lock"></i></span>
          <input type="password" v-model="userPassword" class="form-control" placeholder="비밀번호" />
        </div>
      </div>

      <div class="d-grid gap-3 mt-3">
        <button class="btn btn-primary btn-md" @click="login">로그인</button>
        <button class="btn btn-outline-secondary btn-md" @click="goToSignUp">회원가입</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCommon } from "@/composables/useCommon"

const { userStore, router } = useCommon()

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
      body: JSON.stringify({ userId: userId.value, userPassword: userPassword.value }),
    });

    if (response.ok) {
      const data = await response.json();
      const accessToken = data.accessToken;
      const refreshToken = data.refreshToken;

      if (accessToken && refreshToken) {
        userStore.setToken(accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        router.push("/newsBoard");
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

//회원가입 화면 이동
function goToSignUp() {
  router.push('/signup');
}
</script>