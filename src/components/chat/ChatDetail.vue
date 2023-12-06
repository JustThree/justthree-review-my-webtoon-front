<template>
    <body>
        <div id='chatt'>
            <input type='text' v-model='mid' placeholder="닉네임을 입력해 주세요">
            <br />
            <div v-for="(item, index) in talk" :key="index" v-html="item"></div>
            <div id='sendZone'>
                <textarea v-model='msg'></textarea>
                <input type='button' value='전송' @click="send">
            </div>
        </div>

    </body>
</template> 
<script setup>
import {ref, onMounted} from 'vue';

const mid = ref("");
let talk = ref([]);
const msg = ref("");
let ws;
onMounted(() => {
    // 기존 DB 채팅 내용 load
    
    // Connect WebSocket  
    ws = new WebSocket("ws://" + "localhost:8089" + "/chat");
    ws.onmessage = function (onmessage) {
        let data = JSON.parse(onmessage.data);
        let css;
        if (data.mid == mid.value) {
            // css = 'class=me';
            css = 'style=background:yellow;'
        } else {
            // css = 'class=other';
            css = 'style=background:gray;'
        }
        let item = `<div ${css}>
<span><b>${data.mid}</b></span> [ ${data.date} ]<br/>
<span>${data.msg}</span>
</div>`;
talk.value = [...talk.value, item]; // 배열에 추가
        // talk.scrollTop = talk.scrollHeight;//스크롤바 하단으로 이동
    }
})


const send = () => {
    let data = {};

    if (msg.value.trim() != '') {
        data.mid = mid.value;
        data.msg = msg.value;
        data.token = sessionStorage.getItem("token");
        data.date = new Date();
        let temp = JSON.stringify(data);
        ws.send(temp);
    }
    msg.value = '';
}
</script>