import { useAuthStore } from "@/stores/useAuthStore";

export default defineNuxtPlugin(async (nuxtapp) => {
  const auth = useAuthStore();

  if (!auth.isLoggedIn) {
    await auth.fetchUser();
  }
});
