import { defineStore } from "pinia";

type User = {
  id: number;
  name: string;
  email: string;
};

type Credentials = {
  email: string;
  password: string;
};

type RegistrationInfo = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export const useAuthStore = defineStore("useAuthStore", () => {
  const user = ref<User | null>(null);

  const isLoggedIn = computed(() => !!user.value);

  const fetchUser = async () => {
    const { data, error } = await useApiFetch("/api/user");
    user.value = data.value as User;
  };

  const login = async (credentials: Credentials) => {
    await useApiFetch("/sanctum/csrf-cookie");

    const login = await useApiFetch("/login", {
      method: "POST",
      body: credentials,
    });

    await fetchUser();

    return login;
  };

  const register = async (info: RegistrationInfo) => {
    await useApiFetch("/sanctum/csrf-cookie");

    const register = await useApiFetch("/register", {
      method: "POST",
      body: info,
    });

    await fetchUser();

    return register;
  };

  const logout = async () => {
    await useApiFetch("/logout", { method: "POST" });
    user.value = null;
    navigateTo("/login");
  };

  return { user, login, isLoggedIn, fetchUser, logout, register };
});
