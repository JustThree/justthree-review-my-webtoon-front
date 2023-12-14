import axios from 'axios';
import { storeToRefs } from 'pinia';
import {api} from "@/common.js";
import {ref} from "vue";

axios.defaults.withCredentials = true;

export function setupAxiosInterceptors(store){
    
    const { user } = storeToRefs(store);


    // Request Interceptor
    axios.interceptors.request.use((config) => {
    /*    //변수 설정
        const isLoggedIn = user.value !== null; // 사용자 로그인 여부 확인
        const publicApiPaths = import.meta.env.VITE_PUBLIC_API_PATHS.split(','); // 로그인이 필요하지 않은 API 목록
        const requestPath = new URL(config.url).pathname;

        // 요청 경로가 로그인이 필요한 API 경로에 포함되지 않으면서 로그인이 되어 있는 경우
        if (isLoggedIn && !publicApiPaths.some(path => requestPath.startsWith(path))) {
            config.headers['Authorization'] = `Bearer ${user.value.accessToken}`; // 헤더에 Access 토큰 추가
        }

        // 토큰 재발급 요청 시
        if (requestPath === '/api/auth/accessoken') {
            config.headers['Authorization'] = `Bearer ${user.value.refreshToken}`; // Refresh 토큰으로 요청 헤더 설정
            config.headers['X-Refresh-Token'] = 'true';
        }*/
        const isLoggedIn = (null === user.value) ? false : true ;// 로그인 여부
        const publicApiPaths = import.meta.env.VITE_PUBLIC_API_PATHS.split(',');// 로그인이 필요하지 않은 API 목록
        // const isPublicApiPath = publicApiPaths.some(item => item.startsWith(new URL(config.url).pathname));
        const isPublicApiPath = publicApiPaths.includes(new URL(config.url).pathname); // 로그인이 필요하지 않은 API 여부
        const token = ref('');
        if (isLoggedIn && !isPublicApiPath){
            config.headers['Authorization'] = user.value.accessToken;
        }

        if (config.url === `${import.meta.env.VITE_SERVER_URL}/api/auth/accessoken`){
            config.headers['Authorization'] = user.value.refreshToken;
            config.headers['X-Refresh-Token'] = 'true';
        }

        return config;

    }, (error) => {
        // alert("rejected");
        // 요청 에러 처리
        return Promise.reject(error);
    });


    // Response Interceptor
    axios.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        const errResStatus = error.response.status;
        if (errResStatus === 401 || errResStatus === 403) {
            alert("권한이 없습니다. 로그아웃 되었습니다. 다시 로그인해주세요.");
            store.logout();
        }else if(errResStatus === 409){
            if(error.response.data.refresh === "true"){
                api("api/auth/accessoken", 'get', '').then(r  => {
                    user.value.accessToken = "Bearer " + r.toString();
                    alert("권한이 갱신되었습니다. 다시 시도 해주세요");

                }).catch(e => {
                    alert("권한이 만료되었습니다. 다시 로그인 해주세요.");
                    store.logout();
                });
            }
        }
        return Promise.reject(error);
    });
}