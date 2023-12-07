<template>
    <body>
        <div id='chatt'>
            <input type='text' v-model='sender' placeholder="닉네임을 입력해 주세요">
            <input type='text' v-model='masterId' placeholder="방이름">
            <input type='button' value='접속' @click="openSocket">
            <br />
            <div v-for="(item, index) in talk" :key="index" v-html="item"></div>
            <div id='sendZone'>
                <textarea v-model='contents'></textarea>
                <input type='button' value='전송' @click="send">
            </div>
        </div>

    </body>
</template> 
<script setup>
import {ref, onUnmounted} from 'vue';

const sender = ref("");
const masterId = ref("");
let talk = ref([]);
const contents = ref("");

let ws;
const openSocket = () => {
    // 기존 DB 채팅 내용 load
    
    // Connect WebSocket  
    ws = new WebSocket("ws://localhost:8089/chat/" + masterId.value);
    ws.onmessage = function (onmessage) {
        let data = JSON.parse(onmessage.data);
        let css;
        if (data.sender == sender.value) {
            // css = 'class=me';
            css = 'style=background:yellow;'
        } else {
            // css = 'class=other';
            css = 'style=background:gray;'
        }
        let item = `<div ${css}>
<span><b>${data.sender}</b></span> [ ${data.created} ]<br/>
<span>${data.contents}</span>
</div>`;
talk.value = [...talk.value, item]; // 배열에 추가
        // talk.scrollTop = talk.scrollHeight;//스크롤바 하단으로 이동
    }
}

const send = () => {
    let data = {};

    if (contents.value.trim() != '') {
        data.sender = sender.value;
        data.contents = contents.value;
        // data.token = sessionStorage.getItem("token");
        
        let temp = JSON.stringify(data);
        ws.send(temp);
    }
    contents.value = '';
}

onUnmounted(() => {
    if (ws) {
        ws.close();
    }
});

</script>