<script setup lang="ts">
const form = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const auth = useAuthStore();

const handleSubmit = async () => {
  const { error } = auth.register(form.value);
  if(!error.value) {
    navigateTo("/")
  }
  console.log(error);
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <label>
      Name:
      <input type="text" name="name" v-model="form.name" />
    </label>
    <label>
      Email:
      <input type="text" name="email" v-model="form.email" />
    </label>
    <label>
      Password:
      <input type="password" name="password" v-model="form.password" />
    </label>
    <label>
      Password confirmation:
      <input
        type="password_confirmation"
        name="password_confirmation"
        v-model="form.password_confirmation"
      />
    </label>
    <button type="submit">Sign up</button>
  </form>
</template>

<style scoped>
input {
  background-color: gray;
}
</style>
