<template>
  <div class="container-fluid vh-100">
    <div class="row h-100">
      <!-- 사이드바 -->
      <Sidebar />

      <!-- 본문 -->
      <main class="col-md-10 col-lg-10 p-4 content-area">
        <!-- 헤더 -->
        <Header />

        <h1 class="h3 mb-3">통계 및 분석 대시보드</h1>

        <div class="row">
          <div class="col-md-6">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title">가장 많이 추천된 뉴스</h5>
              </div>
              <div class="card-body">
                <table class="table">
                  <thead>
                    <tr>
                      <th>제목</th>
                      <th>추천 수</th>
                      <th>조회 수</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="news in topLikedNews" :key="news.newsId">
                      <td>
                        <a :href="news.link" target="_blank" rel="noopener noreferrer">{{ news.title }}</a>
                      </td>
                      <td>{{ news.likeCount }}</td>
                      <td>{{ news.viewCount }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title">가장 많이 조회된 뉴스</h5>
              </div>
              <div class="card-body">
                <table class="table">
                  <thead>
                    <tr>
                      <th>제목</th>
                      <th>추천 수</th>
                      <th>조회 수</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="news in topViewedNews" :key="news.newsId">
                      <td>
                        <a :href="news.link" target="_blank" rel="noopener noreferrer">{{ news.title }}</a>
                      </td>
                      <td>{{ news.likeCount }}</td>
                      <td>{{ news.viewCount }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title">키워드별 좋아요 수</h5>
              </div>
              <div class="card-body">
                <table class="table">
                  <thead>
                    <tr>
                      <th>키워드</th>
                      <th>좋아요 수</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="keyword in totalLikesByKeyword" :key="keyword.keyword">
                      <td>{{ keyword.keyword }}</td>
                      <td>{{ keyword.totalLikes }}</td>
                    </tr>
                  </tbody>
                </table>
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
import { apiRequestJson } from "@/utils/apiRequest"

const { userStore, router } = useCommon()

const topLikedNews = ref([])
const topViewedNews = ref([])
const totalLikesByKeyword = ref([])

const fetchStatistics = async () => {
  try {
    topLikedNews.value = await apiRequestJson("/api/admin/statistics/topLiked")
    topViewedNews.value = await apiRequestJson("/api/admin/statistics/topViewed")
    totalLikesByKeyword.value = await apiRequestJson("/api/admin/statistics/totalLikesByKeyword")
  } catch (error) {
    console.error("Error fetching statistics:", error)
  }
}

onMounted(() => {
  fetchStatistics()
})
</script>