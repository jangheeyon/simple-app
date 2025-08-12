<template>
  <div class="container mt-5">
    <h1 class="mb-4">회원 등록</h1>
    <form @submit.prevent="registerUser">
      <div class="mb-3">
        <label for="userId" class="form-label">아이디</label>
        <input type="text" class="form-control" id="userId" v-model="user.userId" required>
      </div>
      <div class="mb-3">
        <label for="userName" class="form-label">이름</label>
        <input type="text" class="form-control" id="userName" v-model="user.userName" required>
      </div>
      <div class="mb-3">
        <label for="userPassword" class="form-label">비밀번호</label>
        <input type="password" class="form-control" id="userPassword" v-model="user.userPassword" required>
      </div>
      <div class="mb-3">
        <select id="role" class="form-select" v-model="user.role">
          <option value="">권한 선택</option>
          <option value="ROLE_ADMIN">관리자</option>
          <option value="ROLE_USER">일반</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">등록</button>
      <button type="button" class="btn btn-secondary" @click="moveToBack">뒤로</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const user = ref({
  userId: '',
  userName: '',
  userPassword: '',
  role: '',
});

async function registerUser() {
  try {
    const response = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user.value)
    });

    if (!response.ok) {
      throw new Error("회원 등록 실패");
    }

    alert("회원이 등록되었습니다");
    router.push('/userList');
  } catch (error) {
    console.error("등록 중 오류 발생:", error);
    alert("회원 등록 중 오류가 발생했습니다.");
  }
}

function moveToBack() {
  router.push('/userList');
}
</script>