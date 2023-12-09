<template>
  <v-container>
    <board-form :board="board" :buttonText="'등록하기'" @submit="createBoard"></board-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import {api} from "@/common.js";
import BoardForm from "@/components/board/boardForm.vue";

const board = ref({
  title: '',
  content: '',
  boardFiles: [],
  noticeYn: 0,
  users: '',
  //기존 데이터 조회
  boardImgMapList: [],
});

const createBoard = async (board) => {
  //console.log(board.boardFiles);
  if(board.title.trim() === '' || board.content.trim() === '') {
    alert("제목과 내용을 입력해주세요");
  }else {
    const formData = new FormData();
    formData.append('title', board.title);
    formData.append('content', board.content);
    for (let i = 0; i < board.boardFiles.length; i++) {
      formData.append('imageFiles', board.boardFiles[i]);
    }
    formData.append("noticeYn", 0);// 0: 자유 1: 공지
    formData.append("users", 1); // users_id
    const response = await api("board", "POST", formData); //apiToken으로 변경해야함
    if (response instanceof Error) {
      console.log(response.response.data); //서버에서 예외처리 필요
    } else {
      if (response) {
        console.log("성공");
        alert("글이 성공적으로 등록되었습니다.");
        //router.replace("/boardlist"); //글 목록 페이지로 이동
      } else {
        alert("등록 실패..");
      }
    }
  }
};
</script>

<style>

</style>