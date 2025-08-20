import { defineStore } from "pinia";
import * as jwtDecodePkg from "jwt-decode";

export const useUserStore = defineStore("user", {
  state: () => ({
    role: null,
    userId: null,
  }),
  getters: {
    isAdmin: (state) => state.role === "ROLE_ADMIN",
    isLoggedIn: (state) => !!state.userId,
  },
  actions: {
    setToken(token) {
      console.log("setToken 호출됨");

      const decoded = jwtDecode(token); // 이제 오류 없이 동작
      console.log("디코딩 결과:", decoded);

      this.role = decoded.role;
      this.userId = decoded.sub;

      console.log("Store role after setToken:", this.role);
      console.log("Store userId after setToken:", this.userId);
    },
    logout() {
      localStorage.clear();
      this.role = null;
      this.userId = null;
    },
  },
});
