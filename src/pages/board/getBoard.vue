<template>
  <v-container>
      <v-row class="frame-top">
          <v-col class="frame-title" cols="12">
              <div class="title-text">{{board.title}}</div>
<!--              <v-text-field
                  class="input-title"
                  variant="standard"
                  :style="{ 'font-weight': 700 }">
                  {{board.title}}
              </v-text-field>-->
          </v-col>
          <v-col class="frame-title" cols="2">
              <span>{{board.userNickname}}</span>
          </v-col>
          <v-col  class="frame-title" cols="3">
              <span> 등록일자 {{board.created}}</span>
          </v-col>
          <v-col class="frame-title" cols="1">
              <span>{{board.viewCount}}</span>
          </v-col>
          <v-col class="frame-title" cols="3">
              <v-btn
                  v-if="loginUsersId !== -1"
                  :variant="board.boardLikeYn ? 'outlined' : 'text'"
                  @click="toggleLike">
                  <v-icon left>{{ board.boardLikeYn ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                  {{ board.boardLikeYn ? '좋아요 취소' : '좋아요' }}
              </v-btn>
              <span>좋아요 수 {{ board.boardLikeCount }}</span>
          </v-col>
          <v-col v-if="loginUsersId === board.writerUsersId" class="frame-title" cols="4">
              <v-btn variant="flat" @click="gotoUpdateBoard">  수정  </v-btn>
              <v-btn variant="tonal" @click="delBoard">  삭제  </v-btn>
          </v-col>
      </v-row>
      <!-- 이미지 첨부파일   -->
      <v-row v-if="board.boardImgMapList.length>0">
          <div class="d-flex justify-space-around align-center bg-grey-lighten-4">
              <div class="ma-4" v-for="(imgMap, index) in board.boardImgMapList" :key="index" >
                  <div class="text-subtitle-2">{{imgMap.originName}}</div>
                  <v-img
                      class="bg-white"
                      width="300"
                      :src=imgMap.accessUrl
                      cover></v-img>
              </div>
          </div>
      </v-row>
      <!-- 게시글 내용 -->
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
      <!--  댓글 Div     -->
      <v-row v-if="$route.query.noticeYn !== '1'">
          <v-col cols="12">
              <div class="text-h5">
                  댓글  <span class="font-weight-bold">{{board.boardReplyList.length}}</span>개 </div>
          </v-col>
      </v-row>
      <v-row no-gutters v-if="$route.query.noticeYn !== '1'">
          <v-col cols="10" sm="6" md="4" align-self="stretch" >
              <v-text-field
                  v-model="txtReply"
                  placeholder="댓글을 입력해주세요"
                  variant="outlined">
              </v-text-field>
          </v-col>
          <v-col cols="2"  sm="6"  md="4" align-self="stretch">
                  <v-btn @click="submitReply" >등록</v-btn>
          </v-col>
      </v-row>
      <!--  댓글 목록   -->
      <v-row v-if="board.boardReplyList.length>0">
          <v-col cols="12">
              <div v-for="(data, idx) in board.boardReplyList" :key="idx">
                  <BoardReply
                      :boardreply="data"
                      :writer-users-id="board.writerUsersId"
                      :loginUsersId="loginUsersId"
                      :reReplyList = "board.reReplyList"
                      @delBoardReply="handleDeleteReply"
                      @saveUpdatedReply="handleUpdateReply"
                      @createReReply="handleCreateReReply">
                  </BoardReply>
              </div>
          </v-col>
      </v-row>
  </v-container>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {api} from "@/common.js";
import router from "@/router/index.js";
import BoardReply from "@/components/board/boardReply.vue";
import {useAuthStore} from "@/stores/auth.store.js";
import {storeToRefs} from "pinia";

const board = ref({
    title: '',
    content: '',
    boardFiles: [],
    noticeYn: 0,
    writerUsersId: 0,
    //기존 데이터 조회
    boardImgMapList: [new Map([[], []])],
    boardId: 0,
    boardReplyListObj:{},
    boardReplyList:[],
    replyList: [],
    reReplyList:[],
    boardLikeYn: false,
    boardLikeCount: 0,
});

const route = useRoute();
//const replyList = ref([]);

//로그인한 유저 확인
let loginUsersId = ref();

//Rereplylist
let boardreReplyList = ref([]);

//게시글 좋아요 버튼 관련
async function toggleLike() {
    console.log(board.value.boardLikeYn);
    if(!board.value.boardLikeYn) {  //좋아요 등록
        const response = await api("board/likes", "POST", {
            "users": {"usersId": loginUsersId.value},
            "boardId": board.value.boardId
        });
        if (response instanceof Error) {
            console.log(response.response.data); //서버에서 예외처리 필요
        } else {
            if (response) {
                console.log("좋아요 등록");
                await getData();
            } else {
                alert("등록 실패..");
            }
        }
    }else{ //좋아요 취소
        const response = await api("board/likes/"+board.value.boardId, "DELETE"); //apiToken으로 변경해야함
        if (response instanceof Error) {
            console.log(response.response.data); //서버에서 예외처리 필요
        } else {
            if (response) {
                console.log("좋아요 취소");
                await getData();
            } else {
                alert("삭제 실패..");
            }
        }
    }
}

//게시글 수정 버튼 클릭 시
function gotoUpdateBoard(){
    console.log(board.value.boardId);
    //router.push({ name: 'updateBoard', params: boardOne.boardId});
    //console.log(board.boardId);
    let bId = board.value.boardId;
    router.push({ name: 'updatedBoard', params: { bId}});
}
//게시글 삭제 버튼 클릭 시
async function delBoard(){
    if(confirm("정말 삭제하시겠습니까?")){
        //let bId = board.value.boardId;
        const response = await api("board/"+board.value.boardId, "DELETE"); //apiToken으로 변경해야함
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

//댓글 등록 버튼 클릭
const txtReply = ref('');
const submitReply = async () => {
    console.log(loginUsersId.value);
    if(!loginUsersId.value){
        alert("로그인해야 댓글 등록 가능합니다.");
        router.replace("/user/login");
        return;
    }
    if(!txtReply.value.trim()){
        alert('댓글을 입력해주세요');
        return;
    }
   const response = await api("board/reply", "POST", {
        "users" : {"usersId": loginUsersId.value},
        "boardId": board.value.boardId,
        "boardReplyContent": txtReply.value,
        "parentReplyId" : 0
    });
    if (response instanceof Error) {
        console.log(response.response.data); //서버에서 예외처리 필요
    } else {
        if (response) {
            console.log("성공");
            alert("댓글이 성공적으로 등록되었습니다.");
            txtReply.value="";
            await getData();
        } else {
            alert("등록 실패..");
        }
    }
}
//댓글 삭제 처리
const handleDeleteReply = async (delBoardReply) =>{
    console.log("삭제 예정", delBoardReply);
    console.log("삭제 예정", delBoardReply.boardReplyId);
    if(confirm("정말 삭제하시겠습니까?")){
        const response = await api("board/reply/"+delBoardReply.boardReplyId, "DELETE"); //apiToken으로 변경해야함
        if (response instanceof Error) {
            console.log(response.response); //서버에서 예외처리 필요
        } else {
            if (response) {
                console.log("삭제");
                alert("댓글이 삭제되었습니다.");
                await getData();
            } else {
                alert("삭제 실패..");
            }
        }
    }
};
//댓글 수정 처리
const handleUpdateReply = async (editedReply)=>{
    //console.log("수정 요청 예정", editedReply);
    if(!editedReply.updatedReplyContent.trim()){
        alert('내용을 입력해주세요');
        return;
    }
    const response = await api("board/reply/"+editedReply.boardReplyId, "PUT", {
        "users" : {"usersId": editedReply.replyUsersId},
        "boardId": editedReply.boardId,
        "boardReplyContent": editedReply.updatedReplyContent
    });
    if (response instanceof Error) {
        console.log(response.response);
    } else {
        if (response) {
           // console.log("성공");
            alert("댓글이 성공적으로 수정되었습니다.");
            await getData();
        } else {
            alert("수정 실패..");
        }
    }
}
//대댓글 등록 처리
const handleCreateReReply = async (newReReply)=>{
    console.log("newReReply", newReReply);
    if(!loginUsersId.value){
        alert("로그인해야 댓글 등록 가능합니다.");
        router.replace("/user/login");
        return;
    }
    if(!newReReply.boardReplyContent.trim()){
        alert('내용을 입력해주세요');
        return;
    }
    if(confirm("대댓글은 수정 및 삭제가 안됩니다. 등록하시겠습니까?")){
        const response = await api("board/reply", "POST", {
        "users" : {"usersId": loginUsersId.value},
        "boardId": newReReply.boardId,
        "boardReplyContent": newReReply.boardReplyContent,
        "parentReplyId" : newReReply.parentReplyId
        });
        if (response instanceof Error) {
            console.log(response.response.data); //서버에서 예외처리 필요
             } else {
            if (response) {
                console.log("성공");
                alert("댓글이 성공적으로 등록되었습니다.");
                await getData();
            } else {
                alert("등록 실패..");
            }
        }
    }
    else{
        return;
    }
}
//데이터 조회
const getData = async () =>{
    console.log(route.params.boardId);
    api("board/"+route.params.boardId, "GET")
        .then((response)=>{
            if(response instanceof Error){
                let errorRes = response;
                console.log(errorRes.response);
                //not found 글 목록으로 이동
            }else{
                console.log(response);
                board.value = response;
                // 댓글, 대댓글
                board.value.replyList = board.value.boardReplyList.filter(reply => reply.parentReplyId === 0);
                board.value.reReplyList = board.value.boardReplyList.filter(reply => reply.parentReplyId !== 0);
                boardreReplyList = board.value.reReplyList;
                if(board.value.boardImgMapList.length===0) {
                    board.value.boardFiles = [];
                }
            }
        })
};
onMounted(async () =>{
    const authStore = useAuthStore()
    const { user } = storeToRefs(authStore);
    console.log("user", user);
    if(user.value!==null){
        loginUsersId.value = user.value.usersId;
    }else {
        loginUsersId.value =-1;
    }
    console.log('loginUsersId', loginUsersId.value);
    console.log(loginUsersId.value);
    await getData();
});

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