<script setup>

import {api} from "@/common.js";
import {useRoute} from "vue-router";
import {ref} from "vue";

const route = useRoute();
const reviewData = ref([])
const reviewReplyData = ref([])
api("api/webtoon/review/" + route.params.reviewId,
    "GET",
).then((response) => {
      reviewData.value = response;
    }
);
api("api/webtoon/review/reply/" + route.params.reviewId,
    "GET",
).then((response) => {
      reviewReplyData.value = response
    }
)

</script>

<template>
  <v-container
      class="v-col-10">

    <v-card>
      <div>
        <div>
          <div
              class="align-items-center"
          >
            <div
                style="display:flex;padding-left: 15px;">
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
                 style="margin-left:10px;
                   padding-top:0;
                   padding-bottom:0;
                ">
            </div>
            <div
                v-text="reviewData.genre"
                style="margin-left:10px;
                   padding-top:0;
                   padding-bottom:0;
                ">
            </div>
            <div
                v-text="reviewData.rating ? reviewData.rating : '평가 없음' "
                style="margin-left:10px;
                   padding-top:0;
                  ">
            </div>
          </div>

          <div class="v-col-2"
            style="margin:0 2%">
            <img :src="reviewData.webtoonImg"
                 style="padding: 0 0 5% 0;">

          </div>
            </v-row>
          </v-container>
        </div>


      </div>
      <v-row
      >
        <v-col
            class="col-12"
            style="margin:0 10px 10px 10px;"
            v-text="reviewData.content"
        >
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row
          style="text-align: center;"
      >
        <v-col>
          좋아요
        </v-col>
        <v-col>
          댓글
        </v-col>
        <v-col>
          공유
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-card
          min-height="500px"
      >
        <v-list lines="one"

        >
          <v-list-item
              v-for="(item, key) in reviewReplyData.content"
              :key="key"
              title=""
          >
          </v-list-item>
        </v-list>
      </v-card>
    </v-card>


  </v-container>


</template>

<style scoped>

</style>