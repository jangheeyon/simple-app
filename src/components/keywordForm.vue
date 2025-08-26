<template>
  <div class="container mt-5" style="max-width: 500px;">
    <div class="card shadow-sm">
      <div class="card-body">
        <h3 class="card-title mb-4 text-center">키워드 등록</h3>

        <form @submit.prevent="registerKeyword">
          <!-- 키워드 입력 -->
          <div class="mb-3">
            <label for="keyword" class="form-label">키워드</label>
            <input
              type="text"
              class="form-control"
              id="keyword"
              v-model="keyword.keyword"
              placeholder="등록할 키워드를 입력하세요"
              required
            >
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const userStore = useUserStore();

// keyword 상태
const keyword = ref({
  keyword: "",
  userId: userStore.userId,
});

async function registerKeyword() {
  try {
    const response = await fetch("/api/news/keyword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(keyword.value),
    });

    if (!response.ok) {
      throw new Error("키워드 등록 실패");
    }

    alert("키워드가 등록되었습니다");
    router.push("/keywordList");
  } catch (error) {
    console.error("등록 중 오류 발생:", error);
    alert("키워드 등록 중 오류가 발생했습니다.");
  }
}

function moveToBack() {
  router.push("/keywordList");
}
</script>
