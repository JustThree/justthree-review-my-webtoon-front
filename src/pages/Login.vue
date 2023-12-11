<script setup>
    import {useAuthStore} from "@/stores/auth.store.js";
    import {ref} from "vue";

    const email = ref('')
    const password = ref('')
    const authStore = useAuthStore()
    function submit() { authStore.login(email.value, password.value); }
</script>

<template>
    <div>
      <input type="text" v-model="email" width="100px" name="usersEmail" placeholder="아이디" autofocus="autofocus">
      <input type="password" v-model="password" width="100px" name="usersPw" placeholder="비밀번호">
      <button @click="submit">로그인</button>
    </div>
</template>

<style scoped>

</style>