<template>
  <nav class="col-md-2 col-lg-2 bg-light sidebar p-3">
    <h5 class="mb-4">뉴스</h5>
    <ul class="nav flex-column">
      <li class="nav-item mb-2">
        <a class="nav-link active" href="#">최신 뉴스</a>
      </li>
      <li class="nav-item mb-2">
        <a class="nav-link" href="#">인기 뉴스</a>
      </li>
      <li class="nav-item mb-2">
        <a class="nav-link" href="#">추천 뉴스</a>
      </li>
    </ul>

    <h6 class="mt-4">라이브러리</h6>
    <ul class="nav flex-column">
      <li class="nav-item mb-2">
        <a class="nav-link" href="#">검색</a>
      </li>
      <li class="nav-item mb-2">
        <a class="nav-link" href="#">내 알림</a>
      </li>
      <li class="nav-item mb-2">
        <a class="nav-link" href="#">마이 페이지</a>
      </li>
      <li class="nav-item mb-2" v-if="userStore.isAdmin">
        <router-link class="nav-link" :to="{ name: 'ManageBoard' }">
          관리 페이지
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
</script>

<style scoped>
.sidebar {
  border-right: 1px solid #ddd;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}

.sidebar .nav-link {
  color: #333;
  font-weight: 500;
}

.sidebar .nav-link.active {
  background-color: #f0f0f0;
  border-radius: 5px;
}
</style>