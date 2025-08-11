<template>
  <div class="container mt-5">
    <h1 class="mb-4">회원 목록</h1>
    <table class="table table-bordered">
      <thead class="table-light">
        <tr>
          <th>아이디</th>
          <th>이름</th>
          <th>삭제</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="users.length === 0">
          <td colspan="3" class="text-center">회원 정보가 없습니다.</td>
        </tr>
        <tr v-for="user in users" :key="user.userId">
          <td>{{ user.userId }}</td>
          <td>
            <router-link :to="{ path: '/userInfo', query: { userId: user.userId } }">
              {{ user.userName }}
            </router-link>
          </td>
          <td>
            <button class="btn btn-danger btn-sm" @click="deleteUser(user.userId)">X</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button class="btn btn-success" @click="moveToIndex">메인</button>
    <button class="btn btn-success" @click="insertUser">등록</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { apiRequest } from '@/utils/apiRequest.js';

const router = useRouter();
const users = ref([]);

// Fetch user list on component mount
onMounted(() => {
  fetchUsers();
});

const fetchUsers = async () => {
  const accessToken = localStorage.getItem("accessToken");
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

      // Remove the user from the local array to update the UI
      users.value = users.value.filter(user => user.userId !== userId);
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
    }
  }
};

const moveToIndex = () => {
  router.push('/');
};

const insertUser = () => {
  router.push('/userForm');
};
</script>

<style scoped>
/* No specific styles in the original file, so we can leave this empty */
</style>