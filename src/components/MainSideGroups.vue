<script setup>
const props = defineProps(['title','webtoons'])
const title = props.title;

</script>

<template>
  <v-sheet
      class="mx-auto"
      elevation="8"
      max-width="1300"
  >
    <h2 v-text="title"></h2>
    <v-slide-group
        v-model="model"
        class="pa-4"
        selected-class="bg-success"
        show-arrows
    >
      <v-slide-group-item
          v-for="(itemWebtoon,indexWebtoon) in webtoons"
          :key="indexWebtoon"
          v-slot="{ isSelected, toggle, selectedClass }"
      >
        <router-link
            class="no-underline"
            :to="'/review/' + itemWebtoon.masterId">
        <v-card
          class="elevation-0"
            :class="['ma-4', selectedClass]"
            :width="200"
        >
          <v-img
              class="elevation-0"
              height="300"
              width="200"
              cover
              :src="itemWebtoon.imgUrl"
              @click="toggle"
          >

          </v-img>
          <div
              class="no-underline"
              v-text="itemWebtoon.title"
          ></div>
          <div class="d-flex fill-height align-center justify-center">
            <v-scale-transition>
              <v-icon
                  v-if="isSelected"
                  color="white"
                  size="48"
                  icon="mdi-close-circle-outline"
              ></v-icon>
            </v-scale-transition>
          </div>
        </v-card>

        </router-link>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
  <v-sheet
      class="mx-auto"
      elevation="8"
      max-width="1300"
  >
  </v-sheet>
</template>
<style scoped>
h2 {
  padding: 10px 0 0 10px;
}
.no-underline{
  text-decoration: none;
}
</style>