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
    <v-row class="frame-bottom">
      <v-col cols="12">
        <v-btn @click="submitBoard">{{buttonText}}하기</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import {api} from "@/common.js";

const board = ref({
  title: '',
  content: '',
  boardFiles: [],
  noticeYn: 0,
  users: ''
});
const buttonText = "등록";
const emit = defineEmits(['submit']);
const submitBoard = () => {
  emit('submit', board.value);
};
</script>

<style>

</style>