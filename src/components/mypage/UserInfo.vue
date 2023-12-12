<template>
  <div>
    <div id="myInfoLayout">
      <div id="userPic"><img src="../../assets/images/blackDUK.png" alt=""></div>
      <div id="currentUser">{{usersNickname}}</div>
      <div id="currentUserEmail">{{ usersEmail }}</div>
      <div class="followerInfo">
        <div class="follow">팔로워
          <div id="follower">{{followerCount}}</div>
        </div>
        <div class="follow"> 팔로잉
          <div id="following">{{followingCount}}</div>
        </div>
      </div>
      <div id="usertext">야옹 야옹 야옹이</div>

      <div id="userInfoChart">
        <div class="infoChartTitle">
          <router-link class="nav_text" :to="{path:`/mypage/rated/${usersId}`}">
          <div>평가</div>
          <div>{{ratedCount}}</div>
          </router-link>
        </div>
        <div class="infoChartTitle">
          <router-link class="nav_text" :to="{path:`/mypage/reviewed/${usersId}`}">
          <div>리뷰</div>
          <div>{{reviewedCount}}</div>
          </router-link>

        </div>

        <div class="infoChartTitle">
          <router-link class="nav_text" :to="{path:`/mypage/interested/${usersId}`}">
          <div>관심웹툰</div>
          <div>{{interestedCount}}</div>
          </router-link>

        </div>
      </div>
      <div @click="goToUpdateUserInfo"  class="col-sm-10">
        <button type="button" class="btn btn-primary btn-block" >내 정보 수정</button>
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
  this.$router.push(`/mypage/updateuserinfo/${usersId}`);
}

let info = reactive(['usersId'])
const profileUrl = ref("");
const usersNickname = ref("");
const ratedCount = ref("");
const reviewedCount = ref("");
const interestedCount = ref("");
const followerCount = ref("");
const followingCount = ref("");
const usersEmail = ref("");

onBeforeMount( () => {
  console.log("start")
  try {
    api(`mypage/userinfo/${usersId}`, "GET", {})
        .then((resp) => {
          console.log(resp.profileUrl)
          info.values=resp;
          profileUrl.value=resp.profileUrl;
          usersNickname.value=resp.usersNickname;
          usersEmail.value=resp.usersEmail;
          reviewedCount.value=resp.reviewedCount;
          ratedCount.value=resp.ratedCount;
          interestedCount.value=resp.interestedCount;
          followerCount.value=resp.followerCount;
          followingCount.value=resp.followingCount;
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