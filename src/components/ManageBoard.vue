<template>
  <div class="container-fluid vh-100">
    <div class="row h-100">
      <Sidebar />
      <main class="col-md-10 col-lg-10 p-4 content-area">
        <Header />
        <h1 class="h3 mb-3">통계 및 분석 대시보드</h1>    
        <div class="row mb-4">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title">키워드별 좋아요 수</h5>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6">
                    <Doughnut :data="chartData" :options="chartOptions" />
                  </div>
                  <div class="col-md-6">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>순위</th>
                          <th>키워드</th>
                          <th>좋아요 수</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(keyword, index) in totalLikesByKeyword" :key="keyword.keyword">
                          <td>{{ index + 1 }}</td>
                          <td>{{ keyword.keyword }}</td>
                          <td>{{ keyword.totalLikes }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                      <th>순위</th>
                      <th>제목</th>
                      <th>추천 수</th>
                      <th>조회 수</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(news, index) in topLikedNews" :key="news.newsId">
                      <td>{{ index + 1 }}</td>
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
                      <th>순위</th>
                      <th>제목</th>
                      <th>추천 수</th>
                      <th>조회 수</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(news, index) in topViewedNews" :key="news.newsId">
                      <td>{{ index + 1 }}</td>
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
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import Header from "@/components/Header.vue"
import Sidebar from "@/components/Sidebar.vue"
import { useCommon } from "@/composables/useCommon"
import { apiRequestJson } from "@/utils/apiRequest"
import { Doughnut } from "vue-chartjs"
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from "chart.js"

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

const { userStore, router } = useCommon()

const topLikedNews = ref([])
const topViewedNews = ref([])
const totalLikesByKeyword = ref([])

const chartData = computed(() => ({
  labels: totalLikesByKeyword.value.map((item) => item.keyword),
  datasets: [
    {
      backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16", "#FFC107", "#607D8B"],
      data: totalLikesByKeyword.value.map((item) => item.totalLikes),
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
}

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