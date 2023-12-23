<template>
  <v-container>
    <v-row>
      <v-col
          cols="6"
      >
        <canvas id="myChart1"></canvas>
      </v-col>
      <v-col
          cols="6"
      >
        <canvas id="myChart2"></canvas>
      </v-col>
      <v-col
          cols="6">
        <canvas id="myChart3"></canvas>
      </v-col>
      <v-col
          cols="6">
        <canvas id="myChart4"></canvas>
      </v-col>

    </v-row>
  </v-container>

</template>

<script setup>
import {Bar} from 'vue-chartjs'
import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'
import {api} from "@/common.js";
import Chart from 'chart.js/auto';
import {onMounted, ref} from "vue";
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const nickname1 = []
const followNum1 = []
const nickname2 = []
const followNum2 = []
const title3 = []
const rate3 = []
const title4 = []
const likeCount4 = []

onMounted(async () => {
  const [response1, response2, response3, response4] = await Promise.all([
    api("admin/followtop",
        "GET").then(
        (response) => response
    ),
    api("admin/followingtop",
        "GET").then(
        (response) => response
    ),
    api("admin/webtoonratetop",
        "GET").then(
        (response) => response
    ),
    api("admin/webtoonliketop",
        "GET").then(
        (response) => response
    )
  ])

  for (const idx in response1.content) {
    nickname1[idx] = response1.content[idx].usersNickname
    followNum1[idx] = response1.content[idx].followCount
  }
  for (const idx in response2.content) {
    nickname2[idx] = response2.content[idx].usersNickname
    followNum2[idx] = response2.content[idx].followCount
  }
  for (const idx in response3.content) {
    title3[idx] = response3.content[idx].title
    rate3[idx] = (response3.content[idx].rate)/2
  }
  for (const idx in response4.content) {
    title4[idx] = response4.content[idx].title
    likeCount4[idx] = response4.content[idx].likeCount
  }



  const ctx1 = document.getElementById('myChart1');
  const ctx2 = document.getElementById('myChart2');
  const ctx3 = document.getElementById('myChart3');
  const ctx4 = document.getElementById('myChart4');

  new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: nickname1,
      datasets: [{
        label: '팔로우 제일 많이 한 사람',
        data: followNum1,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: nickname2,
      datasets: [{
        label: '팔로우 제일 많이 된 사람',
        data: followNum2,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: title3,
      datasets: [{
        label: '평균 별점 순위',
        data: rate3,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  new Chart(ctx4, {
    type: 'bar',
    data: {
      labels: title4,
      datasets: [{
        label: '가장 많이 즐겨찾기 된 웹툰',
        data: likeCount4,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
})
</script>