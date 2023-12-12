<template>
<!--  <div>-->
<!--    <form>-->
<!--      <div id="myInfoLayout">-->
<!--        <div id="layoutuppercontent">-->
<!--          <div id="userPic"><img src="" alt=""></div>-->
<!--          <div id="upperrightcontent">-->
<!--            <div id="changeimgtxt">프로필 이미지 변경</div>-->
<!--            <v-file-input id="btn_changeprofile" label="프로필 사진 변경" variant="solo-filled"></v-file-input>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="form-group"><label for="nickname">닉네임 변경</label>-->
<!--          <input  type="text" class="form-control" id="nickname" placeholder="변경할 닉네임을 입력해주세요" required>-->
<!--        </div>-->
<!--        -->
<!--        <button id="changeimgbtn" type="submit" onclick="" class="btn btn-primary btn-block">수정완료</button>-->
<!--      </div>-->
<!--    </form>-->
<!--  </div>-->
  <div>
    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="560" rounded="lg">
      <v-avatar size="120" id="profileimg">
        <img src="@/assets/images/blackDUK.png" alt="profileimg" style="width: 100%">
      </v-avatar>
      <v-file-input label="File input" variant="solo-filled"></v-file-input>
      <div class="text-subtitle-1 text-medium-emphasis">닉네임 변경</div>

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
</script>




<style scoped>
@import "@/assets/css/updateuserinfo.css";
</style>