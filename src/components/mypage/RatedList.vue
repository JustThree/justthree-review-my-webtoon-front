<template>
<section>
  <div>
  <header>
      <div><button></button></div>
      <div id="title">평가한 작품들</div>
  </header>
  <div>
      <ul>
        <div >전체</div>
        <div>별점순</div>
      </ul>
    </div>
  </div>
  <div id="listsection" class="responsive-list"><!--반응형 하려고 뷰티파이로 바꿈 -->
    <v-container>
      <v-row>
        <v-col v-for="(item, index) in rated.values" cols="1" >
          <div>
            <img :src="item.imageUrl" id="thumbnail">
          </div>
          <router-link :to="{path:`/`}" id="titletext">{{item.title}}</router-link><!--a태그 아래까지 감싸야 클릭 전체로 되는데 그러면 다른정보들이 안 불러와짐 왜이러노 -->
          <div id="tooninfo">
            {{ item.pictrWritrNm }} 별아이콘{{item.starVal}}.0
          </div>
        </v-col>
      </v-row>
    </v-container>

<!--    <ul v-for="(item,index) in rated.values" :key="index" id="webtoonlist">-->
<!--      <li v-for="item in getSlice(index)" :key="item.mastrId" id="ratedtoon">-->
<!--          <div>-->
<!--            <img :src="item.imageUrl" id="thumbnail">-->
<!--          </div>-->
<!--        <router-link :to="{path:`/`}" id="titletext">{{item.title}}</router-link>&lt;!&ndash;a태그 아래까지 감싸야 클릭 전체로 되는데 그러면 다른정보들이 안 불러와짐 왜이러노 &ndash;&gt;-->
<!--        <div id="tooninfo">-->
<!--          {{ item.pictrWritrNm }}-->
<!--          </div>-->
<!--      </li>-->
<!--    </ul>-->
<!--  </div>-->
  </div>
</section>
</template>

<script setup>
import {api} from '@/common.js'
import {defineProps, onBeforeMount, reactive} from "vue";

const props = defineProps(['usersId']);
let usersId=props.usersId;

let rated = reactive([]);

onBeforeMount( () => {
  console.log("start")
  try {
    api(`mypage/rated/${usersId}`, "GET", {})
        .then((resp) => {
          console.log(resp)
          rated.values=resp;
        })
    console.log("API Response:", rated);
  } catch (error) {
    console.error("API Error:", error);
  }
});

//10개씩 나오게
const getSlice = (index) => {
  const start = index * 13;
  const end = start + 13;
  return rated.values.slice(start, end);
};

</script>
<style scoped>
@import "@/assets/css/ratedlist.css";

@media screen and (max-width: 600px) {
  .responsive-list{
    flex-direction: column;
  }

  #webtoonlist{
    margin-right: 0;
    margin-bottom: 20px; /* Adjust as needed */
  }
}
</style>