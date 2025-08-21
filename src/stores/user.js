import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode"; 

export const useUserStore = defineStore("user", {
  state: () => ({
    token: null,
    role: null,
    userId: null,
  }),
  getters: {
    isAdmin: (state) => state.role === "ROLE_ADMIN",
    isLoggedIn: (state) => !!state.userId,
  },
  actions: {
    setToken(token) {
      this.token = token;

      const decoded = jwtDecode(token);
      this.role = decoded.role;
      this.userId = decoded.sub;
    },
    logout() {
      // localStorage.clear();
      this.$reset(); // Pinia 상태 초기화
      localStorage.removeItem("refreshToken");
    },

  },
  persist: {
    storage : localStorage, // Pinia 상태를 localStorage에 저장
    paths: ["token", "role", "userId"],
  },
});
