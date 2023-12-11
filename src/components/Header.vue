

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

      <div v-if = "user === null">
        <div class="nav-button">
          <button class="base-button side-button" onclick="location.href='/user/register'">회원가입</button>
          <button class="base-button" onclick="location.href='/user/login'">로그인</button>
        </div>
      </div>
      <div v-if = "user != null">
        <div class="nav-button">
          <button class="base-button  side-button" onclick="location.href='/mypage'">마이페이지</button>
          <button class="base-button" @click="authStore.logout()">로그아웃</button>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup>
import {computed, onMounted, ref, watch} from "vue";
    import { useAuthStore } from '@/stores/auth.store';
    import { storeToRefs } from 'pinia';

    const authStore = useAuthStore()
    const { user } = storeToRefs(authStore);
    const getIsLogin = ref(false);

</script>
<style scoped>
@import '@/assets/css/header.css';
</style>