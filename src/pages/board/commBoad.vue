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
            <v-list-item
                v-for="(item, index) in items"
                :key="index"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <v-col  cols="3">
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
    <Board v-for="(data, idx) in commBoardList" :key="idx" :boardone="data"></Board>
    <!-- 더 보기 버튼 -->
    <v-btn v-if="showLoadMoreButton" @click="loadMore">더 보기</v-btn>
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

//페이징
let page = 1;
const itemPerPage = 10;
const showLoadMoreButton = ref(false);

/*const handleScroll = () => {
  const container = $refs.scrollContainer;
  const scrollHeight = container.scrollHeight;
  const scrollTop = container.scrollTop;
  const clientHeight = container.clientHeight;

  if (scrollTop + clientHeight >= scrollHeight) {
    page++; // 다음 페이지로 이동
    fetchData(); // API 호출
  }
};*/

onMounted(async  ()=>{
  await fetchData();
});
const fetchData = async () => {
  console.log(page);
  console.log(itemPerPage);
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
          console.log(commBoardList.value);
          if (response.length === itemPerPage) {
            showLoadMoreButton.value = true;
          } else {
            showLoadMoreButton.value = false;
          }
        }
      }
  );
};

const loadMore = async () => {
  page++;
  console.log(page);
  await fetchData();
};

</script>

<style scoped>

</style>