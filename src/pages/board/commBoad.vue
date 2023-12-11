<template>
  <v-container>
    <v-row>
      <v-col  cols="12">
        <div class="text-h2">커뮤니티</div>
      </v-col>
    </v-row>
    <!-- 검색 Frame -->
    <v-row>
      <!--  정렬    -->
      <div class="text-center">
        <v-menu   open-on-hover>
          <template v-slot:activator="{ props }">
            <v-btn color="#DFCCFB" v-bind="props" >  정렬  </v-btn>
          </template>
          <v-list>
            <v-list-item  v-for="(menuitem, index) in menuitems"  :key="index" @click="sortList(menuitem.title)">
              <v-list-item-title>{{ menuitem.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <v-col  cols="5">
        <v-text-field
            class="input-keyword"
            variant="standard"
            maxlength="20"
            bg-color="#EDE7F6"
            :style="{ 'font-weight': 700 }"
            placeholder="검색 키워드를 작성해주세요">
        </v-text-field>
      </v-col>
      <v-col cols="4">
        <v-btn>검색</v-btn>
      </v-col>
    </v-row>
    <!-- 글 목록   Frame-->
    <v-infinite-scroll height="500"  @load="load" >
      <template v-for="(data, idx) in commBoardList" :key="idx">
        <Board :boardone="data"></Board>
      </template>
      <template v-slot:loading>
      {{pagingMsg}}
      </template>
    </v-infinite-scroll>
    </v-container>
</template>

<script setup>
import Board from "@/components/board/board.vue";
import {onMounted, ref} from "vue";
import {api} from "@/common.js";
import {useRoute} from "vue-router";

const route = useRoute();
const errorMsg = ref("");
const commBoardList = ref([]);
const pagingMsg = ref("시간이 조금 걸립니다:)");

//페이징
let page = 1;
const itemPerPage = 10;
let sortings = ref("sortDesc");
let shouldResetPage = true;

//정렬 드롭다운 메뉴
const menuitems = ref([
  { title: "오래된 순" },
  { title: "조회수 순" },
  { title: "최신순" },
]);
const sortList = (sorting) => {
  console.log(shouldResetPage);
  if (sorting === "오래된 순") {
    sorting = "sortAsc";
  } else if (sorting === "조회수 순") {
    sorting = "sortViewCntDesc";
  } else if (sorting === "최신순") {
    sorting = "sortDesc";
  }
  console.log(sorting);
  console.log(sortings.value);
  if (sorting === sortings.value) {
    shouldResetPage = false;
    //return; // 이미 선택된 정렬 조건일 경우 함수 종료
  }else{ //기존 정렬(sortings)과  선택한 값(sorting)이 다르면 리셋
    shouldResetPage = true;
  }

  if(shouldResetPage){
    page = 1; // 페이지 리셋
    commBoardList.value = []; // 목록 초기화
    pagingMsg .value= "시간이 조금 걸립니다:)"; //메시지 초기화
    load({});
  }
  sortings.value = sorting;
  console.log(sortings.value);
  //shouldResetPage = true; // 페이지 리셋 플래그 설정
  fetchData();
}

onMounted(async  ()=>{
  await fetchData();
});
const fetchData = async () => {
  api("board?page="+page+"&size="+itemPerPage+"&sortings="+sortings.value, "GET")
      .then((response) => {
        if (response instanceof Error) {
          let errorRes = response;
          console.log(errorRes.response);
          errorMsg.value = errorRes.response;
          commBoardList.value = [];
        } else {
            //if(response.length ===0){
          if(response.length < itemPerPage){
            pagingMsg.value = "더 이상 존재하지 않습니다.";
            commBoardList.value = [...commBoardList.value, ...response];
            }else {
              //기존 목록에 이어서 조회
              //shouldResetPage = false;
              commBoardList.value = [...commBoardList.value, ...response];
              console.log(commBoardList.value);
            }
        }
      }
  );
};

//페이징
const load = ({ done }) => {
  if(pagingMsg.value !== "더 이상 존재하지 않습니다.") { //존재할 경우
    shouldResetPage = false; // 페이지 리셋 방지
    setTimeout(async () => {
      page++;
      await fetchData();
      done('ok')
    }, 2000)
  }else {
    shouldResetPage = true; // 다음 정렬 조건 변경 시 페이지 리셋
  }
}
</script>

<style scoped>

</style>