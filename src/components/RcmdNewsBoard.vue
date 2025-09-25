<template>
  <div class="container-fluid vh-100">
    <div class="row h-100">
      <!-- 사이드바 -->
      <Sidebar />

      <!-- 본문 -->
      <main class="col-md-10 col-lg-10 p-4 content-area">
        <!-- 헤더 -->
        <Header />

        <!-- 뉴스 리스트 -->
        <div v-if="rcmdNews.length === 0">관심 있는 뉴스에 '좋아요'를 눌러보세요. 관심 뉴스를 추천해 드릴 수 있어요.</div>
        <div v-else>
          <h4 class="mb-3">추천 뉴스</h4>
          <div v-for="item in rcmdNews" :key="item.newsId">
            <div class="news-card mb-3 p-3 border rounded d-flex justify-content-between align-items-center" v-if="item.visible || userStore.isAdmin">
              <!-- 뉴스 정보 -->
              <div class="flex-grow-1">
                <template v-if="item.keywords">
                  <span v-for="keyword in item.keywords.split(',')" :key="keyword.trim()" class="keyword-pill badge bg-secondary text-white rounded-pill me-2 px-3 py-1 fw-normal">
                    {{ keyword.trim() }}
                  </span>
                </template>
                <a :href="item.link" target="_blank" rel="noopener noreferrer" class="news-title text-decoration-none fw-bold"> {{ item.title }} </a>
                <div class="news-description mb-1" :class="{ 'text-muted': item.visible === false }"> {{item.description }} </div> 
                <div class="d-flex align-items-center">
                  <div class="news-date text-muted me-3">{{ item.pubDt }}</div>
                  <button @click="toggleLike(item)" class="btn btn-sm" :class="item.liked ? 'btn-primary' : 'btn-outline-primary'">
                    좋아요 {{ item.likeCount }}
                  </button>
                </div>
              </div>
              <!-- 관리자 전용 토글 스위치 -->
              <div v-if="userStore.isAdmin" class="form-check form-switch ms-3">
                <input class="form-check-input" type="checkbox" role="switch" :id="'news-switch-' + item.newsId" :checked="item.visible" @change="toggleVisibility(item)" style="cursor: pointer"/>
                <label class="form-check-label" :for="'news-switch-' + item.newsId">
                  {{ item.visible ? '공개' : '숨김' }}
                </label>
              </div>
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

const rcmdNews = ref([])

// 더미 추천 뉴스 데이터
const dummyRcmdNews = [
  {
    newsId: 11,
    title: '추천 더미 뉴스 1',
    description: '추천 뉴스 더미 설명입니다.',
    link: 'https://example.com/rcmd1',
    pubDt: '2025-09-25',
    keywords: '추천,AI',
    likeCount: 7,
    liked: false,
    visible: true
  },
  {
    newsId: 12,
    title: '추천 더미 뉴스 2',
    description: '두 번째 추천 더미 뉴스 설명입니다.',
    link: 'https://example.com/rcmd2',
    pubDt: '2025-09-24',
    keywords: '추천,테스트',
    likeCount: 3,
    liked: true,
    visible: true
  },
  {
    newsId: 13,
    title: '추천 더미 뉴스 3',
    description: '세 번째 추천 더미 뉴스 설명입니다.',
    link: 'https://example.com/rcmd3',
    pubDt: '2025-09-23',
    keywords: '추천,Vue',
    likeCount: 0,
    liked: false,
    visible: false
  }
];


onMounted(() => {
  fetchRecommendedNews()
})

const fetchRecommendedNews = async () => {
  // 더미 데이터만 사용
  rcmdNews.value = dummyRcmdNews.map(item => ({ ...item }));
}

// 뉴스 좋아요 토글 (더미 데이터에서만 동작)
function toggleLike(newsItem) {
  newsItem.liked = !newsItem.liked;
  if (newsItem.liked) {
    newsItem.likeCount++;
  } else {
    if (newsItem.likeCount > 0) {
      newsItem.likeCount--;
    }
  }
}

// 관리자 토글 (더미 데이터에서만 동작)
function toggleVisibility(newsItem) {
  newsItem.visible = !newsItem.visible;
}
</script>