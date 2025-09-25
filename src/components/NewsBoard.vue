<template>
  <div class="container-fluid vh-100">
    <div class="row h-100">
      <!-- 사이드바 -->
      <Sidebar />

      <!-- 본문 -->
      <main class="col-md-10 col-lg-10 p-4 content-area">
        <!-- 헤더 -->
        <Header />

        <!-- 검색창 -->
        <div class="d-flex justify-content-start mb-3 gap-2">
          <input type="text" class="form-control" style="width: 300px" placeholder="검색" v-model="searchQuery" @keyup.enter="searchNews" />
          <button class="btn btn-outline-secondary" @click="searchNews">검색</button>
        </div>

        <!-- 뉴스 리스트 -->
        <div v-if="news.length === 0">뉴스 정보가 없습니다.</div>
        <div v-else>
          <div v-for="item in news" :key="item.newsId">
            <div class="news-card mb-3 p-3 border rounded d-flex justify-content-between align-items-center" v-if="item.visible || userStore.isAdmin">
              <!-- 뉴스 정보 -->
              <div class="flex-grow-1">
                <template v-if="item.keywords">
                  <span v-for="keyword in item.keywords.split(',')" :key="keyword.trim()" class="keyword-pill badge bg-secondary text-white rounded-pill me-2 px-3 py-1 fw-normal">
                    {{ keyword.trim() }}
                  </span>
                </template>
                <a :href="item.link" target="_blank" @click="countView(item)" rel="noopener noreferrer" class="news-title text-decoration-none fw-bold"> {{ item.title }} </a>
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
        <!-- 관련 뉴스 섹션 -->
        <div v-if="similarNews.length > 0">
          <hr class="my-4"/>
          <h4 class="mb-3">관련 뉴스</h4>
          <div v-for="item in similarNews" :key="item.newsId">
            <div class="news-card similar-news-card mb-3 p-3 border rounded d-flex justify-content-between align-items-center">
              <div class="flex-grow-1">
                <template v-if="item.keywords">
                  <span v-for="keyword in item.keywords.split(',')" :key="keyword.trim()" class="keyword-pill badge bg-secondary text-white rounded-pill me-2 px-3 py-1 fw-normal">
                    {{ keyword.trim() }}
                  </span>
                </template>
                <a :href="item.link" target="_blank" rel="noopener noreferrer" class="news-title text-decoration-none fw-bold"> {{ item.title }} </a>
                <div class="news-description mb-1"> {{item.description }} </div> 
                <div class="d-flex align-items-center">
                  <div class="news-date text-muted me-3">{{ item.pubDt }}</div>
                  <button @click="toggleLike(item)" class="btn btn-sm" :class="item.liked ? 'btn-primary' : 'btn-outline-primary'">
                    좋아요 {{ item.likeCount }}
                  </button>
                </div>
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
const news = ref([])
const similarNews = ref([]);
const searchQuery = ref("")


// 더미 뉴스 데이터
const dummyNews = [
  {
    newsId: 1,
    title: '더미 뉴스 제목 1',
    description: '이것은 더미 뉴스 설명입니다.',
    link: 'https://example.com/news1',
    pubDt: '2025-09-25',
    keywords: 'AI,테스트',
    likeCount: 3,
    liked: false,
    visible: true
  },
  {
    newsId: 2,
    title: '더미 뉴스 제목 2',
    description: '두 번째 더미 뉴스 설명입니다.',
    link: 'https://example.com/news2',
    pubDt: '2025-09-24',
    keywords: 'Vue,프론트엔드',
    likeCount: 1,
    liked: true,
    visible: true
  },
  {
    newsId: 3,
    title: '더미 뉴스 제목 3',
    description: '세 번째 더미 뉴스 설명입니다.',
    link: 'https://example.com/news3',
    pubDt: '2025-09-23',
    keywords: '뉴스,테스트',
    likeCount: 0,
    liked: false,
    visible: false
  }
];

// 더미 유사 뉴스 데이터
const dummySimilarNews = [
  {
    newsId: 101,
    title: '유사 뉴스 제목 A',
    description: '이것은 유사 뉴스 설명입니다.',
    link: 'https://example.com/similar1',
    pubDt: '2025-09-25',
    keywords: 'AI,추천',
    likeCount: 2,
    liked: false,
    visible: true
  },
  {
    newsId: 102,
    title: '유사 뉴스 제목 B',
    description: '두 번째 유사 뉴스 설명입니다.',
    link: 'https://example.com/similar2',
    pubDt: '2025-09-24',
    keywords: '테스트,추천',
    likeCount: 0,
    liked: false,
    visible: true
  }
];

onMounted(() => fetchNews())

const fetchNews = async (keyword = "") => {
  // 더미 데이터만 사용
  if (!keyword) {
    news.value = dummyNews.map(item => ({ ...item }));
  } else {
    news.value = dummyNews.filter(item =>
      item.title.includes(keyword) ||
      item.description.includes(keyword) ||
      (item.keywords && item.keywords.includes(keyword))
    ).map(item => ({ ...item }));
  }
  // 유사 뉴스도 항상 더미로 표출
  similarNews.value = dummySimilarNews.map(item => ({ ...item }));
}

const searchNews = async () => {
  // 검색어가 없으면 전체 더미 뉴스, 있으면 필터링
  if (!searchQuery.value.trim()) {
  fetchNews();
  return;
  }
  news.value = dummyNews.filter(item =>
  item.title.includes(searchQuery.value) ||
  item.description.includes(searchQuery.value) ||
  (item.keywords && item.keywords.includes(searchQuery.value))
  ).map(item => ({ ...item }));
  // 유사 뉴스도 항상 더미로 표출
  similarNews.value = dummySimilarNews.map(item => ({ ...item }));
};

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

// 뉴스 조회수 카운트 (임시: 아무 동작 없음)
function countView(newsItem) {
  // 퍼블리셔용: 조회수 처리 없음
}
</script>