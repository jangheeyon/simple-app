<template>
  <nav class="col-md-2 col-lg-2 bg-light sidebar p-3 vh-100 border-end d-flex flex-column">
    <h3 class="mb-3 fw-bold text-secondary">맞춤형 서비스</h3>
    <!-- 뉴스 섹션 -->
    <div class="mb-4">      
      <ul class="nav nav-pills flex-column gap-1">
        <li class="nav-item">
          <router-link
            class="nav-link d-flex align-items-center"
            :class="{ active: $route.name === 'NewsBoard' }"
            :to="{ name: 'NewsBoard' }"
          >
            <i class="bi bi-newspaper me-2"></i> 최신 뉴스
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link d-flex align-items-center" href="#">
            <i class="bi bi-bar-chart-line me-2"></i> 인기 뉴스
          </a>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link d-flex align-items-center"
            :class="{ active: $route.name === 'RcmdNewsBoard' }"
            :to="{ name: 'RcmdNewsBoard' }"
          >
            <i class="bi bi-star me-2"></i> 추천 뉴스
          </router-link>
        </li>
      </ul>
    </div>

    <!-- 라이브러리 섹션 -->
    <div class="mb-4">
      <h6 class="fw-bold text-secondary">라이브러리</h6>
      <ul class="nav nav-pills flex-column gap-1">
        <li class="nav-item">
          <a class="nav-link d-flex align-items-center" href="#">
            <i class="bi bi-search me-2"></i> 검색
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link d-flex align-items-center" href="#">
            <i class="bi bi-bell me-2"></i> 내 알림
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link d-flex align-items-center" href="#">
            <i class="bi bi-person me-2"></i> 마이 페이지
          </a>
        </li>
      </ul>
    </div>

    <!-- 관리자 메뉴 -->
    <div v-if="userStore.isAdmin">
      <h6 class="fw-bold text-secondary">관리 페이지</h6>
      <ul class="nav nav-pills flex-column gap-1">
        <li class="nav-item">
          <router-link class="nav-link d-flex align-items-center" :class="{ active: $route.name === 'ManageBoard' }" :to="{ name: 'ManageBoard' }">
            <i class="bi bi-gear me-2"></i> 전체 관리 페이지
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link d-flex align-items-center" :class="{ active: $route.name === 'UserList' }" :to="{ name: 'UserList' }">
            <i class="bi bi-gear me-2"></i> 회원 관리
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link d-flex align-items-center" :class="{ active: $route.name === 'KeywordList' }" :to="{ name: 'KeywordList' }">
            <i class="bi bi-gear me-2"></i> 키워드 관리
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
</script>