<template>
    <v-container>
        <v-row>
            <v-tabs v-model="activeTab" active-class="custom-active-tab">
                <v-tab to="/boardslist/comm">커뮤니티</v-tab>
                <v-tab to="/boardslist/notice">공지사항</v-tab>
            </v-tabs>
            </v-row>
            <v-tabs-items v-model="activeTab">
                <v-tab-item>
                    <router-view></router-view>
                </v-tab-item>
            </v-tabs-items>
    </v-container>
</template>

<script setup>
import {ref} from "vue";

const activeTab = ref('/boardslist/comm');
</script>

<style scoped>
.custom-active-tab {
    background-color: #BEADFA;
    color: #ffffff;
}
</style>