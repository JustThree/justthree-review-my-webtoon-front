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
            <v-btn
                color="primary"
                v-bind="props" >
              정렬
            </v-btn>
          </template>
          <v-list>
            <v-list-item  v-for="(menuitem, index) in menuitems"  :key="index" >
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
    <v-infinite-scroll height="700"  @load="load" >
      <template v-for="(data, idx) in commBoardList" :key="idx">
        <Board :boardone="data"></Board>
      </template>
      <template v-slot:loading>
       시간이 조금 걸립니다:)
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
//const commBoardList = ref(Array.from({ length: 10 }, (k, v) => v + 1))

//페이징
let page = 1;
const itemPerPage = 10;
//
let loadVal = 1;
//정렬 드롭다운 메뉴
const menuitems = ref([
  { title: "오래된 순" },
  { title: "조회수 순" },
  { title: "최신순" },
]);

onMounted(async  ()=>{
  await fetchData();
});
const fetchData = async () => {
/*  console.log(page);
  console.log(itemPerPage);*/
  api("board?page="+page+"&size="+itemPerPage, "GET").then(
      (response) => {
        if (response instanceof Error) {
          let errorRes = response;
          console.log(errorRes.response);
          errorMsg.value = errorRes.response.data;
          commBoardList.value = [];
        } else {
          //commBoardList.value = response;
          //기존 목록에 이어서 조회됨
          commBoardList.value =[...commBoardList.value, ...response];
          //console.log(commBoardList.value);
        }
      }
  );
};
//페이징 Vuetify Infinie scroller componenet
const load = ({ done }) => {
  if (loadVal===1) {
    loadVal = 0;
    setTimeout(async () => {
      page++;
      await fetchData();
      commBoardList.value.push(...Array.from({length: itemPerPage}, (k, v) => v + commBoardList.value.slice(-1)[0] + 1));
      done('ok')
    }, 2000)
  }
  loadVal = 1;
}
/*
//페이징 더보기 버튼 사용
const loadMore = async () => {
  page++;
  console.log(page);
  await fetchData();
};
*/

</script>

<style scoped>

</style>