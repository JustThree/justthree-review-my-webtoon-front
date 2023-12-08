<script setup>


import MainSideGroups from "@/components/MainSideGroups.vue";
import {api} from "@/common.js";
import {ref} from "vue";


const data = ref([]);

api("api/webtoon/webtoonlist?keyword=" + "recent",
    "GET",
).then((response) =>{
  console.log(response)
      data.value[0] = response;
      console.log(data.value[0])
    }
);


</script>

<template>
  <div>
    <main-side-groups :title="'최근 연재 시작한 웹툰'" :webtoons="data[0]"></main-side-groups>
  </div>
  <div>
    <main-side-groups :title="'정주행하기 좋은 완결 웹툰'"></main-side-groups>
  </div>
  <div>
    <main-side-groups :title="'화요일에 보기 좋은 웹툰'"></main-side-groups>
  </div>
  <div>
    <main-side-groups :title="'#판타지'"></main-side-groups>
  </div>
  <div>
    <main-side-groups :title="'#로맨스'"></main-side-groups>
  </div>
  <div>
    <main-side-groups :title="'인기있는'"></main-side-groups>
  </div>
</template>
<script>

</script>

<style scoped >
div {
  margin: 20px 0 20px 0;
}
/* 스타일 작성 */
</style>
