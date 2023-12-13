<script setup>


import {useRoute} from "vue-router";
import {api} from "@/common.js";
import {ref} from "vue";
const route = useRoute();
const data = ref([]);

api("api/webtoon/reviews/" + route.params.masterId,
    "GET"
).then((response) =>{
      data.value = response.content
    }
)


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
  </v-card>
  <v-container
      class="align-center"
  >
    <v-row v-if="data.length===0">
      리뷰가 없어요!
    </v-row>
    <v-row v-for="(item,idx) in data"
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
              v-text="item.heartCount"
          >
          </v-col>
        </v-row>

      </router-link>
      </v-card>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>