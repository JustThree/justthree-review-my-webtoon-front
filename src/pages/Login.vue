<script setup>

</script>

<template>
  <form method="post" action="http://localhost:8089/api/login">
    <input type="text" width="100px" name="usersEamil" placeholder="아이디">
    <input type="password" width="100px" name="usersPw" placeholder="비밀번호">
    <button type="submit">로그인</button>
  </form>
</template>

<style scoped>

</style>