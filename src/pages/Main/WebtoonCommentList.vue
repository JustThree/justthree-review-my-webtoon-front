<script setup>


import {useRoute} from "vue-router";

const route = useRoute();
</script>

<template>
  <v-card
      class="v-col-md-12"
      color="#F1F1F5"
  >
    <router-link :to="'/review/'+ route.params.masterId">
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
    <v-row v-for="(item,idx) in 4"
            class="justify-center"
    >

      <v-card
          class="ma-10 justify-center"
          style="background: #F7F2FA"
          width="60%"
          min-height="500px"
      >
        <div></div>
        <v-divider></v-divider>
        <div></div>
      </v-card>
    </v-row>

  </v-container>
</template>

<style scoped>

</style>