<template>
<div class="d-flex align-center flex-column">
    <v-card variant="outlined" width="90%">
        <div class="card-header">
            <div class="title-wrapper">
              <span class="icon" v-if="replyUsersId === writerId">  글 작성자</span>
                <h3 class="title">{{ replyUserNickname }}</h3>
            </div>
            <p class="subtitle">{{ replyCreated }}</p>
        </div>
        <div class="card-body">
            <p>{{ boardReplyContent }}</p>
        </div>
        <div>
            {{boardReplyId}}
        </div>
        <div style="display: flex; justify-content: flex-end;">
            <div>        댓글 작성자 id {{replyUsersId}}      </div>
            <div> /   게시글 id {{boardId}}      </div>
            <div> /   부모 댓글 id {{parentReplyId}}</div>
        </div>
    </v-card>
    <!-- 대댓글 컴포넌트-->
</div>
</template>
<script setup>
import {toRef, toRefs, watchEffect} from "vue";

const props = defineProps({
    boardreply: Object,
    writerUsersId: Number,
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

</script>

<style scoped>

</style>