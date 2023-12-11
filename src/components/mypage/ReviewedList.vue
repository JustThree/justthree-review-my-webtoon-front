<template>
    <section>
      <div id="layout">
          <v-col v-for="review in reviewed.values" id="section">
        <div id="review_uppercontent">
          <v-avatar size="24" id="profileimg">
            <img src="@/assets/images/blackDUK.png" alt="profileimg" style="width: 100%">
          </v-avatar>
          <div id="nickname">{{review.usersNickname}}</div>
        </div>

        <hr>

        <div id="midcontent">
          <div>
        <a id="image_a"><img :src="review.imageUrl" id="webtoonimg"></a><!--웹툰 사진 -->
          </div>
          <div id="midcontent_text">
            <div>{{ review.title }}</div>
            <div>{{ review.pictrWritrNm }} {{review.sntncWritrNm}}</div>
            <div>{{review.content}}</div>

          </div>
        </div>
        <hr>
            <div id="botcontetnt">
              <v-btn size="small" color="surface-variant" variant="text" icon="mdi-heart"></v-btn>{{review.reviewHeartCount}}
              <v-btn size="small" color="surface-variant" variant="text" icon="mdi-account"></v-btn>{{review.reviewReplyCount}}
            </div>
          </v-col>
      </div>
    </section>
</template>
<script setup>
import {api} from '@/common.js'
import {defineProps, onBeforeMount, reactive} from "vue";

const props = defineProps(['usersId']);
let usersId=props.usersId;
let reviewed = reactive([]);

onBeforeMount(()=>{
  console.log("start")
  try {
    api(`mypage/reviewed/${usersId}`,"GET",{})
        .then((resp)=>{
          console.log(resp)
          reviewed.values=resp;
        })
    console.log("API Response",reviewed);
  }catch (error){
    console.error("API Error",error);
  }
});
</script>
<style>
@import "@/assets/css/reviewed.css";

</style>