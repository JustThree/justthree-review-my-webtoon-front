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
           style="height: 250px;
           width: 100%;"
           class="m-lg-2"
    >
        <v-card
            class="mx-auto card-all"
            height="100%"
            width="100%"
            :color="color"
            style="display: flex; flex-direction: column-reverse;"
        >
          <v-card-item>
            <div>
              <div class="text-h2 mb-1" style="margin: 0 0 10px 20px">
                사쿠라 사쿠
              </div>
              <div class="text-h4" style="margin: 20px 0 10px 20px">사키사카 아오 <span>/로맨스</span></div>
            </div>
          </v-card-item>
        </v-card>
    </v-row>
    <v-row align="center" justify="center"
           style="height: 500px;
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
            height="25%"
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
            align-items: center;"
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
            <h2
                style="color: red"
            >3.2 <span style="font-size: 0.5em">점</span></h2>

            <v-icon
                color="gray "
                size="64"
                icon="mdi-plus-box"
            ></v-icon>
            <v-icon
                color="gray "
                size="64"
                icon="mdi-grease-pencil"
            ></v-icon>
            <v-icon
                color="gray"
                size="64"
                icon="mdi-wechat"
            ></v-icon>

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
          <div class="text-h4 flex-row-reverse" style="margin: 20px;
          float: right"
          >
            더 보기
          </div>
        </v-card-item>
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
        <v-container class="bg-surface-variant">
          <v-row no-gutters>
            <v-col order="last">
              <v-sheet class="pa-4 ma-2 ga-2">
                First, but last
              </v-sheet>
            </v-col>
            <v-col>
              <v-sheet class="pa-2 ma-2 ga-2">
                Second, but unordered
              </v-sheet>
            </v-col>
            <v-col order="first">
              <v-sheet class="pa-2 ma-2">
                Third, but first
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
        <v-container class="bg-surface-variant">
          <v-row no-gutters>
            <v-col order="last">
              <v-sheet class="pa-2 ma-2">
                First, but last
              </v-sheet>
            </v-col>
            <v-col>
              <v-sheet class="pa-2 ma-2">
                Second, but unordered
              </v-sheet>
            </v-col>
            <v-col order="first">
              <v-sheet class="pa-2 ma-2">
                Third, but first
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