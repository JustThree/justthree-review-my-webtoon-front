<script setup>

import { ref } from 'vue'

const variants = ['elevated']
const color = ref('#BEADFA')

</script>
<template>
  <v-container
      style="width: 100%; "
  >

    <v-row align="center" justify="center"
           style="height: 500px;
           width: 100%;"
           class="m-lg-2"
    >
        <v-card
            class="mx-auto card-all"
            height="100%"
            width="100%"
            :color="color"
            style="display: flex;
            flex-direction: column-reverse;
            background-repeat: no-repeat;
            background-size: 100%;
            background-position-y: 50%;
            background-image: url('https://i.namu.wiki/i/PZme727xUUxTIxQJxee2QY2apLmzmDnWdyY64-EkeSoKCevFv49ajTgFRa7EshOQElDUqd_q7ciUxWIjr13TQbcKKrGFgykJuituI2j2-ydDdSRwccfiGedO1pTtTsPl9Tzr3mXavBKJ6a0pDdcfJQ.webp')
"
        >
          <v-card-item>
            <div>
              <div class="text-h2 mb-1" style="margin: 0 0 10px 20px
                ">
                사쿠라 사쿠
              </div>
              <div class="text-h4" style="margin: 20px 0 10px 20px">사키사카 아오 <span>/로맨스</span></div>
            </div>
          </v-card-item>
        </v-card>
    </v-row>
    <v-row align="center" justify="center"
           style="min-height: 500px;
           width: 100%;"
           class="m-lg-2"
    >
    <v-card
        class="mx-auto"
        width="100%"
        height="400px"
        :color="'#F8F8F8'"
        style="display: flex"
    >
      <v-img
      src="https://i.namu.wiki/i/PZme727xUUxTIxQJxee2QY2apLmzmDnWdyY64-EkeSoKCevFv49ajTgFRa7EshOQElDUqd_q7ciUxWIjr13TQbcKKrGFgykJuituI2j2-ydDdSRwccfiGedO1pTtTsPl9Tzr3mXavBKJ6a0pDdcfJQ.webp"
      width="20%"
      height="100%"
      >
      </v-img>
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
              >3.2
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
        >
        <div style="padding: 20px 20px 20px 20px;
        margin: 20px 20px 20px 20px;
        font-size: 1.2em;
           ">
          눈에 띄지 않고, 있으나 없으나 마찬가지인 존재였던 후지가야 사쿠. 어느 날 전철에서 '사쿠라'라는 이름을 가진 사람에게 도움을 받은 사쿠는 그 일을 계기로 자신도 도움이 필요한 사람을 그냥 지나치지 않기로 결심한다. 시간이 흘러 입학한 고등학교에서 그녀는 '사쿠라'라고 불리는 소년을 만나는데…?! SAKURA, SAKU. ⓒ 2021 by Io Sakisaka/SHUEISHA Inc.
        </div>
          <div>
            <v-btn
                style="float: right;
                 margin-right: 10px"
                color="#BEADFA"
                elevation="4"
                rounded="sm"
                href="https://naver.com"
            >
              <span
                  style="color: #FFFFFF"
              >
              네이버
              </span>
            </v-btn>
          </div>

        </v-card>
      </v-card>

    </v-card>
    </v-row>
    <v-row align="center" justify="center"
           style="height: 300px;
           width: 100%;"
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
          <router-link to="/comment">
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
           width: 100%;"
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

          <v-row  no-gutters
                  v-for="(item,idx) in 2"
          >
            <v-col v-for="(itemCol,idxCol) in 4"
                   cols="3"
            >

              <v-sheet class="pa-2 ma-6 "
              >
                <v-card style="height: 300px;
                   background: #F2F2F2;"
                >
                  <v-container>
                    <v-row style="max-width: 300px;align-items: center;">
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


</style>