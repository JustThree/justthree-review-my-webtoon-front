<template>
<div class="d-flex align-center flex-column">
    <v-card v-if="parentReplyId === 0" variant="outlined"  class="card-reply">
        <div class="card-header">
            <div class="title-wrapper">
                <span class="icon" v-if="replyUsersId === writerId">  글 작성자</span>
                <h3 class="title">{{ replyUserNickname }}</h3>
            </div>
            <p class="subtitle">등록일자 {{ replyCreated }}</p>
            <div v-if="loginUsersId === replyUsersId">
                <v-btn variant="tonal" @click="openUpdateModal">  수정  </v-btn>
                <v-btn variant="tonal" @click="delBoardReply">  삭제  </v-btn>
            </div>
        </div>
        <div class="card-body">
            <p>{{ boardReplyContent }}</p>
        </div>
        <div v-if="parentReplyId===0">
            <v-btn variant="tonal" @click="openReReplyModal"> 대댓글 등록 </v-btn>
        </div>
        <div><!--삭제 예정-->
            boardReplyId
            {{boardReplyId}}
        </div>
        <div style="display: flex; justify-content: flex-end;">
            <div>        댓글 작성자 id {{replyUsersId}}      </div>
            <div> /   게시글 id {{boardId}}      </div>
            <div> /   부모 댓글 id {{parentReplyId}}</div>
        </div>
    </v-card>
    <!-- 대댓글 목록 -->
    <div v-for="reReply in reReplyList" :key="reReply.boardReplyId"  class="frame-card-rereply" >
        <template v-if="reReply.parentReplyId === boardReplyId">
            <v-card variant="outlined"  style="margin-top: 10px; background-color: #DFCCFB; ">
                <div class="card-header">
                    <div class="title-wrapper">
                        <span class="icon" v-if="reReply.replyUsersId === writerId">글 작성자</span>
                        <h3 class="title">{{ reReply.replyUserNickname }}</h3>
                    </div>
                    <p class="subtitle">등록일자 {{ reReply.replyCreated }}</p>
                </div>
                <div class="card-body">
                    <p>{{ reReply.boardReplyContent }}</p>
                </div>
                <div>
                    boardReplyId {{ reReply.boardReplyId }}
                </div>
                <div style="display: flex; justify-content: flex-end;">
                    <div>댓글 작성자 id {{ reReply.replyUsersId }}</div>
                    <div>/ 게시글 id {{ reReply.boardId }}</div>
                    <div>/ 부모 댓글 id {{ reReply.parentReplyId }}</div>
                </div>
            </v-card>
        </template>
    </div>
    <!-- 대댓글 등록 Modal   -->
    <v-dialog v-model="isReReplyModalOpen" max-width="500px">
        <v-card>
            <v-card-title>대댓글 등록</v-card-title>
            <v-card-text>
                <v-textarea
                    no-resize
                    clearable
                    clear-icon="mdi-close-circle"
                    v-model="createdReReplyContent"
                    label="댓글 내용"
                    rows="3">
                </v-textarea>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="createReReply">저장</v-btn>
                <v-btn @click="closeReReplyModal">취소</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- 댓글 수정 Modal   -->
    <v-dialog v-model="isUpdateModalOpen" max-width="500px">
        <v-card>
            <v-card-title>댓글 수정</v-card-title>
            <v-card-text>
                <v-textarea
                    no-resize
                    clearable
                    clear-icon="mdi-close-circle"
                    v-model="updatedReplyContent"
                    label="댓글 내용"
                    rows="3">
                </v-textarea>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="saveUpdatedReply">저장</v-btn>
                <v-btn @click="closeUpdateModal">취소</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>
<script setup>
import {ref, toRef, toRefs, watchEffect} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
const props = defineProps({
    boardreply: Object,
    writerUsersId: Number,
    loginUsersId: Number,
    reReplyList: Object,
});
const {boardReplyId, boardId, boardReplyContent, replyCreated,
    replyUpdated, parentReplyId, replyUsersId, replyUserEmail,
    replyUserNickname} = toRefs(props.boardreply);
const pprops = toRef(props, "boardreply");
const writerId = props.writerUsersId;

watchEffect(()=>{
    boardReplyId.value = pprops.value.boardReplyId;
    boardId.value = pprops.value.boardId;
    //writerUsersId.value = pprops.value.writerUsersId;
    boardReplyContent.value = pprops.value.boardReplyContent;
    replyCreated.value = pprops.value.replyCreated;
    replyUpdated.value = pprops.value.replyUpdated;
    parentReplyId.value = pprops.value.parentReplyId;
    replyUsersId.value = pprops.value.replyUsersId;
    replyUserEmail.value = pprops.value.replyUserEmail;
    replyUserNickname.value = pprops.value.replyUserNickname;
});
const emit = defineEmits([]);

//댓글 수정
const isUpdateModalOpen = ref(false);
const updatedReplyContent = ref('');

//수정 버튼 클릭 시 modal 열기
const openUpdateModal = () =>{
    updatedReplyContent.value = boardReplyContent.value;
    isUpdateModalOpen.value = true;
}
// 댓글 수정 modal 닫기
const closeUpdateModal = () =>{
    isUpdateModalOpen.value = false;
}
// (modal)댓글 수정 → 부모 컴포넌트로 전달
const saveUpdatedReply = () =>{
    // 수정된 댓글 내용을 저장하고 부모 컴포넌트로 전달
    const editedReply = {
        boardReplyId: boardReplyId.value,
        replyUsersId: replyUsersId.value,
        boardId: boardId.value,
        updatedReplyContent: updatedReplyContent.value
    };
    emit('saveUpdatedReply', editedReply);
    isUpdateModalOpen.value = false;
}
//대댓글 등록
const isReReplyModalOpen = ref(false);
const createdReReplyContent = ref('');

//대댓 등록 버튼 클릭 시 modal 열기
const openReReplyModal = () =>{
    isReReplyModalOpen.value = true;
}
//대댓글 modal 취소
const closeReReplyModal = () =>{
    createdReReplyContent.value = '';
    isReReplyModalOpen.value = false;
}
//대댓글 modal에서 등록(저장)
const createReReply = () =>{
    // 대댓글 내용을 저장하고 부모 컴포넌트로 전달
    const newReReply = {
        boardId: boardId.value,
        boardReplyContent: createdReReplyContent.value,
        parentReplyId: boardReplyId.value
    };
    emit('createReReply', newReReply);
    isReReplyModalOpen.value = false;
    createdReReplyContent.value = '';

}
//댓글 삭제 -> 부모 컴포넌트로 전달
const delBoardReply=()=>{
    const deletedReply = {"boardReplyId": boardReplyId.value };
    emit('delBoardReply', deletedReply);
}
</script>
<style scoped>
.card-reply{
    width: 100%;
    margin-top:  10px;
}
.frame-card-rereply{
    width: 100%;
}
.card-header{
    margin: 2px;
    padding: 2px;
}
</style>