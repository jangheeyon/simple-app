<template>
  <div class="container-fluid vh-100">
    <div class="row h-100">
      <!-- 사이드바 -->
      <Sidebar />

      <!-- 본문 -->
      <main class="col-md-10 col-lg-10 p-4 content-area">
        <!-- 헤더 -->
        <Header />

        <!-- 카드 레이아웃 -->
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h4 class="card-title mb-0">회원</h4>
              <button class="btn btn-success" @click="insertUser">
                + 회원 등록
              </button>
            </div>

            <!-- 회원 테이블 -->
            <div class="table-responsive">
              <table class="table table-bordered align-middle">
                <thead class="table-light text-center">
                  <tr>
                    <th style="width: 30%">아이디</th>
                    <th style="width: 50%">이름</th>
                    <th style="width: 20%">삭제</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="users.length === 0">
                    <td colspan="3" class="text-center">회원 정보가 없습니다.</td>
                  </tr>
                  <tr v-for="user in users" :key="user.userId">
                    <td class="text-center">{{ user.userId }}</td>
                    <td>
                      <router-link
                        :to="{ path: '/userInfo', query: { userId: user.userId } }"
                        class="text-decoration-none"
                      >
                        {{ user.userName }}
                      </router-link>
                    </td>
                    <td class="text-center">
                      <button
                        class="btn btn-outline-danger btn-sm"
                        @click="deleteUser(user.userId)"
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import Header from "@/components/Header.vue"
import Sidebar from "@/components/Sidebar.vue"
import { useCommon } from "@/composables/useCommon"

const { apiRequest, userStore, router } = useCommon()

// 더미 회원 데이터 (UserInfo.vue와 연결)
const users = ref([
  {
    userId: 'dummyuser',
    userName: '홍길동',
    userPassword: 'password123',
    role: 'USER',
  },
  {
    userId: 'admin',
    userName: '관리자',
    userPassword: 'adminpw',
    role: 'ADMIN',
  },
  {
    userId: 'testuser',
    userName: '테스터',
    userPassword: 'testpw',
    role: 'USER',
  }
]);

onMounted(() => {
  // 더미 데이터만 사용
});

const deleteUser = (userId) => {
  if (confirm(userId + "님을 삭제하시겠습니까? (임시)")) {
    users.value = users.value.filter(user => user.userId !== userId);
  }
};

const insertUser = () => {
  router.push('/userForm');
};
</script>