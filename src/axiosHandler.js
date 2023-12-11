import axios from 'axios';
import { storeToRefs } from 'pinia';
import {api} from "@/common.js";

axios.defaults.withCredentials = true;

export function setupAxiosInterceptors(store){
    
    const { user } = storeToRefs(store);

    // Request Interceptor
    axios.interceptors.request.use((config) => {
        //변수 설정
        // alert("인터셉터 시작");
        // alert(new URL(config.url).pathname);

        const isLoggedIn = (null === user.value) ? false : true ;// 로그인 여부
        const publicApiPaths = import.meta.env.VITE_PUBLIC_API_PATHS.split(','); // 로그인이 필요하지 않은 API 목록
        const isPublicApiPath = publicApiPaths.includes(new URL(config.url).pathname); // 로그인이 필요하지 않은 API 여부

        let token;
        if (isLoggedIn && !isPublicApiPath){
            const tokenDto = JSON.parse(user.value.token);
            token = tokenDto.accessToken;
            // alert(token);
            config.headers['Authorization'] = token;
        }

        if (config.url === `${import.meta.env.VITE_SERVER_URL}/api/refresh`){
            const tokenDto = JSON.parse(user.value.token);
            token = tokenDto.refreshToken;
            config.headers['Authorization'] = token;
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
        // alert("response 도착");
        // console.log(response);
        return response;
    }, (error) => {
        const errResStatus = error.response.status;
        if (errResStatus === 401 || errResStatus === 403) {
            alert("권한이 없습니다. 로그아웃 되었습니다. 다시 로그인해주세요.")
            store.logout();
        }else if(errResStatus === 402){
            // alert("토큰 만료");
            // alert(error.response.data.refresh);
            if(error.response.data.refresh === "true"){
                // alert("refresh 재발급 필요");
                api("api/refresh", 'get', '').then(r  => {
                    // alert(r);
                    const tokenDto = JSON.parse(user.value.token);
                    tokenDto.refreshToken = r.data;

                    // alert("잠시중지");
                    // localStorage.setItem("accessToken") = r.data;
                });
            }
        }
        return Promise.reject(error);
    });
}