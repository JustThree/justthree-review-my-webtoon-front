<script setup>


import MainSideGroups from "@/components/MainSideGroups.vue";
import {api} from "@/common.js";
import {ref} from "vue";


const data = ref([]);
const apiList = ["recent","recentend","fantasy","love","famous"]

for (const idx in apiList) {
  console.log(apiList[idx])
  api("api/webtoon/webtoonlist?keyword=" + apiList[idx],
      "GET",
  ).then((response) =>{
        data.value[idx] = response;
        console.log(data.value)
      }
  );
}



</script>

<template>
  <div>
    <main-side-groups :title="'최근 연재 시작한 웹툰'" :webtoons="data[0]"></main-side-groups>
  </div>
  <div>
    <main-side-groups :title="'최근 완결 웹툰'" :webtoons="data[1]"></main-side-groups>
  </div>
<!--  <div>-->
<!--    <main-side-groups :title="'화요일에 보기 좋은 웹툰'"></main-side-groups>-->
<!--  </div>-->
  <div>
    <main-side-groups :title="'#판타지'" :webtoons="data[2]"></main-side-groups>
  </div>
  <div>
    <main-side-groups :title="'#로맨스'" :webtoons="data[3]"></main-side-groups>
  </div>
  <div>
    <main-side-groups :title="'인기있는'" :webtoons="data[4]"></main-side-groups>
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
