

<template>
  <nav class="base-header-group">
    <div class="logo">
      <img alt="" src="@/assets/images/blackDUK.png" class="logo-image">
      <span class="logo-text">WebTaCKU</span>
    </div>
    <div id="navbar" class="frame-3" aria-expanded="false">
      <div class="nav_div">
        <router-link class="nav_text" to="/webtoon">웹툰</router-link>
      </div>
      <div class="nav_div">
        <router-link class="nav_text" to="/comm">커뮤니티</router-link>
      </div>
      <div class="nav_div">
        <router-link class="nav_text" to="/chat" >채팅</router-link>
      </div>

      <div v-if="!getIsLogin">
        <div class="nav-button">
          <button class="base-button side-button" onclick="location.href='/user/register'">회원가입</button>
          <button class="base-button" onclick="location.href='/user/login'">로그인</button>
        </div>
      </div>
      <div v-else>
        <div class="nav-button">
          <button class="base-button  side-button" onclick="location.href='/mypage'">마이페이지</button>
          <button class="base-button" @click="logout">로그아웃</button>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup>

</script>
<style scoped>
@import '@/assets/css/header.css';
</style>