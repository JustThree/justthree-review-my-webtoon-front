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
      color="#F1F1F5"
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
          min-height="500px"
      >

        <v-img
          :src="item.imgUrl"
        ></v-img>
        <div v-text="item.userNickName"></div>
        <v-divider></v-divider>
        <div v-text="item.content"></div>
      </v-card></v-row>
  </v-container>
</template>

<style scoped>

</style>