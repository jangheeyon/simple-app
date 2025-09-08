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

onMounted(() => {
  fetchRecommendedNews()
})

const fetchRecommendedNews = async () => {
  const accessToken = userStore.token;
  if (!accessToken) {
    alert("로그인이 필요합니다.")
    router.push('/')
    return
  }

  try {
    const response = await apiRequest(`/api/news/recommend`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    if (response.status === 401 || response.status === 403) {
      alert("인증이 필요합니다. 로그인 페이지로 이동합니다.")
      router.push('/')
      return
    }

    if (!response.ok) throw new Error('추천 뉴스 목록 API 호출 실패')

    const newsData = await response.json();
    rcmdNews.value = newsData.map(item => ({
      ...item,
      likeCount: item.likeCount || 0,
      isLiked: item.liked || false,
    }));

  } catch (err) {
    console.error('오류 발생:', err)
    alert(err.message || '추천 뉴스 목록을 가져오는 중 오류가 발생했습니다.')
  }
}

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
</script>