<template>
  <v-container>
    <v-row>
      <v-col
        cols="6"
      >
        <div
        >
          <Bar
              id="my-chart-id1"
              :options="chartOptions1"
              :data="chartData1"
          />
        </div>
      </v-col>
      <v-col
          cols="6"
      >
        <div
        >
          <Bar
              id="my-chart-id2"
              :options="chartOptions2"
              :data="chartData2"
          />
        </div>
      </v-col>
      <v-col
          cols="6">
        <div
        >
          <Bar
              id="my-chart-id3"
              :options="chartOptions3"
              :data="chartData3"
          />
        </div>
      </v-col>
      <v-col
          cols="6">
        <div
        >
          <Bar
              id="my-chart-id4"
              :options="chartOptions4"
              :data="chartData4"
          />
        </div>
      </v-col>

    </v-row>
  </v-container>

</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import {api} from "@/common.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const label1 = [0,0,0,0,0]
const count1 = [0,0,0,0,0]
const label2 = [0,0,0,0,0]
const count2 = [0,0,0,0,0]
const label3 = [0,0,0,0,0]
const count3 = [0,0,0,0,0]
const label4 = [0,0,0,0,0]
const count4 = [0,0,0,0,0]
export default {
  name: 'BarChart',
  components: { Bar },
  data() {

    api("admin/followtop",
        "GET").then(
        (response) => {
          for (const idx in response.content) {
            label1[idx] = response.content[idx].usersNickname
            count1[idx] = response.content[idx].followCount
          }
        }
    )
    api("admin/followingtop",
        "GET").then(
        (response) => {
          for (const idx in response.content) {
            label2[idx] = response.content[idx].usersNickname
            count2[idx] = response.content[idx].followCount
          }
        }
    )
    api("admin/webtoonratetop",
        "GET").then(
        (response) => {
          for (const idx in response.content) {
            label3[idx] = response.content[idx].title
            count3[idx] = Number.parseFloat(response.content[idx].rate)/2
          }
        }
    )
    api("admin/webtoonliketop",
        "GET").then(
        (response) => {
          for (const idx in response.content) {
            label4[idx] = response.content[idx].title
            count4[idx] = response.content[idx].likeCount
          }
        }
    )

    return {
      chartData1: {
        labels: label1,
        datasets: [
            { data: count1,
              label: '유저',
              backgroundColor:['#5041BC','#8F7CEE','#8F7CEE','#8F7CEE','#8F7CEE',]
            } ]
      },
      chartOptions1: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: '팔로우 가장 많이 한 유저',
          },
          deferred: {
            delay: 500
          },
        },
      },
      chartData2: {
        labels: label2,
        datasets: [
          { data: count2,
            label: '유저',
            backgroundColor:['#11235A','#596FB7','#596FB7','#596FB7','#596FB7',]
          } ]
      },
      chartOptions2: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: '가장 많이 팔로윙 된 유저',
          },
          deferred: {
            delay: 500
          },
        }
      },
      chartData3: {
        labels: label3,
        datasets: [
          { data: count3,
            label: '웹툰',
            backgroundColor:['#C21292','hotpink','hotpink','hotpink','hotpink',]
          } ]
      },
      chartOptions3: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: '가장 평점 좋은 웹툰',
          },
          deferred: {
            delay: 500
          },
        }
      },
      chartData4: {
        labels: label4,
        datasets: [
          { data: count4,
            label: '웹툰',
            backgroundColor:['red','#EA906C','#EA906C','#EA906C','#EA906C',]
          } ]
      },
      chartOptions4: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: '즐겨찾기 많이 된 웹툰',
          },
          deferred: {
            delay: 500
          },
        }
      }
    }
  }
}





</script>