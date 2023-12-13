<template>
<div class="d-flex align-center flex-column">
    <v-card variant="outlined" width="90%">
        <div class="card-header">
            <div class="title-wrapper">
                <span class="icon" v-if="replyUsersId === writerId">  글 작성자</span>
                <h3 class="title">{{ replyUserNickname }}</h3>
            </div>
            <p class="subtitle">등록일자 {{ replyCreated }}</p>
            <!--     로그인한 유저(users_id)와 댓글 작성자(users_id)가 같을 경우     -->
            <div v-if="loginUsersId === replyUsersId">
                <v-btn variant="flat" @click="openUpdateModal">  수정  </v-btn>
                <v-btn variant="tonal" @click="delBoardReply">  삭제  </v-btn>
            </div>
        </div>
        <div class="card-body">
            <p>{{ boardReplyContent }}</p>
        </div>
        <div>
            boardReplyId
            {{boardReplyId}}
        </div>
        <div style="display: flex; justify-content: flex-end;">
            <div>        댓글 작성자 id {{replyUsersId}}      </div>
            <div> /   게시글 id {{boardId}}      </div>
            <div> /   부모 댓글 id {{parentReplyId}}</div>
        </div>
    </v-card>
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
import {api} from "@/common.js";
import {useRouter} from "vue-router";

//댓글 수정
const isUpdateModalOpen = ref(false);
const updatedReplyContent = ref('');

//수정 버튼 클릭 시 modal 열기
const openUpdateModal = () =>{
    updatedReplyContent.value = boardReplyContent.value;
    isUpdateModalOpen.value = true;
}
// modal 닫기
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
    console.log("부모 컴포넌트로 이동", editedReply);
    emit('saveUpdatedReply', editedReply);
    isUpdateModalOpen.value = false;
}

const router = useRouter();
const props = defineProps({
    boardreply: Object,
    writerUsersId: Number,
    loginUsersId: Number,
});
//console.log(props);
const {boardReplyId, boardId, boardReplyContent, replyCreated,
    replyUpdated, parentReplyId, replyUsersId, replyUserEmail,
    replyUserNickname, replyList, reReplyList} = toRefs(props.boardreply);
const pprops = toRef(props, "boardreply");
//console.log(pprops.value);
const writerId = props.writerUsersId;
//console.log(writerId);
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
//댓글 삭제 -> 부모 컴포넌트로 전달
const delBoardReply=()=>{
    const deletedReply = {"boardReplyId": boardReplyId.value };
    emit('delBoardReply', deletedReply);
}
</script>

<style scoped>
.card-header{
    margin: 2px;
    padding: 2px;
}
</style>