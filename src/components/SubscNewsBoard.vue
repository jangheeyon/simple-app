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

onMounted(() => fetchNews())

const fetchNews = async (keyword = "") => {
  const accessToken = userStore.token;
  if (!accessToken) {
    alert("로그인이 필요합니다.")
    router.push('/')
    return
  }

  try {
    const response = await apiRequest('/api/news/subscribe', {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    if (response.status === 401 || response.status === 403) {
      alert("인증이 필요합니다. 로그인 페이지로 이동합니다.")
      router.push('/')
      return
    }

    if (!response.ok) throw new Error('뉴스 목록 API 호출 실패')

    const newsData = await response.json();
        news.value = newsData.map(item => ({
      ...item,
      likeCount: item.likeCount || 0,
      isLiked: item.liked || false,
    }));

  } catch (err) {
    console.error('오류 발생:', err)
    alert(err.message || '뉴스 목록을 가져오는 중 오류가 발생했습니다.')
  }
}

const searchNews = async () => {
    const accessToken = userStore.token;
    if (!accessToken) {
        alert("로그인이 필요합니다.");
        router.push('/');
        return;
    }

    if (!searchQuery.value.trim()) {
        fetchNews();
        similarNews.value = [];
        return;
    }

    //뉴스 초기화
    news.value = [];
    similarNews.value = [];

    try {
        // 뉴스 검색
        const response = await apiRequest(`/api/news/search?q=${encodeURIComponent(searchQuery.value)}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.status === 401 || response.status === 403) {
            alert("인증이 필요합니다. 로그인 페이지로 이동합니다.");
            router.push('/');
            return;
        }

        if (!response.ok) {
            throw new Error('뉴스 검색 API 호출 실패');
        }

        const searchData = await response.json();
        news.value = searchData.map(item => ({
            ...item,
            likeCount: item.likeCount || 0,
            isLiked: item.liked || false,
        }));
        
        // 유사 뉴스 검색
        if (news.value.length > 0) {
            const firstNewsId = news.value[0].newsId; // 첫 번째 뉴스 ID 추출

            const similarNewsResponse = await apiRequest(`/api/news/${firstNewsId}/similar`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            if (similarNewsResponse.ok) {
                const similarNewsData = await similarNewsResponse.json();
                similarNews.value = similarNewsData.map(item => ({
                    ...item,
                    likeCount: item.likeCount || 0,
                    isLiked: item.liked || false,
                }));
            } else {
                console.error('유사 뉴스 API 호출 실패');
                similarNews.value = [];
            }
        }

    } catch (err) {
        console.error('오류 발생:', err);
        alert(err.message || '뉴스 검색 중 오류가 발생했습니다.');
        news.value = [];
        similarNews.value = [];
    } 
};

// 뉴스 좋아요 토글
async function toggleLike(newsItem) {
  try {
    const response = await apiRequest(`/api/news/${newsItem.newsId}/like`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('좋아요 처리 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    newsItem.liked = result.liked;
    
    if (result.liked) {
      newsItem.likeCount++;
    } else {
      if (newsItem.likeCount > 0) {
        newsItem.likeCount--;
      }
    }

  } catch (error) {
    console.error('좋아요 처리 실패:', error);
    alert(error.message || '좋아요 처리에 실패했습니다.');
  }
}

//관리자 토글
async function toggleVisibility(newsItem) {
  const originalVisible = newsItem.visible
  newsItem.visible = !newsItem.visible

  try {
    const accessToken = userStore.token
    if (!accessToken) {
      alert('인증이 만료되었습니다. 다시 로그인해주세요.')
      newsItem.visible = originalVisible
      router.push('/')
      return
    }

    const response = await apiRequest(`/api/admin/news/${newsItem.newsId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ visible: newsItem.visible }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(errorText || '뉴스 상태 변경에 실패했습니다.')
    }
  } catch (error) {
    // 실패 시 롤백
    newsItem.visible = originalVisible
    console.error('뉴스 상태 변경 중 오류 발생:', error)
    alert('오류: ' + error.message)
  }
}

// 뉴스 조회수 카운트
async function countView(newsItem) {
  try {
    const
      response = await apiRequest(`/api/news/${newsItem.newsId}/view`, {
      method: 'POST',
    })
    if (!response.ok) {
      throw new Error('조회수 처리 중 오류가 발생했습니다.')
    }
  } catch (error) {
    console.error('조회수 처리 실패:', error)
  }
}
</script>