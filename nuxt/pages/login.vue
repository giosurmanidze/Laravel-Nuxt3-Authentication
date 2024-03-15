<script setup lang="ts">

const form = ref({
  email: "test@example.com",
  password: "password",
});

const handleSubmit = async () => {
  await useApiFetch("/sanctum/csrf-cookie");

  await useApiFetch("/login", {
    method: "POST",
    body: form.value,
  });

  const { data } = await useApiFetch("/api/user");

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
