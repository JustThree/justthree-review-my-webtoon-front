import {
    reactive,
    computed,
    toRefs
} from 'vue';

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
        console.log(e);
        return { data: e}; //error 발생 시 e 반환
    })).data;
}

export {
    api, apiToken
};