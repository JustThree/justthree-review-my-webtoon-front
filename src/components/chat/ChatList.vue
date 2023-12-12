<template>
  <div class="pa-5" style="background-color:#F5F5F5">
    <v-card class="w-50 my-13 pa-5" rounded="xl" height="600px">

      <v-tabs bg-color="" show-arrows slider-color="purple-lighten-4" align-tabs="center" v-model="page">
        <v-tab :value="1">
          전체
        </v-tab>
        <v-tab :value="2">
          참가자 있는 채팅 👤
        </v-tab>
        <v-tab :value="3">
          인기웹툰 🔥
        </v-tab>
        <v-tab :value="4">
          내가 참여한 채팅 📪
        </v-tab>
      </v-tabs>

      <br>
      <v-text-field class="mx-16 my-2" variant="outlined" label="웹툰 제목을 입력해주세요"
                    prepend-inner-icon="mdi-magnify" hide-details @keyup.enter:append-inner="search"></v-text-field>
      <v-infinite-scroll class="chatExist" height="500px"
                             @load="load">
        <div v-for="chat in chats" class="mx-16"> <!--  v- for -->
          <hr>
          <v-row class="pa-6 gc-14">
            <!--      img, title, lastMsg(sender, content), lastMsgTime, ChatURL -->
            <v-avatar calss="v-col" size="80" variant="outlined">
              <img :src="chat.imageUrl" alt="sender" />
            </v-avatar>
            <v-col class="w-50 mt-auto mb-auto">
              <v-row justify="space-between">
                <div class="text-h6 font-weight-bold mb-1"> {{ chat.title }} </div>
                <div class="text-medium-emphasis"> {{ chat.created  }}</div>
              </v-row>
              <v-row class="text-medium-emphasis" justify="start"> {{ chat.usersNickname + ": " + chat.contents }} </v-row>
            </v-col>
            <v-btn :href="'/chat/' + chat.masterId" calss="v-col" variant="tonal" color="#924AFE" style="align-self: center;">
              참여하기
            </v-btn>

          </v-row>
        </div>
        <br>
        <template
               v-slot:empty>
          <v-alert
              class="mx-16"
              width="10"
              color="purple"
              variant="outlined"
              closable="true"
          >No more chat!</v-alert>
        </template>
      </v-infinite-scroll>
      <div class="chatExist" >
        <v-alert class="ma-16" type="warning">
          채팅이 존재하지 않습니다.
        </v-alert>

      </div >



    </v-card>


  </div>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue';
import { api } from '@/common.js';
import ChatList from "@/pages/chat/ChatList.vue";

const page = ref(1);

const chats = ref([]);
const load = ({done}) => {
  setTimeout(() => {
    done('empty')
  }, 1000)
}

// 참여하기 버튼
const chatURL = ref("");

watch(page, () => {
  console.log(page.value)
  loadChats()
})

onMounted(() => {
  loadChats();
  const token = sessionStorage.getItem("token");

  let ws = new WebSocket(`ws://localhost:8089/chat?${token}`);
  ws.onmessage = (resp) => {
    console.log(resp)
    chats.value = JSON.parse(resp.data);
  }

})

const loadChats = ()=> {
  api(`chats/type/${page.value}`, "GET", {})
      .then((resp) => {
        console.log(resp)
        if(resp.length === 0){
          document.getElementsByClassName("chatExist")[0].style.display = "none";
          document.getElementsByClassName("chatExist")[1].style.display = "inline";
        }else{

          document.getElementsByClassName("chatExist")[0].style.display = "inline";
          document.getElementsByClassName("chatExist")[1].style.display = "none";
          chats.value = resp;
        }
      })
}

// const createdDiff = (created) => {
//   console.log(created)
//   const diff = Date.now() - new Date(created);
//   console.log(diff)
// }

const search = () => {

}

</script>

<style scoped>


@font-face {
  font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
  font-style: normal;
}

* {
  font-family: 'Pretendard-Regular';
}
</style>
