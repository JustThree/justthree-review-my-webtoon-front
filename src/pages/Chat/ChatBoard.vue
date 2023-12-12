<script setup>
import ChatDetail  from "@/components/chat/ChatDetail.vue";
import ChatInfo  from "@/components/chat/ChatInfo.vue";

</script>

<template>

    <body style="text-align: -webkit-center; height: 100%;">
        <div class="chat">
            <ChatInfo :masterId="$route.params.masterId"></ChatInfo>
            <hr>
            <ChatDetail :masterId="$route.params.masterId"></ChatDetail>
        </div>

    </body>
</template>
<style scoped>
@import "@/assets/css/chat.css";

@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}

*{
    font-family: 'Pretendard-Regular';
}
</style>