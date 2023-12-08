<script setup>
import {ref, defineProps} from 'vue';
import { api } from '@/common.js';

const props = defineProps(['masterId']);
const masterId = props.masterId;

const title = ref("");
const genre = ref("");
const writer = ref("");
const painter = ref("");
const currentParticipants = ref("");

// api()

</script>

<template>
<body>
    <div>
        <h5>{{title}}</h5>
        <h6>{{ genre }} / {{ writer }}, {{ painter }}</h6>
        <h6>참여 인원 : {{currentParticipants}}</h6>
    </div>
</body>
</template>

<style scoped>
div{
    text-align: left;padding-inline-start:20px
}
h5{
    font-weight: 700;
}
h6{
    color: gray;
}
</style>