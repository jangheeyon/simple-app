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
              <h4 class="card-title mb-0">관심 키워드</h4>
              <button class="btn btn-success" @click="insertKeyword">
                + 키워드 등록
              </button>
            </div>

            <!-- 키워드 테이블 -->
            <div class="table-responsive">
              <table class="table table-bordered align-middle">
                <thead class="table-light text-center">
                  <tr>
                    <th style="width: 40%">키워드</th>
                    <th style="width: 20%">삭제</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="keywords.length === 0">
                    <td colspan="3" class="text-center">키워드 정보가 없습니다.</td>
                  </tr>
                  <tr v-for="keyword in keywords" :key="keyword.keywordId">
                    <td>{{ keyword.keyword }}</td>
                    <td class="text-center">
                      <button
                        class="btn btn-outline-danger btn-sm"
                        @click="deleteKeyword(keyword.keywordId)"
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

// 더미 키워드 데이터
const keywords = ref([
  { keywordId: 1, keyword: 'AI' },
  { keywordId: 2, keyword: '프론트엔드' },
  { keywordId: 3, keyword: '테스트' },
  { keywordId: 4, keyword: '클라우드' },
]);

onMounted(() => {
  // 더미 데이터만 사용
});

const deleteKeyword = (keywordId) => {
  if (confirm("해당 키워드를 삭제하시겠습니까? (임시)")) {
    keywords.value = keywords.value.filter(keyword => keyword.keywordId !== keywordId);
  }
};

const insertKeyword = () => {
  router.push('/keywordForm');
};
</script>