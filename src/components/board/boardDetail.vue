<template>
  <v-container>
    <v-row class="frame-top">
      <v-col class="frame-title" cols="12">
        <v-text-field
            class="input-title"
            variant="standard"
            :style="{ 'font-weight': 700 }">
          {{board.title}}
        </v-text-field>
      </v-col>
      <v-col class="frame-title" cols="2">
        <span>{{board.userNickname}}</span>
      </v-col>
      <v-col class="frame-title" cols="3">
        <span>{{board.created}}</span>
      </v-col>
      <v-col class="frame-title" cols="2">
        <span>{{board.viewCount}}</span>
      </v-col>
      <!--  로그인한 유저(users_id)와 작성자(users_id)가 같을 경우에만   수정/삭제 버튼 조회    -->
      <v-col class="frame-title" cols="4">
        <v-btn variant="flat" @click="gotoUpdateBoard">  수정  </v-btn>
        <v-btn variant="tonal" @click="delBoard">  삭제  </v-btn>
      </v-col>
    </v-row>
    <v-row class="frame-content" style="height: 500px;">
      <v-col cols="12">
        <v-textarea
            class="area-board-content"
            no-resize
            variant="standard"
            bg-color="white"
            v-model="board.content"
            style="height: 600px;"
            :readonly="true">
        </v-textarea>
      </v-col>
    </v-row>
    <!-- 이미지 첨부파일   -->
    <div v-if="board.boardImgMapList.length>0" class="d-flex justify-space-around align-center bg-grey-lighten-4">
      <div class="ma-4" v-for="(imgMap, index) in board.boardImgMapList" :key="index" >
        <div class="text-subtitle-2">{{imgMap.originName}}</div>
        <v-img
            class="bg-white"
            width="300"
            :src=imgMap.accessUrl
            cover
        ></v-img>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import {ref, toRef, toRefs} from "vue";
import {useRouter} from "vue-router";
import {api} from "@/common.js";

const router = useRouter();
const props = defineProps({
  board : Object,
})
console.log(props);
//const { boardId, ...otherProps } = toRefs(props.board);
const {boardFiles, users, boardId, title, content, view_count, created, updated, noticeYn,
  userEmail, userNickname, boardImgMapList} = toRefs(props.board);
//const pp = toRef(props, "board");
//const boardOne = { boardId: boardId.value, ...otherProps };
//console.log(pp.value);
const  boardOne = props.board;
console.log( "boardOne" );
console.log(boardOne);
console.log(boardOne.boardId);

//수정버튼 클릭 시
function gotoUpdateBoard(){
  //console.log(boardOne.boardId);
  //router.push({ name: 'updateBoard', params: boardOne.boardId});
  console.log(props.board.boardId);
  router.push({ name: 'updateBoard', params: props.board.boardId});
}
//삭제버튼 클릭 시
async function delBoard(){
  console.log(props.board.boardId);
  if(confirm("정말 삭제하시겠습니까?")){
    const response = await api("board/"+props.board.boardId, "DELETE"); //apiToken으로 변경해야함
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

<style scoped>
.frame-top{
  background-color: #EDE7F6;
  border-top: 1px;
  border-bottom: 1px;
}
.area-board-content{
  height: 600px;
}
</style>