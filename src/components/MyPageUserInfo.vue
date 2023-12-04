<template>
  <div>
    <div id="myInfoLayout">
      <div id="userPic"><img src="" alt=""></div>
      <div id="currentUser">현덕냥</div>
      <div id="currentUserEmail">cat@naver.com</div>
      <div id="followerInfo">
        <div class="follow">팔로워  0 </div><div class="follow">팔로잉  3</div>
      </div>
      <div id="usertext">야옹 야옹 야옹이</div>

      <div id="userInfoChart">
        <div class="infoChartTitle">
          <div>평가</div>
          <div>1</div>
        </div>
        <div class="infoChartTitle">
          <div>리뷰</div>
          <div>2</div>
        </div>

        <div class="infoChartTitle">
          <div>관심웹툰</div>
          <div>3</div>
        </div>
      </div>
      <div class="col-sm-10">
        <button type="submit" router-link to="/userinfo/updateuserinfo" class="btn btn-primary btn-block">내 정보 수정</button>
      </div>

    </div>
  </div>
</template>
<style scoped>
@import "@/assets/css/mypage.css";
</style>