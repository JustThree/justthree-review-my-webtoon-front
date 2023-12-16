<script setup>


import {useRoute} from "vue-router";
import {api, apiToken} from "@/common.js";
import {handleError, ref, watch} from "vue";
import router from "@/router/index.js";
import {useAuthStore} from "@/stores/auth.store.js";
const authStore = useAuthStore()
const route = useRoute();

// 페이징 관련
const pageContents = ref();
const totalPages = ref();
const reviewContent = ref("");
const totalCount = ref();
const queryString =  ref({
  page:0
    }
)


// 페이지네이션
const fetchData = async () => {
  try {
    const response = await api("api/webtoon/reviews/"
        + route.params.masterId
        +"?page=" + (queryString.value.page-1)
        , "GET");
    pageContents.value = response.content;
    totalPages.value = response.totalPages;
    totalCount.value = response.totalElements;

  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
watch(
    () => queryString.value.page,
    (nowPage, lastPage) => {
      fetchData()
    }
)

function submitReview() {
  if (authStore.user) {
      apiToken(
          "api/webtoon/review/" + route.params.masterId,
          "POST",
          {
            "content": reviewContent.value
          }
      ).then(
          (response) => {
            if (response.status === 400){
              alert("값이 유효 하지 않아요")
            } else {
              alert(response);
              router.go(0);
            }
          })
  } else {
    alert("로그인을 먼저 해 주세요!");
  }
}

fetchData()
</script>

<template>
  <v-card
      class="v-col-md-12"
  >
    <router-link :to="'/webtoon/'+ route.params.masterId">
      <v-btn
          style="margin-left: 2%"
          icon="mdi-arrow-left">

      </v-btn>
    </router-link>
    <span

        style="margin: 40%
      ;font-weight: bolder;
      font-size: 2em;
      "
    >
    리뷰
  </span>
    <v-dialog width="1000" height="800px">
      <template v-slot:activator="{ props }">
        <v-btn
            style="margin:0;"
            color="#5302FE"
            v-bind="props"
            v-text="'리뷰 쓰기'"
        ></v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="웹툰 리뷰를 써 주세요!">
          <v-divider></v-divider>

          <v-textarea
              v-model="reviewContent"
              class="p-5"
              bg-color=#F2F2F2
              placeholder="(글자수 500자 이내)"
          >
          </v-textarea>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
                text="Write"
                @click="submitReview"
            ></v-btn>
            <v-btn
                text="Close"
                @click="isActive.value = false"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-card>

  <v-container
      class="align-center"
  >
    <v-row>
      <v-col
        class="offset-8 v-col-4 "
      >
      </v-col>
    </v-row>
    <v-row v-if="totalCount === 0">
      리뷰가 없어요!
    </v-row>
    <div
      v-text=""
    ></div>
    <v-row v-for="(item,idx) in pageContents"
            class="justify-center"
    >

      <v-card
          class="ma-10 justify-center"
          style="background: #F7F2FA"
          width="60%"
          min-height="200px"
      >
        <router-link :to="'/review/'+item.reviewId"
                     style="color:black;text-decoration:none;"
        >
        <v-row
          class="align-center"
        >
          <v-col
          class="v-col-2 m-2"
          >
            <v-img
                class="v"
              :src="item.imgUrl"
              width="40"
              height="40"
            ></v-img>
          </v-col>
          <v-col
              style="color:black"
            v-text="item.userNickName"
          >
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
        <v-col
          class="m-2"
        >
          <div v-text="item.content"
            style="color:black;
            min-height:150px
            "
          >

           </div>
        </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row
            class="m-2"
        >
          <v-col
          class="v-col-1"
          >
            <v-icon
                color="gray "
                size="24"
                icon="mdi-thumb-up"
            ></v-icon>
          </v-col>
          <v-col
              class="v-col-1"
              v-text="item.heartCount"
          >

          </v-col
          >
          <v-col
              class="v-col-1"
          >
            <v-icon
                color="gray "
                size="24"
                icon="mdi-chat-outline"
            ></v-icon>
          </v-col>
          <v-col
              class="v-col-1"
              v-text="item.replyCount"
          >
          </v-col>
        </v-row>

      </router-link>
      </v-card>
    </v-row>
    <v-row>
      <v-pagination
          class="v-row v-md-12"
          v-model="queryString.page"
          :length="totalPages-1"
          total-visible="8"
          active-color=#5302FE
      >
        <!-- totalPages 0부터 시작-->
      </v-pagination>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>