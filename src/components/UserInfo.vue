<template>
  <div class="container mt-5" style="max-width: 500px;">
    <div class="card shadow-sm">
      <div class="card-body">
        <h3 class="card-title mb-4 text-center">회원 정보</h3>

        <form @submit.prevent="updateUser">
          <!-- 아이디 -->
          <div class="mb-3">
            <label for="userId" class="form-label">아이디</label>
            <input
              type="text"
              class="form-control"
              id="userId"
              v-model="user.userId"
              readonly
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
            <div class="input-group">
              <input
                :type="passwordFieldType"
                class="form-control"
                id="userPassword"
                v-model="user.userPassword"
                placeholder="비밀번호를 입력하세요"
                required
              >
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="togglePassword"
                tabindex="-1"
              >
                👁️
              </button>
            </div>
          </div>

          <!-- 권한 -->
          <div class="mb-4">
            <label for="role" class="form-label">권한</label>
            <select
              class="form-select"
              id="role"
              v-model="user.role"
              required
            >
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
              수정
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();


// 더미 유저 데이터
const user = ref({
  userId: 'dummyuser',
  userName: '홍길동',
  userPassword: 'password123',
  role: 'USER',
});

const passwordFieldType = ref('password');


onMounted(() => {
  // 더미 데이터만 사용
});


function updateUser() {
  alert("회원 정보가 수정되었습니다 (임시)");
  router.push('/userList');
}

function moveToBack() {
  router.push('/userList');
}

function togglePassword() {
  passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
}
</script>