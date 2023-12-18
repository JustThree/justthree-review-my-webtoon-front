<template>
  <v-row>
    <v-col cols="5">
      <div>
        <v-text-field
            class="input-keyword"
            variant="standard"
            maxlength="20"
            bg-color="#EDE7F6"
            :style="{ 'font-weight': 700 }"
            v-model="searchKeyword"
            placeholder="검색 키워드를 작성해주세요">
        </v-text-field>
      </div>
    </v-col>
    <v-col cols="2">
      <v-btn @click="searchBoard">검색</v-btn>
    </v-col>
  </v-row>
  <v-table>
    <thead>
    <tr>
      <th class="text-left">
        번호
      </th>
      <th class="text-left">
        제목
      </th>
      <th class="text-left">
        본문
      </th>
      <th class="text-left">
        글쓴이
      </th>
      <th class="text-left">
        작성시간
      </th>
      <th class="text-left">
        관리
      </th>
    </tr>
    </thead>
    <tbody>
    <tr class="listContainer"
        v-for="item in commBoardList"
        :key="item.name"
    >
      <td class="text-left">{{ item.boardId }}</td>
      <td id="titleTd" class="text-left" @click="$router.push({path: `/boards/${item.boardId}`, query:{noticeYn: item.noticeYn}})">{{ item.title }}</td>
      <td class="text-left"><div class="text-left">{{ item.content }}</div></td>
      <td id="nicknameTd" class="text-left" @click="$router.push({path: `/mypage/userinfo/${item.usersId}`})">{{ item.userNickname }}</td>
      <td class="text-left">{{ item.created }}</td>
      <div>
          <v-dialog width="500">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" text="수정"> </v-btn>
            </template>

            <template v-slot:default="{ isActive }">
              <v-card title="Dialog">
                <v-card-text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                      text="Close Dialog"
                      @click="isActive.value = false"
                  ></v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        <v-btn>삭제</v-btn>
      </div>

    </tr>
    </tbody>
  </v-table>

  <v-pagination
      class="v-row v-md-12"
      v-model="page"
      :length="totalPages"
      total-visible="8"
      @click="getData"
      active-color=#5302FE
  >
    <!-- totalPages 0부터 시작-->
  </v-pagination>

</template>

<script setup>
import {api} from "@/common.js";
import {onMounted, ref} from "vue";

const desserts = [
]

const commBoardList = ref([]);//글 목록
const page = ref(1);
const itemPerPage = 10;
const totalPages = ref();
let sortings = ref("sortDesc");
const searchKeyword = ref("");
const dialog = ref(false);

onMounted(() => {
  getData();
})
const getData = async () => {
  await api("admin/boardlist?page="+page.value+"&size="+itemPerPage+"&keyword="+searchKeyword.value, "GET")
      .then((response) => {
        console.log(response);
        commBoardList.value = response.content;
        totalPages.value = response.totalPages;
      }).catch((e) =>{
        commBoardList.value = [];
      });
};

//검색 함수
const searchBoard = async () => {
  // 검색어가 비어 있는 경우 아무 작업도 수행하지 않음
  if (!searchKeyword.value.trim()) {
    return;
  }
  console.log(searchKeyword.value);
  /*// 페이지 리셋 및 검색 결과 초기화
  pageList[2] = 1;
  //page[3] = 1;
  commBoardList.value = [];
  pagingMsg.value = "시간이 조금 걸립니다:)";
  // 검색에 필요한 작업 수행*/
  await getData();
};
</script>

<style scoped>

#titleTd:hover{
  background-color : #D9D9D9;
}

#nicknameTd:hover{
  background-color : #D9D9D9;
}

tr{
  max-height: 52px;
}
tr>:nth-child(1){
  min-width : 100px;
}
tr>:nth-child(2){
  max-width: 300px;
  height: 100%;
  //display: inline-block;
  //overflow: hidden;
  //text-overflow: ellipsis;

}

tr>:nth-child(3){
  display:flex;
  align-items: center;
}

td>div{
  max-width: 350px;
  height: 52px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
tr>:nth-child(5){
  max-width: max-content;
  height: 52px;
//display: inline-block;
//overflow: hidden;
  text-overflow: ellipsis;
}
tr>:nth-child(6){
  max-width: max-content;
  height: 52px;
}
</style>