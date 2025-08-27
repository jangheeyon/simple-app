<template>
  <div class="d-flex vh-100 justify-content-center align-items-center bg-gradient">
    <div class="card p-4 shadow-lg rounded-4" style="width: 100%; max-width: 400px;">
      <h1 class="text-center mb-4 text-success fw-bold">회원가입</h1>

      <div v-if="successMsg" class="alert alert-success py-2 text-center">
        {{ successMsg }}
      </div>
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

      <div class="mb-3">
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-lock-fill"></i></span>
          <input type="password" v-model="userPasswordConfirm" class="form-control" placeholder="비밀번호 확인" />
        </div>
      </div>

      <div class="mb-3">
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-person-badge"></i></span>
          <input type="text" v-model="userName" class="form-control" placeholder="이름" />
        </div>
      </div>

      <div class="d-grid gap-3 mt-3">
        <button class="btn btn-success btn-md" @click="signUp">회원가입</button>
        <button class="btn btn-outline-secondary btn-md" @click="goToLogin">로그인으로 돌아가기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCommon } from "@/composables/useCommon"

const { router } = useCommon()

const userId = ref('');
const userName = ref('');
const userPassword = ref('');
const userPasswordConfirm = ref('');
const role = ref('USER');

const errorMsg = ref('');
const successMsg = ref('');

async function signUp() {
  errorMsg.value = '';
  successMsg.value = '';

  if (!userId.value || !userName.value || !userPassword.value || !userPasswordConfirm.value || !role.value) {
    errorMsg.value = '모든 항목을 입력하세요.';
    return;
  }

  // 비밀번호 확인 체크
  if (userPassword.value !== userPasswordConfirm.value) {
    errorMsg.value = '비밀번호와 비밀번호 확인이 일치하지 않습니다.';
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
      }, 1000);
    } else {
      const data = await response.json();
      errorMsg.value = data.message || '회원가입에 실패했습니다.';
    }
  } catch (err) {
    errorMsg.value = '회원가입 중 오류가 발생했습니다.';
    console.error(err);
  }
}

function goToLogin() {
  router.push('/');
}
</script>