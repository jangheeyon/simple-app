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
const users = ref([]);

onMounted(() => {
  fetchUsers();
});

const fetchUsers = async () => {
  const accessToken = userStore.token;
  if (!accessToken) {
    alert("로그인이 필요합니다.");
    router.push('/');
    return;
  }

  try {
    const response = await apiRequest('/api/user', {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });

    if (response.status === 401 || response.status === 403) {
      alert("인증이 필요합니다. 로그인 페이지로 이동합니다.");
      router.push('/');
      return;
    }
    if (!response.ok) {
      throw new Error("회원 목록 API 호출 실패");
    }

    const data = await response.json();
    users.value = data;
  } catch (error) {
    console.error("오류 발생:", error);
  }
};

const deleteUser = async (userId) => {
  if (confirm(userId + "님을 삭제하시겠습니까?")) {
    try {
      const response = await apiRequest(`/api/user/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error("삭제 실패");
      }

      users.value = users.value.filter(user => user.userId !== userId);
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
    }
  }
};

const insertUser = () => {
  router.push('/userForm');
};
</script>