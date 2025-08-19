import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

export const useUserStore = defineStore("user", {
  state: () => ({
    role: null,
    userId: null,
  }),
  getters: {
    isAdmin: (state) => state.role === "ADMIN",
    isLoggedIn: (state) => !!state.userId,
  },
  actions: {
    setToken(token) {
      localStorage.setItem("accessToken", token);
      const decoded = jwtDecode(token);
      this.role = decoded.role;
      this.userId = decoded.sub;
      console.log("Store role:", this.role);
      console.log("Store userId:", this.userId);
    },
    logout() {
      localStorage.clear();
      this.role = null;
      this.userId = null;
    }
  }
});