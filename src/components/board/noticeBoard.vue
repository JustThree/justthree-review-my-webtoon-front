<template>
<div class="d-flex align-center flex-column">

  <v-card variant="outlined"  width="90%"  @click="$router.push(`/comm/${boardId}`)"  >
      <div class="card-body" style="display: flex; justify-content: flex-start;">
          <div>번호</div>
          <div>{{title}}</div>
          <div>{{userNickname}}</div>
          <div>{{created}} 조회수 {{viewCount}}</div>
      </div>
  </v-card>

</div>
</template>
<script setup>
import {toRef, toRefs, watchEffect} from "vue";

const props = defineProps({
  noticeone: Object
});

const {boardId, title, userNickname, created, noticeYn, updated, viewCount} = toRefs(props.noticeone);

const pprops = toRef(props, "noticeone");

watchEffect(()=>{
  boardId.value = pprops.value.boardId;
  title.value = pprops.value.title;
  created.value = pprops.value.created;
  updated.value = pprops.value.updated;
  viewCount.value = pprops.value.viewCount;
});
</script>

<style scoped>

</style>