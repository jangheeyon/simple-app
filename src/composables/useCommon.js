import { useRouter } from "vue-router"
import { apiRequest } from "@/utils/apiRequest.js"
import { useUserStore } from "@/stores/user"
import { toast } from "vue3-toastify"
import "vue3-toastify/dist/index.css"

export function useCommon() {
  const router = useRouter()
  const userStore = useUserStore()

  // 로그아웃
  async function logout() {
    const accessToken = userStore.token;

    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "로그아웃 실패")
      }

      // 토큰 제거
      userStore.logout()

      toast.success(data.message || "로그아웃 완료", {
        position: "top-center",
        autoClose: 1500,
      })

      setTimeout(() => router.push("/"), 1500)
    } catch (err) {
      console.error("로그아웃 실패:", err)

      userStore.logout()

      toast.error(err.message || "로그아웃 중 오류가 발생했습니다.", {
        position: "top-center",
        autoClose: 1500,
      })

      setTimeout(() => router.push("/"), 1500)
    }
  }

  return {
    router,
    toast,
    apiRequest,
    userStore,
    logout,
  }
}