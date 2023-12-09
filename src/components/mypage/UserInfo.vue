<template>
  <div>
    <div id="myInfoLayout">
      <div id="userPic"><img src="../../assets/images/blackDUK.png" alt=""></div>
      <div id="currentUser">현덕냥</div>
      <div id="currentUserEmail">cat@naver.com</div>
      <div class="followerInfo">
        <div class="follow">팔로워
          <div id="follower">0</div>
        </div>
        <div class="follow">  팔로잉
          <div id="following">3</div>
        </div>
      </div>
      <div id="usertext">야옹 야옹 야옹이</div>

      <div id="userInfoChart">
        <div class="infoChartTitle">
          <router-link class="nav_text" :to="{path:`/mypage/rated`}">
          <div>평가</div>
          <div>1</div>
          </router-link>
        </div>
        <div class="infoChartTitle">
          <router-link class="nav_text" :to="{path:`/mypage/reviewd`}">
          <div>리뷰</div>
          <div>2</div>
          </router-link>

        </div>

        <div class="infoChartTitle">
          <router-link class="nav_text" :to="{path:`/mypage/interested`}">
          <div>관심웹툰</div>
          <div>3</div>
          </router-link>

        </div>
      </div>
      <div @click="goToUpdateUserInfo"  class="col-sm-10">
        <button type="button" class="btn btn-primary btn-block">내 정보 수정</button>
      </div>

    </div>
  </div>
</template>
<script setup>
import {api} from '@/common.js'
import {defineProps, onBeforeMount, reactive, ref} from "vue";

const props = defineProps(['usersId']);
let usersId=props.usersId;
const goToUpdateUserInfo = () => {
  this.$router.push('/mypage/userinfo/updateuserinfo');
}

let info = reactive(['usersId'])
const profileUrl = ref("");
const usersNickname = ref("");
const ratedCount = ref("");
const reviewedCount = ref("");
const interestedCount = ref("");
const followerCount = ref("");
const followingCount = ref("");

onBeforeMount( () => {
  console.log("start")
  try {
    api(`mypage/userinfo/${usersId}`, "GET", {})
        .then((resp) => {
          console.log(resp)
          info.values=resp;
        })
    console.log("API Response:", info);
  } catch (error) {
    console.error("API Error:", error);
  }
});

</script>
<style scoped>
@import "@/assets/css/mypage.css";

</style>