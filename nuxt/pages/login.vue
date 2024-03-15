<script setup lang="ts">
const form = ref({
  email: "test@example.com",
  password: "password",
});

const auth = useAuthStore();

const handleSubmit = async () => {
  const { error } = auth.login(form.value);
  console.log(error);
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
