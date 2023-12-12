<template>
  <v-card
      class="mx-auto"
      max-width="450"
  >
    <v-toolbar color="cyan-lighten-1">
      <v-btn variant="text" icon="mdi-menu"></v-btn>
      <v-toolbar-title>Inbox</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn variant="text" icon="mdi-magnify"></v-btn>
    </v-toolbar>

    <v-list :items="items" item-props lines="three">
      <template v-slot:subtitle="{ subtitle }">
        <div v-html="subtitle"></div>
      </template>
    </v-list>
  </v-card>
</template>
<script setup>

</script>

<style>

</style>