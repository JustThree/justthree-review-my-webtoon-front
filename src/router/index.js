import { createRouter, createWebHistory } from 'vue-router'

import UserInfo from "@/pages/MyPage/UserInfo.vue";
import UpdateUserInfo from "@/pages/MyPage/UpdateUserInfo.vue";
import ChatDetailPage from "@/pages/Chat/ChatBoard.vue"

import Login from "@/pages/Login.vue";
import Join from "@/pages/Join.vue";
import Main from "@/pages/Main/Main.vue";
import WebtoonReview from "@/pages/Main/WebtoonReview.vue";

//board(SY)
import boardForm from "@/pages/board/boardForm.vue"


const router= createRouter({
    history: createWebHistory(),
    routes : [
        {path:'/',component:Main},
        {path:'/review',component:WebtoonReview},
        {path:'/userinfo',component:UserInfo},
        {path:'/chat',component:ChatDetailPage},
        {path:'/login',component:Login},
        {path:'/join', component:Join},

        //board
        {path:'/boardform', component: boardForm},

        {path:'/mypage/userinfo',component:UserInfo},
        {path:'/mypage/userinfo/updateuserinfo',component:UpdateUserInfo}]}
)

export default router;