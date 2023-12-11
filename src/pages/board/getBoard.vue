<template>
  <v-container>
    <board-detail :board="board"></board-detail>
    <!--댓글 컴포넌트-->
  </v-container>
</template>

<script setup>
import BoardDetail from "@/components/board/boardDetail.vue";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {api} from "@/common.js";

const board = ref({
  title: '',
  content: '',
  boardFiles: [],
  noticeYn: 0,
  users: '',
  //기존 데이터 조회
  boardImgMapList: [new Map([[], []])],
  boardId: 0,

});
const route = useRoute();

//기존 데이터 파싱
onMounted(async () =>{
  console.log(route.params.boardId);
  const response = await api("board/"+route.params.boardId, "GET");
  if (response instanceof Error) {
    console.log(response.response);
    if(response.response.status === 404){
      if(alert("존재하지 않는 게시글입니다.")){
        //글 목록으로 이동
      }
    }
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

</script>

<style scoped>

</style>