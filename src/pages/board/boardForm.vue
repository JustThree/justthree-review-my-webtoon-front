<template>
  <v-container>
    <v-row class="frame-title">
      <v-col cols="12">
        <v-text-field
            counter
            class="input-title"
            variant="standard"
            v-model="boardTitle"
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
            v-model="boardContent"
            placeholder="작성 규칙 &#13;&#10; - 존댓말(높임말) 사용 &#13;&#10; - 광고 및 홍보성 게시글은 사전고지 없이 삭제 처리되며 내용에 따라 강퇴 조치">
        </v-textarea>
      </v-col>
      <v-file-input
          multiple
          v-model="boardFiles"
      ></v-file-input>
    </v-row>

    <v-row class="frame-bottom">
      <v-col cols="12">
        <v-btn @click="createBoard">등록하기</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import {api} from "@/common.js";

const boardTitle = ref('');
const boardContent = ref('');
const boardFiles = ref([]);

const createBoard = async () => {
  const formData = new FormData();
  formData.append('title', boardTitle.value);
  formData.append('content', boardContent.value);
  for (let i = 0; i < boardFiles.value.length; i++) {
    formData.append('imageFiles', boardFiles.value[i]);
  }
  formData.append("noticeYn", 0);// 0: 자유 1: 공지
  formData.append("users", 1); // users_id
  const response = await api("board", "POST", formData); //apiToken으로 변경해야함
  if(response instanceof Error){
    console.log(response.response.data); //서버에서 예외처리 필요
  }else{
    if(response){
      console.log("성공");
      alert("글이 성공적으로 등록되었습니다.");
      //router.replace("/boardlist"); //글 목록 페이지로 이동
    }else{
      alert("등록 실패..");
    }
  }
};

</script>

<style>

</style>