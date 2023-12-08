<template>
    <body>
        
        <h6>참여 인원 : {{currentParticipants}}</h6>
        <div id='chatt'>
            <input type='text' v-model='sender' placeholder="닉네임을 입력해 주세요" required>
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
import {ref,  onBeforeMount,onUnmounted, defineProps} from 'vue';
import { api } from '@/common.js'
const props = defineProps(['masterId']);
const masterId = props.masterId;

const sender = ref("");
let talk = ref([]);
const contents = ref("");
const currentParticipants = ref("0");

let ws;
onBeforeMount(() => {
    // 기존 DB 채팅 내용 load
    api(`chats/list/${masterId}`, "GET", {})
    .then((resp) => {
        console.log(resp)
        resp.forEach(element => {
            formatMessage(element);
        });
    })

    // Connect WebSocket  
    ws = new WebSocket(`ws://localhost:8089/chat/${masterId}/users/123`);
    // 2022008592
    // 2022008651

    // sender -> sessionStorage(token) 변경 예정
    ws.onmessage = function (onmessage) {
        console.log(onmessage)
        let data = JSON.parse(onmessage.data);
        if(data.currentParticipants == undefined){
            formatMessage(data);
        }else{
            currentParticipants.value = data.currentParticipants;        
        }
    }

})

const formatMessage = (msg) => {

    let css;
    if (msg.senderNickname == sender.value) {
        // css = 'class=me';
        css = 'style=background:yellow;'
    } else {
        // css = 'class=other';
        css = 'style=background:gray;'
    }
    let item = `<div ${css}>
            <span><b>${msg.senderNickname}</b></span> [ ${msg.created} ]<br/>
            <span>${msg.contents}</span>
            </div>`;

    talk.value = [...talk.value, item];

}

const send = () => {

    if (contents.value.trim() != '') {
        ws.send(contents.value);
    }
    contents.value = '';
}

onUnmounted(() => {
    if (ws) {
        ws.close();
    }
});

</script>