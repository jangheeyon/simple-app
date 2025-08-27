<template>
  <div class="container mt-5" style="max-width: 500px;">
    <div class="card shadow-sm">
      <div class="card-body">
        <h3 class="card-title mb-4 text-center">회원 등록</h3>

        <form @submit.prevent="registerUser">
          <!-- 아이디 -->
          <div class="mb-3">
            <label for="userId" class="form-label">아이디</label>
            <input
              type="text"
              class="form-control"
              id="userId"
              v-model="user.userId"
              placeholder="아이디를 입력하세요"
              required
            >
          </div>

          <!-- 이름 -->
          <div class="mb-3">
            <label for="userName" class="form-label">이름</label>
            <input
              type="text"
              class="form-control"
              id="userName"
              v-model="user.userName"
              placeholder="이름을 입력하세요"
              required
            >
          </div>

          <!-- 비밀번호 -->
          <div class="mb-3">
            <label for="userPassword" class="form-label">비밀번호</label>
            <input
              type="password"
              class="form-control"
              id="userPassword"
              v-model="user.userPassword"
              placeholder="비밀번호를 입력하세요"
              required
            >
          </div>

          <!-- 권한 -->
          <div class="mb-4">
            <label for="role" class="form-label">권한</label>
            <select id="role" class="form-select" v-model="user.role" required>
              <option value="">권한 선택</option>
              <option value="ADMIN">관리자</option>
              <option value="USER">일반</option>
            </select>
          </div>

          <!-- 버튼 영역 -->
          <div class="d-flex justify-content-between">
            <button type="button" class="btn btn-outline-secondary" @click="moveToBack">
              뒤로
            </button>
            <button type="submit" class="btn btn-primary">
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
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