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

      <v-file-input label="File input" v-model="selectedFile" @change="handleFileChange" variant="solo-filled"></v-file-input>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">닉네임 변경</div>
    <div style="display: flex">
      <v-text-field v-model="newNickname"
          density="compact"
          placeholder="변경할 닉네임을 입력하세요"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
      ></v-text-field>
      <v-btn
          class="vaildateBtn basicBtnColor"
          @click="checkNickname"
      >
        중복확인
      </v-btn>
      <span id="nicknameMsg">{{ nicknameAvailabilityMsg }}</span>
    </div>

      <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="updateUserInfo">회원정보 수정</v-btn>
    </v-card>
  </div>
</template>



<script setup>
import axios from "axios";
import {onMounted, ref} from "vue";
import {api} from "@/common.js";

const userProfileImageUrl = "@/assets/images/blackDUK.png";
const selectedFile = ref(null);
const newNickname = ref("");
const nicknameAvailabilityMsg = ref("");

const goBack = () => {
  window.history.back();
};
//////////////////////////////////////////////////////////////
const checkNickname=()=>{
  api(`api/check-nickname?nickname=${newNickname.value}`,"GET",{
  }).then((resp)=>{
    console.log(resp)
    nicknameAvailabilityMsg.value = "사용 가능한 닉네임입니다."
  }).catch((error) => {
    console.log(error)
    nicknameAvailabilityMsg.value = "중복된 닉네임입니다."
  })
}

const updateUserInfo = () => {
  const formData = new FormData();
  formData.append("file", selectedFile.value);
  formData.append("newNickname", newNickname.value);
  axios.put("/update", formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
};



</script>
<style scoped>
@import "@/assets/css/updateuserinfo.css";
</style>