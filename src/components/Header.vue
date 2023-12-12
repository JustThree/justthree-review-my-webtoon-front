<template>
  <v-card>
    <v-toolbar class="w-75 mx-auto" color="white" height="80">

      <img alt="logo" src="@/assets/images/blackDUK.png" @click="$router.push('/')">

      <v-toolbar-title class="ml-2">
        <v-btn href="/webtoon"> 웹툰 </v-btn>
        <v-btn herf="/board"> 커뮤니티 </v-btn>
        <v-btn href="/chatlist"> 채팅 </v-btn>
      </v-toolbar-title >

      <v-toolbar-items class="w-25">
        <v-card-text class="mt-1">
          <v-text-field
              :loading = "loading"
              density="compact"
              variant="outlined"
              label="Search templates"
              append-inner-icon="mdi-magnify"
              single-line
              hide-details
              @click:append-inner="onClick"
          ></v-text-field>
        </v-card-text>
        <v-btn href="/login">
          로그인
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-card>

</template>
<script setup>
import {ref} from "vue";
import {api} from "@/common.js";
const loading = ref(false);
const onClick = () => {
  // 검색 중 로딩 표시
  loading.value = true;

  // 웹툰 검색
  // api("/webtoon/search", "GET", {})
  //     .then((resp) => {
  //       // 검색이 끝나면 로딩표시 해제
  //       loading.value = false
  //     })
}


</script>
<style scoped>
@font-face {
  font-family: 'Pretendard-Regular';
  src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
}

*{
  font-family: 'Pretendard-Regular';
}
</style>