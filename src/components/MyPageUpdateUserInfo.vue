<template>
  <div>
    <form>
      <div id="myInfoLayout">
        <div id="layoutuppercontent">
          <div id="userPic"><img src="" alt=""></div>
          <div id="upperrightcontent">
            <div id="changeimgtxt">프로필 이미지 변경</div>
            <button id="changeimgbtn" type="button" onclick="" class="btn btn-primary btn-block">사진 선택...</button>
          </div>
        </div>
        <div class="form-group"><label for="nickname">닉네임 변경</label>
          <input  type="text" class="form-control" id="nickname" placeholder="변경할 닉네임을 입력해주세요" required>
        </div>
        <div class="form-group"><label for="email">이메일 변경</label>
          <input  type="text" class="form-control" id="email" placeholder="변경할 이메일을 입력해주세요" required>
        </div>
        <button id="changeimgbtn" type="submit" onclick="" class="btn btn-primary btn-block">수정완료</button>
      </div>
    </form>
  </div>
</template>



<script setup>
</script>
<style scoped>
@import "@/assets/css/updateuserinfo.css";
</style>