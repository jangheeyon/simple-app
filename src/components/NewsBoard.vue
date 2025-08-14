<template>
  <div class="container-fluid vh-100">
    <div class="row h-100">
      <!-- 사이드바 -->
      <Sidebar />

      <!-- 본문 -->
      <main class="col-md-10 col-lg-10 p-4 content-area">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h2>최신 뉴스</h2>
          <div>
            <input type="text" class="form-control d-inline-block me-2" style="width:200px;" placeholder="검색">
            <button class="btn btn-outline-secondary">필터</button>
          </div>
        </div>

        <!-- 뉴스 리스트 -->
        <div v-if="news.length === 0">뉴스 정보가 없습니다.</div>

        <div v-for="item in news" :key="item.id || item.title" class="news-card mb-3 p-3 border rounded">
          <div class="d-flex align-items-center mb-1">
            <span class="badge bg-light text-dark border me-2">버그 수정</span>
            <a :href="item.link" target="_blank" rel="noopener noreferrer" class="news-title">{{ item.title }}</a>
          </div>
          <div class="news-description mb-1">{{ item.description }}</div>
          <div class="news-date text-muted">{{ item.pubDt }}</div>
        </div>

      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { apiRequest } from '@/utils/apiRequest.js';
import Sidebar from '@/components/Sidebar.vue';

const router = useRouter();
const news = ref([]);

const fetchNews = async () => {
//   const accessToken = localStorage.getItem("accessToken");
//   if (!accessToken) {
//     alert("로그인이 필요합니다.");
//     router.push('/');
//     return;
//   }

  try {
    const response = await apiRequest('/api/news', {
      method: 'GET',
    //   headers: {
    //     "Authorization": `Bearer ${accessToken}`
    //   }
    });

    // if (response.status === 401 || response.status === 403) {
    //   alert("인증이 필요합니다. 로그인 페이지로 이동합니다.");
    //   router.push('/');
    //   return;
    // }
    if (!response.ok) {
      throw new Error("뉴스 목록 API 호출 실패");
    }

    const data = await response.json();
    news.value = data;
  } catch (error) {
    console.error("오류 발생:", error);
  }
};

onMounted(() => {
  fetchNews();
});

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

.content-area {
  margin-left: 16.6667%;
}

.news-card {
  background-color: #fff;
}

.news-title {
  font-weight: 600;
  text-decoration: none;
  color: #333;
}

.news-title:hover {
  text-decoration: underline;
}

.news-description {
  color: #555;
}

.news-date {
  font-size: 0.85rem;
}
</style>