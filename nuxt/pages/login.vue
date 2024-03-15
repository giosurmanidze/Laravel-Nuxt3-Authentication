<script setup lang="ts">
const form = ref({
  email: "test@example.com",
  password: "password",
});

const handleSubmit = async () => {
  await useFetch("http://localhost:8000/sanctum/csrf-cookie", {
    credentials: "include",
  });

  const token = useCookie("XSRF-TOKEN");

  await useFetch("http://localhost:8000/login", {
    credentials: "include",
    method: "POST",
    body: form.value,
    watch: false,
    headers: {
      "X-XSRF-TOKEN": token.value as string,
    },
  });

  const { data } = await useFetch("http://localhost:8000/api/user", {
    credentials: "include",
    watch: false,
    headers: {
      "X-XSRF-TOKEN": token.value as string,
    },
  });

  console.log(data);
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <label>
      Email:
      <input type="text" name="email" v-model="form.email" />
    </label>
    <label>
      Password:
      <input type="password" name="password" v-model="form.password" />
    </label>
    <button type="submit">Login</button>
  </form>
</template>

<style scoped>
input {
  background-color: gray;
}
</style>
