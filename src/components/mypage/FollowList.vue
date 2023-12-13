<template>
  <div class="text-center">
    <hr class="line">
    <div id="btn_back_line">
      <v-btn class="ma-2" color="purple-lighten-2" @click="goBack">
        <v-icon start icon="mdi-arrow-left"></v-icon>뒤로가기</v-btn>
      <div id="pagetitle">유저이름</div>
    </div>
    <hr class="line">
  </div>

  <v-card>
    <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
      <v-tab :value="1">팔로우<span></span></v-tab>
      <v-tab :value="2">팔로잉<span></span></v-tab>
    </v-tabs>
  </v-card>

  <v-card
      max-width="400"
      class="mx-auto"
  >
    <v-container>
      <v-row dense>
        <v-col v-for="(item,index) in follow.values" cols="12">
          <v-card color="#1F7087" theme="dark">
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="text-h5">{{ item.usersNickname }}.</v-card-title>
                <v-card-subtitle>Foster the People</v-card-subtitle>
                <v-card-actions>
                  <v-btn class="ms-2" variant="outlined" size="small">START RADIO</v-btn>
                </v-card-actions>
              </div>

              <v-avatar class="ma-3" size="125" rounded="0">
                <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>



</template>
<script setup>
import {api} from '@/common.js'
import {defineProps, onBeforeMount, reactive, ref, watch} from "vue";

const props = defineProps(['usersId']);
let usersId=props.usersId;
const tab = ref(1);
let follow = reactive([]);

watch(tab,()=>{
  sortBtn();
})

onBeforeMount( () => {
  sortBtn();
});
const sortBtn=()=>{
  try {
    api(`mypage/follower/${usersId}?sortNum=${tab.value}`, "GET", {})
        .then((resp) => {
          console.log(resp)
          follow.values=resp;
        })
    console.log("API Response:", follow);
  } catch (error) {
    console.error("API Error:", error);
  }
}
const goBack = () => {
  window.history.back();
};

</script>

<style>

</style>