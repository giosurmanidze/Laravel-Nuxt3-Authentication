import { useAuthStore } from "@/stores/useAuthStore";

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();

  if (!auth.isLoggedIn) {
    return navigateTo("/login", { replace: true });
  }

  if (to.path === "/login") {
    return navigateTo("/auth-only");
  }
});
