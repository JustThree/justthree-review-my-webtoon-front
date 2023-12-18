<template>
  <div>
    <div id="myInfoLayout">
      <div id="userPic"><img src="../../assets/images/blackDUK.png" alt=""></div>
      <div id="currentUser">{{usersNickname}}</div>
      <div id="currentUserEmail">{{usersEmail}}</div>
      <div class="followerInfo">
        <router-link :to="{path:`/mypage/follow/${usersId}`}">
        <div class="follow">팔로워
          <div id="follower">{{followerCount}}</div>
        </div>
        </router-link>
        <router-link :to="{path:`/mypage/follow/${usersId}`}">
        <div class="follow">팔로잉
          <div id="following">{{followingCount}}</div>
        </div>
        </router-link>
      </div>

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
      <div v-if="isUser" @click="goToUpdateUserInfo" class="col-sm-10">
        <button type="button" class="btn btn-primary btn-block" >내 정보 수정</button>
      </div>
      <div v-else @click="handleFollowButtonClick(followId)">
        <v-btn variant="text" :class="fav ? 'text-red' : ''" icon="mdi-heart" @click="toggleFav"></v-btn>
      </div>

    </div>
  </div>
</template>
<script setup>
import {api} from '@/common.js'
import {defineProps, onBeforeMount, reactive, ref} from "vue";
import router from "@/router/index.js";
import {useAuthStore} from "@/stores/auth.store.js";
const { user } = useAuthStore()
const fav = ref(true);


const props = defineProps(['usersId']);
let usersId=props.usersId;
const goToUpdateUserInfo = () => {
  router.push(`/mypage/updateuserinfo/${usersId}`);
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
const loginUsersId=ref();
const isUser = ref(user.usersId == usersId);

onBeforeMount( () => {
  console.log("start")
  console.log(user)
  try {
    api(`mypage/userinfo/${usersId}`, "GET", {})
        .then((resp) => {
          console.log(resp)
          info.values=resp;
          profileUrl.value=resp.profileUrl;
          usersNickname.value=resp.usersNickname;
          usersEmail.value=resp.usersEmail;
          reviewedCount.value=resp.reviewedCount;
          ratedCount.value=resp.ratedCount;
          interestedCount.value=resp.interestedCount;
          followerCount.value=resp.followerCount;
          followingCount.value=resp.followingCount;
          fav.value=resp.following
        })
    console.log("API Response:", info);
  } catch (error) {
    console.error("API Error:", error);
  }
});
const handleFollowButtonClick = () => {
  try {
    api(`mypage/follow?followingId=${usersId}&followerId=${user.usersId}`, "POST", {
    }).then((resp) => {
      console.log("Follow button clicked!");
      console.log(resp);
    });
  } catch (error) {
    console.error("API Error:", error);
  }
};
const toggleFav = () => {
  fav.value = !fav.value;
};
</script>
<style scoped>
@import "@/assets/css/mypage.css";
</style>