<template>
  <div class="container-fluid vh-100">
    <div class="row h-100">
      <!-- 사이드바 -->
      <Sidebar />

      <!-- 본문 -->
      <main class="col-md-10 col-lg-10 p-4 content-area">
        <!-- 헤더 -->
        <Header />

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

onMounted(() => fetchNews())

const fetchNews = async (keyword = "") => {
  const accessToken = userStore.token;
  if (!accessToken) {
    alert("로그인이 필요합니다.")
    router.push('/')
    return
  }

  try {
    const response = await apiRequest(`/api/news?keyword=${keyword}`, {
      method: 'GET',
      headers: { "Authorization": `Bearer ${accessToken}` }
    })

    if (response.status === 401 || response.status === 403) {
      alert("인증이 필요합니다. 로그인 페이지로 이동합니다.")
      router.push('/')
      return
    }

    if (!response.ok) throw new Error("뉴스 목록 API 호출 실패")

    news.value = await response.json()
  } catch (err) {
    console.error("오류 발생:", err)
  }
}

const onFilter = () => {
  console.log("필터 실행")
}
</script>