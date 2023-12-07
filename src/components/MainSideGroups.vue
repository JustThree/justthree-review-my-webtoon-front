<script setup>
const title = defineProps(['title'])
</script>

<template>
  <v-sheet
      class="mx-auto"
      elevation="8"
      max-width="1300"
  >
    <h2 v-text="title.title"></h2>
    <v-slide-group
        v-model="model"
        class="pa-4"
        selected-class="bg-success"
        show-arrows
    >
      <v-slide-group-item
          v-for="n in 15"
          :key="n"
          v-slot="{ isSelected, toggle, selectedClass }"
      >
        <router-link to="/review">
        <v-card
            color="grey-lighten-1"
            image="https://i.namu.wiki/i/PZme727xUUxTIxQJxee2QY2apLmzmDnWdyY64-EkeSoKCevFv49ajTgFRa7EshOQElDUqd_q7ciUxWIjr13TQbcKKrGFgykJuituI2j2-ydDdSRwccfiGedO1pTtTsPl9Tzr3mXavBKJ6a0pDdcfJQ.webp"
            :class="['ma-4', selectedClass]"
            height="200"
            width="200"
            @click="toggle"
        >
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
</style>