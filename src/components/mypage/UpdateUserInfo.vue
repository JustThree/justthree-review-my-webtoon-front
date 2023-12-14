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
    <div style="display: flex">
      <v-text-field
          density="compact"
          placeholder="변경할 닉네임을 입력하세요"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
      ></v-text-field>
      <v-btn
          class="vaildateBtn basicBtnColor"
          @click="nicknameButton"
      >
        중복확인
      </v-btn>
<!--      <span id="nicknameMsg" class=""></span>-->
    </div>

      <v-btn block class="mb-8" color="blue" size="large" variant="tonal">회원정보 수정</v-btn>
    </v-card>
  </div>
</template>



<script setup>
import axios from "axios";
const checkNickNameUrl = import.meta.env.VITE_SERVER_URL + import.meta.env.VITE_CHECK_NICKNAME_API_PATH;


const goBack = () => {
  window.history.back();
};
//////////////////////////////////////////////////////////////
function checkAlg(msg, value){
  if (isEmptyString(value)){
    msg.innerText = "값을 입력해주세요";
    return true;
  } else if (isSpaceCharacter(value)){
    msg.innerText = "공백은 입력할 수 없습니다";
    return true;
  } else {
    return false;
  }
}
const nicknameButton = async () => {
  if (!checkAlg(nicknameMsg, vars.value.usersNickname)) {
    let nicknameCheck = checkNickNameUrl + "?nickname=" + vars.value.usersNickname
    await axios.get(nicknameCheck)
        .then((res) => {
          nicknameMsg.innerText = "사용 가능한 닉네임입니다"
          check.value.nickCheck = true;
        })
        .catch((err) => {
          check.value.nickCheck = false;
          nicknameMsg.innerText = err.response.data;
        });
  }
}





</script>
<style scoped>
@import "@/assets/css/updateuserinfo.css";
</style>