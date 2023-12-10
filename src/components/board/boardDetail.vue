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
      <!--      -->
      <v-col class="frame-title" cols="5">
        <span>{{board.userNickname}}</span>
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

const props = defineProps({
  board : Object,
})
console.log(props);
const {boardFiles, users, boardId, title, content, view_count, created, updated, noticeYn,
  userEmail, userNickname, boardImgMapList} = toRefs(props.board);

const  boardOne = props.board;
console.log(boardOne);

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