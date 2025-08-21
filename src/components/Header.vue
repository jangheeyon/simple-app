<template>
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h2>뉴스</h2>

    <div class="d-flex align-items-center">
      <button class="btn btn-outline-danger" @click="logout">로그아웃</button>
    </div>
  </div>
</template>

<script setup>
import { useCommon } from "@/composables/useCommon"
const { logout } = useCommon()
</script>
