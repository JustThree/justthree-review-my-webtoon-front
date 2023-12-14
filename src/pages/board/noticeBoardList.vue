<template>
    <v-container>
        <!--  tab    -->
        <v-row>
            <v-col  cols="12">
                <div class="text-h2">공지사항</div>
            </v-col>
        </v-row>
        <!-- 검색 Frame -->
        <v-row>
            <v-col  cols="5">
                <v-text-field
                    class="input-keyword"
                    variant="standard"
                    maxlength="20"
                    bg-color="#EDE7F6"
                    :style="{ 'font-weight': 700 }"
                    v-model="searchKeyword"
                    placeholder="검색 키워드를 작성해주세요">
                </v-text-field>
            </v-col>
            <v-col cols="2">
                <v-btn @click="searchBoard">검색</v-btn>
            </v-col>
        </v-row>
        <!-- 글 목록   Frame-->
        <v-row>
            <!-- 글 목록 표시 -->
            <v-col cols="12">
                <v-list>
                    <v-list-item v-for="(data, idx) in paginatedNoticeList" :key="idx">
                        {{ (currentPage - 1) * noticePerPage + idx + 1 }}. {{ data.title }}
                        <NoticeBoard :noticeone="data"></NoticeBoard>
                    </v-list-item>
                </v-list>
            </v-col>
            <!-- 페이지네이션 -->
            <v-col cols="12">
                <v-pagination
                    v-model="currentPage"
                    :length="totalPages"
                    @input="paginate"
                    rounded="circle"></v-pagination>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import {api} from "@/common.js";
import {computed, onMounted, ref} from "vue";
import NoticeBoard from "@/components/board/noticeBoard.vue";

//페이징
let currentPage = ref(1); //현재 페이지
const noticePerPage = 10;  //페이지당 아이템 수
const noticeList = ref([]);

//페이징 관련 계산
//const totalPages = computed(() => Math.ceil(noticeList.value.length / noticePerPage));
const totalPages = computed(() => Math.ceil(noticeList.value.length / noticePerPage));

const paginatedNoticeList = computed(() => {
    const startIndex = (currentPage.value - 1) * noticePerPage;
    const endIndex = startIndex + noticePerPage;
    return noticeList.value.slice(startIndex, endIndex);
});

// 페이지 변경 시 호출되는 메서드
async function paginate(page) {
    currentPage.value = page;
    await getData(); // 페이지 변경 시 데이터 다시 조회
}

//검색
const searchKeyword = ref("");

//데이터 조회
const getData = async () => {
    console.log(currentPage.value);
    api("board/notice?page=" +
        currentPage.value+"&size=" +
        noticePerPage +
        "&keyword=" +
        searchKeyword.value,
        "GET")
        .then((response) => {
                if (response instanceof Error) {
                    let errorRes = response;
                    console.log(errorRes.response);
                    noticeList.value = [];
                } else {
                    console.log("response", response);
                    noticeList.value = response;
                    console.log("notice.value", noticeList.value);
                }
            }
        );
};
onMounted(async () =>{
    await  getData();
})
</script>

<style scoped>

</style>