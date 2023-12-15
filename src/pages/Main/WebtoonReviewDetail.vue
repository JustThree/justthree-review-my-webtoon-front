<script setup>

import {api, apiToken} from "@/common.js";
import {copyText} from 'vue3-clipboard'
import {useRoute} from "vue-router";
import {ref, watch} from "vue";
import router from "@/router/index.js";
import {useAuthStore} from "@/stores/auth.store.js";

const authStore = useAuthStore()
const route = useRoute();
const reviewData = ref([]);
const reviewPageContents = ref();
const reviewTotalPages = ref();
const reviewTotalCount = ref();
const reviewReplyComment = ref([])
// api query String 정의

const reviewQueryString = ref({
      page: 0
    }
)




// 리뷰 데이터 한번 불러옴
api("api/webtoon/review/" + route.params.reviewId,
    "GET",
).then((response) => {
      reviewData.value = response;
      console.log(reviewData)
    }
);

// 갑이 바끼면 변경
watch(
    () => reviewQueryString.value.page,
    (nowPage, lastPage) => {
      fetchData()
    }
)
const fetchData = async () => {
  try {
    const response = await api("api/webtoon/review/reply/"
      + route.params.reviewId
      + "?page=" + (reviewQueryString.value.page - 1)
      , "GET");
        reviewPageContents.value = response.content;
        reviewTotalPages.value = response.totalPages;
    reviewTotalCount.value = response.totalElements;
      console.log(response)
      } catch (error){
      console.error("Error fetching data:", error);
  }
};
fetchData();

// 좋아요
function likeReview() {
  if (authStore.user) {
    apiToken("api/webtoon/review/reply/like/" + route.params.reviewId,
        "PATCH",
    ).then((response) => {
          alert(response)
          router.go(0);
        }
    )
  } else {
    alert("로그인을 먼저 해 주세요.")
  }

}

// 댓글 등록


function submitReviewReply() {
  if (authStore.user) {
    apiToken(
        "api/webtoon/review/reply/" + route.params.reviewId,
        "POST",
        {
          content: reviewReplyComment.value
        }
    ).then((response) => {
          if (response.status === 400) {
            alert("값이 유효 하지 않아요")
          } else {
            alert(response);
            router.go(0);
          }
        }
    )
  } else {
    alert("로그인을 먼저 해 주세요.")
  }
}

//공유 함수
function copyToClipboard() {
  try {
    copyText(window.document.URL)
    alert("복사 완료")
  } catch (e) {
    alert("복사 실패")
  }
}

</script>

<template>
  <v-card
      class="v-col-md-12"
  >
    <v-btn
        style="margin-left: 2%"
        icon="mdi-arrow-left"
        @click="router.go(-1)"
    >
    </v-btn>
    <span

        style="margin: 40%
      ;font-weight: bolder;
      font-size: 2em;
      "
    >
    리뷰
  </span>
  </v-card>
  <v-container
      class="v-col-10">

    <v-card>
      <div>
        <div>
          <div
              class="align-items-center"
          >
            <div
                class="accent-font  "
                style="
                display:flex;
                padding-left: 15px;
                align-items: center;">
              <img
                  :src="reviewData.profileImg"
                  style="width:5%">
              <span
                  v-text="reviewData.userNickName"
                  style="padding-left:10px">
        </span>
            </div>
          </div>
          <v-container>
            <v-row>
              <div
                  class="v-col-9"
              >
                <div v-text="reviewData.webtoonTitle"
                     style="
                 font-size:1.8em;
                 margin-left:10px;
                   padding-top:0;
                   padding-bottom:0;
                ">
                </div>
                <div
                    class="accent-font"
                    v-text="'장르 : ' + reviewData.genre"
                    style="
                  margin-left:10px;
                   padding-top:0;
                   padding-bottom:0;
                ">
                </div>
                <div
                    class="accent-font"
                    v-text="reviewData.rating ? '평가 : ' + reviewData.rating/2 : '평가 없음' "
                    style="
                margin-left:10px;
                   padding-top:0;
                   padding-bottom:0;
                ">
                </div>
                <div
                    v-text="reviewData.content"
                    style="margin-left:10px;
                   padding-top:50px;
                  ">

                </div>

              </div>
              <div class="v-col-2"
                   style="margin:0 2%">
                <img :src="reviewData.webtoonImg"
                     style="
                     max-height:300px;
                     max-width:200px;
                     padding: 0 0 5% 0;">

              </div>
            </v-row>
          </v-container>
        </div>
      </div>
      <v-divider></v-divider>
      <v-row
          style="text-align: center;"
      >
        <v-col>
          <v-btn
              elevation="0"
              @click="likeReview"
          >
            <v-icon
                :color="reviewData.checkLike == true ? 'red' : 'gray'"
                size="24"
                icon="mdi-thumb-up"
            ></v-icon>
            <span>
            좋아요
              </span>
          </v-btn>
        </v-col>
        <v-col>

          <v-dialog width="1000" height="800px">
            <template v-slot:activator="{ props }">
              <v-btn
                  elevation="0"
                  v-bind="props"
              >
                <v-icon
                    color="gray "
                    size="24"
                    icon="mdi-chat-outline"
                ></v-icon>
                <span>
              댓글 쓰기
              </span>
              </v-btn>
            </template>

            <template v-slot:default="{ isActive }">
              <v-card title="웹툰 리뷰 댓글">
                <v-divider></v-divider>
                <v-textarea
                    v-model="reviewReplyComment"
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
                      @click="submitReviewReply"
                  ></v-btn>
                  <v-btn
                      text="Close"
                      @click="isActive.value = false"
                  ></v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>

        </v-col>
        <v-col>
          <v-btn
              elevation="0"
              @click="copyToClipboard"
          >
            <v-icon
                color="gray "
                size="24"
                icon="mdi-share-variant-outline"
            ></v-icon>
            <span>
              공유
              </span>
          </v-btn>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-card
          min-height="500px"
      >
        <div
            class="m-2 accent-font"
        >
          <span

          >
            댓글
          </span>
          <span
              v-text="reviewTotalCount"
          ></span></div>
        <v-list lines="one"
        >

          <v-list-item
              v-for="(item, key) in reviewPageContents"
              :key="key"
              :title="item.userNickname"
          >
            <div
                v-text="item.content"
            ></div>
          </v-list-item>
        </v-list>
        <v-row>

          <v-pagination
              class="v-row v-md-12"
              v-model="reviewQueryString.page"
              :length="reviewTotalPages"
              total-visible="8"
              active-color=#5302FE
          >
            <!-- totalPages 0부터 시작-->
          </v-pagination>
        </v-row>
      </v-card>
    </v-card>


  </v-container>


</template>

<style scoped>
.accent-font {
  font-weight: 1000;
  font-size: 0.8em;
}

.de-accent-font {

}
</style>