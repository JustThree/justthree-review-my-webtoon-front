<template>
  <div class="text-center">
    <hr class="line">
    <div id="btn_back_line">
      <v-btn class="ma-2" color="purple-lighten-2" @click="goBack">
        <v-icon start icon="mdi-arrow-left"></v-icon>뒤로가기</v-btn>
      <div id="pagetitle">내 정보 수정</div>
    </div>
    <hr class="line">
  </div>

  <div>
    <v-card id="updateUserInfoForm_layout" class="mx-auto pa-12 pb-8" elevation="8" max-width="560" rounded="lg" style="text-align: center">
      <v-avatar size="120" id="profileimg">
        <img src="@/assets/images/blackDUK.png" alt="profileimg" style="width: 100%">
      </v-avatar>

      <v-file-input label="File input" variant="solo-filled"></v-file-input>
      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">닉네임 변경</div>

      <v-text-field
          density="compact"
          placeholder="변경할 닉네임을 입력하세요"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        비밀번호 변경
      </div>
      <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="새로운 비밀번호를 입력하세요"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
      ></v-text-field>


      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        비밀번호 확인
      </div>
      <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="새로운 비밀번호를 확인하세요"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-btn block class="mb-8" color="blue" size="large" variant="tonal">
        회원정보 수정
      </v-btn>
    </v-card>
  </div>
</template>



<script setup>


const goBack = () => {
  window.history.back();
};
</script>




<style scoped>
@import "@/assets/css/updateuserinfo.css";
</style>