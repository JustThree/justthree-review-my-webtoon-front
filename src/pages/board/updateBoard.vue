<template>
  <v-container>
    <board-form :board="board" :buttonText="'수정하기'" @submit="updateBoard" @deleteBoard="deleteBoard"></board-form>
  </v-container>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {api} from "@/common.js";
import BoardForm from "@/components/board/boardForm.vue";
import {useRoute} from "vue-router";

const board = ref({
  title: '',
  content: '',
  boardFiles: [],
  noticeYn: 0,
  users: '',
  //기존 데이터 조회
  boardImgMapList: [new Map([[], []])],
  boardId: 0
});
const route = useRoute();

//기존 데이터 파싱
onMounted(async () =>{
  const response = await api("board/"+route.params.boardId, "GET");
  if (response instanceof Error) {
    console.log(response.response.data); // 서버에서 예외처리 필요
  } else {
    board.value = response; // 가져온 데이터를 변수에 저장
    console.log(board.value.boardImgMapList.length);
    if(board.value.boardImgMapList.length>0) {
      /*for(let i=0; i<board.value.boardImgMapList.length; i++){
        console.log(board.value.boardImgMapList[i].accessUrl);
      }*/
    }else{
      board.value.boardFiles = []; //boardFiles는 []로 초기화되어 있으므로, board.boardFiles는 빈 배열. 값을 할당해줘야함
    }
  }
});
//글 수정
const updateBoard = async (board) => {
  console.log(board);
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

    const response = await api("board/"+route.params.boardId, "PUT", formData); //apiToken으로 변경해야함
    if (response instanceof Error) {
      console.log(response.response.data); //서버에서 예외처리 필요
    } else {
      if (response) {
        console.log("성공");
        alert("글이 성공적으로 수정되었습니다.");
        window.location.reload();
        //router.replace("/boardlist"); //글 상세조회 페이지로 이동
      } else {
        alert("수정 실패..");
      }
    }
  }
};
//글 삭제
const deleteBoard = async (board) => {
  console.log(board);
  if(confirm("정말 삭제하시겠습니까?")){
    const response = await api("board/"+board.boardId, "DELETE"); //apiToken으로 변경해야함
    if (response instanceof Error) {
      console.log(response.response.data); //서버에서 예외처리 필요
    } else {
      if (response) {
        console.log("삭제");
        alert("글이 삭제되었습니다.");
        //router.replace("/boardlist"); //글 목록으로 이동
      } else {
        alert("삭제 실패..");
      }
    }
  }
}
</script>

<style>

</style>