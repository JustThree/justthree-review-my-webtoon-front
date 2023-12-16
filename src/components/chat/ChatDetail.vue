<template>
  <body>
  <v-layout class="mx-8" style="text-align:left">
    <v-icon icon="mdi-account" color="rgb(128,128,128)"></v-icon>
    {{ currentParticipants }}
  </v-layout>
  <v-divider></v-divider>


  <div id='chatt'>
    <br/>
    <div id="container" style="height: 380px; overflow-y: scroll">
      <div v-for="item in talk" :key="item.created" class="d-flex mx-4" >
        <div v-if="userNickname === item.senderNickname" class="my-2 w-75 v-row justify-end">
          <v-card height="40" min-width="100" max-width="300" class>
            <v-card-text> {{ item.contents }}</v-card-text>
          </v-card>
        </div>
        <div v-else  class="my-2 w-75 v-row justify-start">
          <div>
            <v-avatar variant="outlined" size="48" class="mx-2">
              <v-img
                  :src="item.profileUrl"
                  alt="sender"
              ></v-img>
            </v-avatar>
          </div>
          <v-card height="40" min-width="100" max-width="300">
            <v-card-text> {{ item.contents }}</v-card-text>
          </v-card>
        </div>
      </div>
    </div>

    <v-divider></v-divider>
    <v-banner>
      <v-sheet width="500" class="mx-auto">
        <v-form @submit.prevent>
          <v-text-field
              v-model="contents"
              label="메시지를 입력하세요. "
              variant="outlined"
          >
            <template v-slot:prepend>
              <v-avatar variant="outlined">
                <v-img :src="authStore.profile" alt="userProfile"></v-img>
              </v-avatar>
            </template>
            <template v-slot:append>
              <v-btn type="submit"
                     @click="send"
                     class="mx-2"
                     block="true"
                     variant="tonal"
                     color="gray">전송
              </v-btn>
            </template>
          </v-text-field>
        </v-form>
      </v-sheet>

    </v-banner>
  </div>

  </body>
</template>
<script setup>
import {ref, onUnmounted, defineProps, onMounted, watch} from 'vue';
import {api, createdDiff} from '@/common.js'
import {useAuthStore} from "@/stores/auth.store.js";

const props = defineProps(['masterId']);
const masterId = props.masterId;

let talk = ref([]);
const contents = ref("");
const currentParticipants = ref("0");
const authStore = useAuthStore().user;
const userNickname = ref(authStore.nickname);
let ws;

let container;


onMounted(() => {
  // 기존 DB 채팅 내용 load
  container = document.querySelector("#container");

  api(`chats/list/${masterId}`, "GET", {})
      .then((resp) => {
        console.log(resp)
        talk.value = resp;
      })
      .then(() => {
        container.scrollTop = container.scrollHeight;
      })
  const token = JSON.parse(authStore.token).accessToken;

  // Connect WebSocket
  ws = new WebSocket(`ws://localhost:8089/chat?${token}&${masterId}`/*, [token, masterId]*/);

  // sender -> sessionStorage(token) 변경 예정
  ws.onmessage = function (onmessage) {
    console.log(onmessage)
    let data = JSON.parse(onmessage.data);
    if (data.currentParticipants == undefined) {
      talk.value = [...talk.value, data];
      setTimeout(() => {
        const scrollInterval = setInterval(() => {
          container.scrollTop++;
          if (container.scrollHeight === container.scrollTop) {
            clearInterval(scrollInterval);
          }
        }, 1)
      }, 500)
    } else {
      currentParticipants.value = data.currentParticipants;
    }
  }
})

const formatMessage = (msg) => {

  const userNickname = authStore.nickname;
  let css;
  if (msg.senderNickname === userNickname) {
    // css = 'class=me';
    css = 'style=background:yellow;'
  } else {
    // css = 'class=other';
    css = 'style=background:gray;'
  }
  let item = `<div ${css}>
            <span><b>${msg.senderNickname}</b></span> [ ${createdDiff(msg.created)} ]<br/>
            <span>${msg.contents}</span>
            </div>`;

  talk.value = [...talk.value, item];

}

const send = () => {

  if (contents.value.trim() != '') {
    ws.send(contents.value);
    contents.value = '';
  }
}

onUnmounted(() => {
  if (ws) {
    ws.close();
  }
});

</script>