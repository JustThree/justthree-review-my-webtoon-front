import {
    reactive,
    computed,
    toRefs
} from 'vue';
import { storeToRefs } from 'pinia';
import axios from 'axios';

const apiToken = async (urn, method, data, token) => {
    const url = "http://localhost:8089/" + urn
    return (await axios({
        url,
        method,
        data,
        headers: {
            Authorization: token
        }
    }).catch(e => {
        console.log("http://localhost:8089/" + urn)
        console.log(e);
        return { data: e}; //error 발생 시 e 반환
    })).data
}
const api = async (urn, method, data) => {
    const url = "http://localhost:8089/" + urn;
    return (await axios({
        method: method,
        url,
        data
    }).catch(e => {
        /*const errResStatus = e.response.status;
        if (errResStatus === 401 || errResStatus === 403) {
            alert("권한이 없습니다. 로그아웃 되었습니다. 다시 로그인해주세요.");
            store.logout();
        }else if(errResStatus === 409){
            if(e.response.data.refresh === "true"){
                api("api/auth/accessoken", 'get', '').then(r  => {
                    user.value.accessToken = "Bearer " + r.toString();
                    alert("권한이 갱신되었습니다. 다시 시도 해주세요");

                }).catch(e => {
                    alert("권한이 만료되었습니다. 다시 로그인 해주세요.");
                    store.logout();
                });
            }
        }*/
        console.log(e);
        return { data: e}; //error 발생 시 e 반환
    })).data;
}

const createdDiff = (created) => {
    console.log(created)
    const createdDateTime = new Date(created)
    const diff = Date.now() - createdDateTime;

    const millisecondsPerMinute = 1000 * 60;
    const millisecondsPerHour = millisecondsPerMinute * 60;
    const millisecondsPerDay = millisecondsPerHour * 24;

    if (diff < millisecondsPerMinute) {
        return "방금 전";
    } else if (diff < millisecondsPerHour) {
        const minutes = Math.floor(diff / millisecondsPerMinute);
        return `${minutes}분 전`;
    } else if (diff < millisecondsPerDay) {
        const hours = Math.floor(diff / millisecondsPerHour);
        return `${hours}시간 전`;
    } else{
        return `${createdDateTime.getFullYear()}년 ${createdDateTime.getMonth()}월 ${createdDateTime.getDate()}일` ;
    }
}

export {
    api, apiToken, createdDiff
};