<script setup>


import {api} from "@/common.js";
import {ref, watch} from "vue";

const pageContents = ref();
const totalPages = ref();

// api query String 정의

const queryString =  ref({
  page:0,
  order:"등록순",
  genre:"전체"
  }
)
const orderObj = {
  "등록순" : "latest",
  "인기순" : "like",
  "평점순" : "rate"
}
const genreObj = {
 "전체" : "all",
  "판타지" : "fantasy",
  "로맨스" : "romance",
  "학원" : "school",
  "일상" : "daily",
  "코믹" : "comic",
  "무협" : "martialarts"
}


// 뒤로가기 위한 세션값 저장
if (sessionStorage.getItem("page")){
  queryString.value.page = sessionStorage.getItem("page");
}
if (sessionStorage.getItem("order")){
  queryString.value.order = sessionStorage.getItem("order");
}
if (sessionStorage.getItem("genre")){
  queryString.value.genre = sessionStorage.getItem("genre");
}

watch(
    () => queryString.value.page,
    (nowPage, lastPage) => {
      fetchData()
      sessionStorage.setItem("page",queryString.value.page);
    }
)
watch(
    () => queryString.value.order,
    (nowOrder, lastOrder) => {
      queryString.value.page = 0
      fetchData()
      sessionStorage.setItem("order",queryString.value.order);
    }
)
watch(
    () => queryString.value.genre,
    (nowGenre, lastGenree) => {
      queryString.value.page = 0
      fetchData()
      sessionStorage.setItem("genre",queryString.value.genre);
    }
)



// 페이지네이션
const fetchData = async () => {
  try {
    const response = await api("api/webtoon?page="
    + (queryString.value.page -1)
    + "&genre=" + genreObj[queryString.value.genre]
    + "&order=" + orderObj[queryString.value.order]
    , "GET");
    pageContents.value = response.content;
    totalPages.value = response.totalPages;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


// 버튼 누를 경우 쿼리스트링 변경
const changeGenre = function (a){
  queryString.value.genre = a
}
const changeOrder = function (a){
  queryString.value.order = a
}

fetchData()

</script>
<template>
  <v-card
      class="v-col-md-12"
  >
    <router-link :to="'/'">
      <v-btn
          style="margin-left: 2%"
          icon="mdi-arrow-left">

      </v-btn>
    </router-link>
    <span

        style="margin: 40%
      ;font-weight: bolder;
      font-size: 2em;
      "
    >
    웹툰
  </span>
  </v-card>
  <v-container
      style="width:60%;
        display:flex;
        justify-content: center;
        height:1000px"
  >
    <v-container
    >
      <v-row
          class=""
      >
        <v-col
            class="v-col-3"
        >
      <v-select
          v-model="queryString.order"
          label="정렬"
          :items="['등록순', '인기순', '평점순']"
          @update:modelValue="changeOrder"
      >
      </v-select>
        </v-col>
        <v-col
            class="v-col-3"
        >
          <v-select
              v-model="queryString.genre"
              label="장르"
              :items="['전체','판타지', '로맨스', '학원', '일상', '코믹', '무협']"
              @update:modelValue="changeGenre"
          >
          </v-select>
        </v-col>
      </v-row>
        <v-row class="justify-center"
        style="height:800px">
        <v-col v-for=" (item, idx) in pageContents"
               cols="2"
               style="min-height:150px
                      ;min-width:150px"
        >
          <router-link :to="'/webtoon/' + item.masterId"
            style="  color : black;
            text-decoration: none;"
          >
            <div>
              <v-img
                  :src="item.imgUrl"
                  width="100%"
                  height="100px"
                  alt="https://vuetifyjs.com/en/"
              >
              </v-img>
              <div v-text="(item.title.length > 10)? item.title.substring(0,10) + '...' : item.title">
              </div>
            </div>
          </router-link>
        </v-col>

      </v-row>
          <v-pagination
              class="v-row v-md-12"
              v-model="queryString.page"
              :length="totalPages-1"
              total-visible="8"
              active-color=#5302FE
          >
            <!-- totalPages 0부터 시작-->
          </v-pagination>
    </v-container>
  </v-container>
</template>

<style scoped>

</style>