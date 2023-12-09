<script setup>

import {ref} from 'vue'
import {api} from "@/common.js";
import {useRoute} from "vue-router";

const route = useRoute();
const color = ref('#BEADFA')
const data = ref([]);
const links = ref({
    platform:[],
    link:[]
});

// 화면 기초 정보
api("api/webtoon/"+ route.params.masterId,
    "GET",
).then((response) =>{
      data.value = response;
      if (response.links) {
        if (response.links.indexOf("_")>0) {
          const linkSplit = response.links.split("_")
          for (const linkSplitIdx in linkSplit) {
            links.value.platform[linkSplitIdx] = linkSplit[linkSplitIdx].split("$")[0]
            links.value.link[linkSplitIdx] = linkSplit[linkSplitIdx].split("$")[1]
          }

        } else {
          if (response.links[0].indexOf("$")) {
            console.log(response.links.split("$")[0])
            links.value.platform[0] = response.links.split("$")[0]
            links.value.link[0] = response.links.split("$")[1]
            console.log(links.value)
          }
        }
      }
    }
);
// 평점 구하기

// 리뷰 리스트 가져오기


// 별점 남기기 api


// 관심 등록 api

// 리뷰 api => 모달




</script>
<template>
  <v-container
      style="width: 85%;
      display: flex;
    flex-direction: column;
    align-items: center;"
  >

    <v-row align="center" justify="center"
           style="height: 500px;
           width: 100%;"
           class="m-lg-2"
    >
        <v-card
            class="mx-auto card-all image-header"
            height="100%"
            width="90%"
            :style="
            {
              backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),' +'url(' + data.imgUrl +')'
              }
            ">
          <v-card-item>
            <div>
              <div class="text-h2 mb-1" style="margin: 0 0 10px 20px; z-index:1;color:white"
                   v-text="data.title"
              >
              </div>
              <div class="text-h4" style="margin: 20px 0 10px 20px; z-index:1;color:white"
                   v-text="data.writer"
              ></div>
            </div>
          </v-card-item>
        </v-card>
    </v-row>
    <v-row align="center" justify="center"
           style="min-height: 600px;
           width: 90%;"
           class="m-lg-2"
    >
    <v-card
        class="mx-auto"
        width="100%"
        min-height="600px"
        :color="'#F8F8F8'"
        style="display: flex;
        align-items: center;
"
    >
      <div
          style="width:30%"
      >
        <v-img
          :src="data.imgUrl"
      height="300px"
      >
      </v-img>
      </div>
        <v-card
      width="70%"
      height="100%"
      >
        <v-card
            height="30%"
            style="display: flex"
        >
        <v-rating
            half-increments
            :length="5"
            size="x-large"
            :model-value="3"
            hover
            active-color="red"
            style="width: 40%;
            display: flex;
            align-items: center;
            justify-content: center;"
        >
        </v-rating>
          <v-card
            style="width: 60%;
            float: right;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10%;
            "
          >
            <v-container
                style="
                align-items: center;
            justify-content: center;"
            >
              <v-row style="
              align-items: center;
            justify-content: center;">
                <v-col>
                  <div>
              <div
                style="
                font-weight: bold;
                font-size: 2em;
                color: red;
                text-align: center;
                justify-content: center"
                v-text="data.avgRating"
              >
                </div>
                  </div>
                </v-col>
                <v-col class="flex-column" style="text-align: center">
            <v-icon
                color="gray "
                size="64"
                icon="mdi-plus-box"
            ></v-icon>
              </v-col>
                <v-col class="flex-column" style="text-align: center">
            <v-icon
                color="gray "
                size="64"
                icon="mdi-grease-pencil"
            ></v-icon>
              </v-col>
                <v-col class="flex-column" style="text-align: center">
            <v-icon
                color="gray"
                size="64"
                icon="mdi-wechat"
                style="justify-content: center"
            ></v-icon>
                </v-col>
            </v-row>
              <v-row style="
              align-items: center;
            justify-content: center;">
                <v-col class="flex-column " style="text-align: center">평균펼점</v-col>
                <v-col class="flex-column" style="text-align: center">관심등록</v-col>
                <v-col class="flex-column" style="text-align: center">리뷰쓰기</v-col>
                <v-col class="flex-column" style="text-align: center">채팅방</v-col>
              </v-row>
            </v-container>


          </v-card>
        </v-card>
        <v-card
            height="75%"
            style="
            min-height: 500px;"
        >
        <div id="outline" style="padding: 20px 20px 20px 20px;
        margin: 20px 20px 20px 20px;
        font-size: 1.2em;
        min-height: 400px;
           "
          v-text="data.outline"
        >
        </div>
          <div style="display:flex;
            flex-direction: row-reverse;"
          >
          <div
              v-for="(linkEle,linkIdx) in links.platform" :key="linkIdx"
          >


            <v-btn
                style="float: right;
                 margin-right: 10px"
                color="#5302FE"
                elevation="4"
                rounded="sm"
                :href="links.link[linkIdx]"
            >
              <span
                  style="color: #FFFFFF"
                v-text="links.platform[linkIdx]"
              >
              </span>
            </v-btn>
          </div>
          </div>
        </v-card>
      </v-card>

    </v-card>
    </v-row>
    <v-row align="center" justify="center"
           style="height: 300px;
           width: 90%;"
           class="m-lg-2"
    >
      <v-card
          class="mx-auto card-all"
          height="100%"
          width="100%"
          :color="color"
          style="display: flex; flex-direction: column;"
      >
        <v-card-item
            style="height: 60%;"
        >
            <div class="text-h2 mb-1 flex-column"
                 style="margin: 0 0 10px 20px;"
            >
              리뷰
            </div>

        </v-card-item>
        <v-card-item>
          <router-link :to="'/comment/' + route.params.masterId">
          <div class="text-h4 flex-row-reverse" style="margin: 20px;
          float: right"
          >
            더 보기
          </div>
          </router-link>
        </v-card-item>
      </v-card>
    </v-row>
    <v-row align="center" justify="center"
           style="
           width: 90%;"
           class="m-lg-2"
    >
      <v-card
          class="mx-auto card-all"
          height="100%"
          width="100%"
          :color="color"
          style="display: flex;
          flex-direction: column;"
      >
        <v-container class="bg-blue-grey-lighten-0"
                     style="background: #FFFFFF"
        >

            <v-row class="justify-center">
            <v-col v-for="(itemCol,idxCol) in 12"
                   cols="3"
                   style="min-width:300px"
            >
              <v-sheet class="pa-2 ma-6 "
              >
                <v-card style="height: 200px;
                   background: #F2F2F2;"
                >
                  <v-container>
                    <v-row style="width: 300px;align-items: center;">
                      <v-col class="v-col-9">
                      <v-avatar color="surface-variant"
                      >
                        <img src="http://localhost:5173/src/assets/images/blackDUK.png">
                      </v-avatar>
                      <span class="v-col-md-2" style="font-size: 14px">
                      똑똑한 청년
                      </span>
                      </v-col>
                      <v-col class="v-col-3 flex-column-reverse"
                      style="float: right;"
                      >
                      <v-icon
                              color="red "
                              icon="mdi-star"
                      ></v-icon>
                        <span style="color: red">4.5</span>
                      </v-col>


                    </v-row>
                  <v-divider></v-divider>
                    <v-row class="ma-lg-0"
                    style="max-width: 300px"
                    >
                  <v-col style="font-size: 14px
                   ;height: 70px
                   ;min-height: 100px"
                  >우효!~~~~~ 사쿠라쨩 다이스키!</v-col>
                    </v-row>
                  <v-divider></v-divider>
                    <v-row
                    style="max-width: 300px"
                    >
                  <v-col align-self="end"
                      style="margin-left: 5px">
                    <v-icon
                        class="v-col-md-2"
                        style="margin-right: 5px"
                        color="gray "
                        icon="mdi-thumb-up"
                    ></v-icon>
                    <span>23</span>
                    <v-icon
                        class="v-col-md-2"
                        style="margin-right: 5px"
                        color="gray "
                        icon="mdi-wechat"
                    ></v-icon>
                    <span>32</span>
                  </v-col>
                    </v-row>
                  <v-divider></v-divider>
                  </v-container>
                </v-card>
              </v-sheet>

            </v-col>
            </v-row>
        </v-container>

      </v-card>
    </v-row>
  </v-container>

</template>



<style scoped>

.image-header{
  display: flex;
  flex-direction: column-reverse;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position-y: 50%;

  z-index: 1;
}


</style>