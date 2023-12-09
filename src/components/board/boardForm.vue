<template>
  <v-container>
    <v-row class="frame-title">
      <v-col cols="12">
        <v-text-field
            counter
            class="input-title"
            variant="standard"
            v-model="board.title"
            maxlength="30"
            bg-color="#EDE7F6"
            :style="{ 'font-weight': 700 }"
            placeholder="글 제목을 입력해주세요(30자 이내)">
        </v-text-field>
      </v-col>
    </v-row>
    <v-row class="frame-content">
      <v-col cols="12">
        <v-textarea
            counter
            clearable
            no-resize
            variant="outlined"
            clear-icon="mdi-close-circle"
            bg-color="white"
            v-model="board.content"
            placeholder="작성 규칙 &#13;&#10; - 존댓말(높임말) 사용 &#13;&#10; - 광고 및 홍보성 게시글은 사전고지 없이 삭제 처리되며 내용에 따라 강퇴 조치">
        </v-textarea>
      </v-col>
      <v-file-input
          multiple
          v-model="board.boardFiles"
      ></v-file-input>
    </v-row>
    <div v-if="board.boardImgMapList.length>0" class="d-flex justify-space-around align-center bg-grey-lighten-4">
      <div class="ma-4">
        <div class="text-subtitle-2">Default</div>
        <v-img
            class="bg-white"
            width="300"
            :aspect-ratio="1"
            src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
        ></v-img>
      </div>

      <div class="ma-4">
        <div class="text-subtitle-2">Cover</div>
        <v-img
            class="bg-white"
            width="300"
            :aspect-ratio="1"
            :src=board.boardImgMapList[0].accessUrl
            cover
        ></v-img>
      </div>
    </div>
    <v-row class="frame-bottom">
      <v-col cols="12">
        <v-btn @click="submitBoard" >{{buttonText}}</v-btn>
        <v-btn v-if="buttonText==='수정하기'" @click="deleteBoard" >삭제하기</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import {api} from "@/common.js";
const props = defineProps({
  board : {
    type: Object
  },
  buttonText: {
    type:String,
    required: true
  },
})


/*const board = ref({
  title: '',
  content: '',
  boardFiles: [],
  noticeYn: 0,
  users: ''
});*/


const emit = defineEmits(['submit']);
const submitBoard = () => {
  //emit('submit', board.value); //등록
  emit('submit', props.board);
};

//삭제(수정일 때만)
const deleteBoard = () => {
  emit('deleteBoard', props.board); // delete 이벤트 emit
}

</script>

<style>

</style>