<template>
<div class="d-flex align-center flex-column">

  <v-card
      variant="outlined"
      width="90%"
      :title="boardone.title"
      :subtitle="boardone.userNickname"
      :text="boardone.content"
      @click="$router.push(`/comm/${boardone.boardId}`)"  >
    <div>
      {{boardone.created}}
    </div>
    <div style="display: flex; justify-content: flex-end;">
      <div>
        댓글수
      </div>
      <div>
        /조회수 {{boardone.viewCount}}
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
const props = defineProps({
boardone: Object
});
//console.log(props.boardone);
</script>

<style scoped>

</style>