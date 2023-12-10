<template>
    <section>
      <div id="layout">
          <v-col v-for="review in reviewed.values"  cols="7" >
        <div>
          <v-avatar size="24">
            <img src="@/assets/images/blackDUK.png" alt="profileimg" style="width: 100%">
          </v-avatar>
          <div>{{review.usersNickname}}</div>
        </div>

        <hr>

        <div>
          <div>
        <a><img :src="review.imageUrl"></a><!--웹툰 사진 -->
          </div>
          <div>
            <div>{{ review.title }}</div>
            <div>{{ review.pictrWritrNm }} {{review.sntncWritrNm}}</div>
            <v-card-text>{{review.content}}</v-card-text>

          </div>
        </div>
        <hr>
        <v-btn size="small" color="surface-variant" variant="text" icon="mdi-heart"></v-btn>{{review.reviewHeartCount}}
        <v-btn size="small" color="surface-variant" variant="text" icon="mdi-account"></v-btn>{{review.reviewReplyCount}}
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