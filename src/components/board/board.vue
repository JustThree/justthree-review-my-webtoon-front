<template>
<div class="d-flex align-center flex-column">

  <v-card
      variant="outlined"
      width="90%"
      :title="title"
      :subtitle="userNickname"
      :text="content"
      @click="$router.push(`/comm/${boardId}`)"  >
    <div>
        {{boardId}}
      {{created}}
    </div>
    <div style="display: flex; justify-content: flex-end;">
      <div>
        댓글수
      </div>
      <div>
        /조회수 {{viewCount}}
      </div>
    </div>
<!--    <div style="display: flex; justify-content: space-between;">
      <div>
        {{boardone.created}}
      </div>
      <div>
        {{boardone.viewCount}}
      </div>
    </div>-->
  </v-card>

</div>
</template>
<script setup>
import {toRef, toRefs, watchEffect} from "vue";

const props = defineProps({
  boardone: Object
});

const {boardId, title, content, created, noticeYn, updated, userEmail, userNickname, viewCount} = toRefs(props.boardone);

const pprops = toRef(props, "boardone");

watchEffect(()=>{
  boardId.value = pprops.value.boardId;
  title.value = pprops.value.title;
  created.value = pprops.value.created;
  updated.value = pprops.value.updated;
  userEmail.value = pprops.value.userEmail;
  userNickname.value = pprops.value.userNickname;
  viewCount.value = pprops.value.viewCount;
});
</script>

<style scoped>

</style>