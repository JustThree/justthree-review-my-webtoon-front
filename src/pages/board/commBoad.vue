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
    <v-row>
    </v-row>
  </v-container>
</template>

<script setup>
import Board from "@/components/board/board.vue";
import {onMounted, ref} from "vue";
import {api} from "@/common.js";
import {useRoute} from "vue-router";

const route = useRoute();
const commBoardList = ref([]);
const errorMsg = ref("");

onMounted(async  ()=>{
 /*
 const response = await api("board", "GET");
 console.log(response);
 */
  api("board", "GET")
      .then(response => {
        if(response instanceof Error) {
          let errorRes = response;
          //에러처리
          console.log(errorRes.response);
          errorMsg.value = errorRes.response.data;
          commBoardList.value = [];
        }else{
          //console.log(response);
          commBoardList.value = response;
          console.log(commBoardList.value);
        }
      })
})

</script>

<style scoped>

</style>