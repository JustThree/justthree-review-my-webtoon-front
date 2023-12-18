<script setup>
import Board from "@/components/board/board.vue";
import {onMounted, ref, nextTick, watch} from "vue";
import {api} from "@/common.js";
import {useRoute} from "vue-router";
import {useAuthStore} from "@/stores/auth.store.js";
import {storeToRefs} from "pinia";
import router from "@/router/index.js";

const route = useRoute();
const errorMsg = ref("");
const commBoardList = ref([]);
const pagingMsg = ref("시간이 조금 걸립니다:)");

//로그인한 유저 확인
let loginUsersId = ref();

//페이징
let type=2 ;
let pageList=ref([1, 1, 1, 1]); // 오래된순 정렬 / 조회순 정렬 /최신순 정렬/ 검색
let page = 1;
const itemPerPage = 10;
let sortings = ref("sortDesc");
let shouldResetPage = true;
const infiniteScrollRef = ref(null);

//글 등록하기 버튼
function gotoCreateBoard(){
    console.log(loginUsersId.value);
    if(!loginUsersId.value){
        alert("로그인해야 가능한 서비스입니다.");
        router.replace("/user/login");
        return;
    }
    router.replace('/comm/new');
}

//검색
const searchKeyword = ref(""); // 검색어

//검색 함수
const searchBoard = async () => {
    // 검색어가 비어 있는 경우 아무 작업도 수행하지 않음
    //page = 1;
    if (!searchKeyword.value.trim()) {
        return;
    }
    console.log(searchKeyword.value);
    // 페이지 리셋 및 검색 결과 초기화
    pageList[2] = 1;
    commBoardList.value = [];
    pagingMsg.value = "시간이 조금 걸립니다:)";
    // 검색에 필요한 작업 수행
    await getData();
};

//정렬 드롭다운 메뉴
const menuitems = ref([
  { title: "오래된 순" },
  { title: "조회수 순" },
  { title: "최신순" },
]);
const sortList = (sorting) => {
    page = 1;
    console.log(shouldResetPage);
    if (sorting === "오래된 순") {
        sorting = "sortAsc";
    } else if (sorting === "조회수 순") {
        sorting = "sortViewCntDesc";
    } else if (sorting === "최신순") {
        sorting = "sortDesc";
    }
    console.log(sorting);
    console.log(sortings.value); //기존 정렬값
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
  }

  sortings.value = sorting;
  //shouldResetPage = true; // 페이지 리셋 플래그 설정
    //pagingMsg .value= ""
  getData();
}

const getData = async () => {
    api("board?page="+page+"&size="+itemPerPage+"&sortings="+sortings.value+"&keyword="+searchKeyword.value, "GET")
        .then((response) => {
                if (response instanceof Error) {
                    let errorRes = response;
                    console.log(errorRes.response);
                    errorMsg.value = errorRes.response;
                    commBoardList.value = [];
                } else {
                    console.log(commBoardList.value);
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

onMounted(async  ()=>{
    const authStore = useAuthStore()
    const { user } = storeToRefs(authStore);
    //console.log("user", user);
    if(user.value!==null){
        loginUsersId.value = user.value.usersId;
    }else {
        loginUsersId.value =-1;
    }
  await getData();
});

//페이징
const load = ({ done }) => {
    console.log(pagingMsg.value);
    if(pagingMsg.value !== "더 이상 존재하지 않습니다.") { //존재할 경우
        shouldResetPage = false; // 페이지 리셋 방지
        setTimeout(async () => {
            page++;
            await getData();
            done('ok')
        }, 2000)
    }else {
        shouldResetPage = true; // 다음 정렬 조건 변경 시 페이지 리셋
        // 다 끝나고 초기화
    }
}
</script>
<template>
    <v-container>
        <!-- 검색 Frame -->
        <v-row>
            <div class="menu-frame">
                <!--  정렬    -->
                <div class="sort-menu-frame">
                    <v-menu   open-on-hover>
                        <template v-slot:activator="{ props }">
                            <v-btn class="sort-btn" variant="tonal" v-bind="props" >  정렬  </v-btn>
                        </template>
                        <v-list>
                            <v-list-item  v-for="(menuitem, index) in menuitems"  :key="index" @click="sortList(menuitem.title)">
                                <v-list-item-title>{{ menuitem.title }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
                <div class="search-input-frame">
                    <div class="search-input">
                        <v-text-field
                            variant="standard"
                            maxlength="20"
                            bg-color="#EDE7F6"
                            v-model="searchKeyword"
                            placeholder="검색 키워드를 작성해주세요(20자 이내)">
                        </v-text-field>
                    </div>
                    <v-btn class="search-btn"  variant="text" @click="searchBoard">검색</v-btn>
                </div>
                <div class="create-btn-frame">
                    <v-btn class="create-btn" variant="tonal" @click="gotoCreateBoard" >
                        <v-icon left>mdi-pencil</v-icon> 글쓰기
                    </v-btn>
                </div>
            </div>
        </v-row>
        <!-- 글 목록   Frame-->
        <v-infinite-scroll  class="infinte-frame"    :onLoad="load" ref="infiniteScroll">
            <template v-for="(data, idx) in commBoardList" :key="idx">
                <Board :boardone="data"></Board>
            </template>
            <template v-slot:loading>
                {{pagingMsg}}
            </template>
        </v-infinite-scroll>
    </v-container>
</template>
<style scoped>
.menu-frame{
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: flex-start;
    /*justify-content: flex-end;*/
    align-items: center;
    gap: 10px;
    line-height: 100px;
    margin: 5px;
    padding: 15px;
}
/*  정렬 */
.sort-menu-frame{
    width: 12%;
    margin-right: 130px;
}
.sort-btn{
    width: 100%;
}
/*  검색 */
.search-input-frame{
    width: 45%;
    height: 55px;
    line-height: 100px;
    display: flex;
    gap: 3px;
    margin-left: 130px;
}
.search-input{
    width: 90%;
}
.search-btn {
    color: #8F7CEE;
    font-weight: bold;
}
.v-btn--size-default {
    --v-btn-size: 0.875rem;
    --v-btn-height: 50px;
}
/*  작성 버튼 */
.create-btn-frame{
    width: 10%;
}
.create-btn {
    width: 100%;
    background-color: #8F7CEE;
    color: white;
}
/*스크롤 CSS*/
.infinte-frame {
    height: 800px;
}
::-webkit-scrollbar {
    display: none;
}

</style>