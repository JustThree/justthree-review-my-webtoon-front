import { createRouter, createWebHistory } from 'vue-router'

import UserInfo from "@/pages/MyPage/UserInfo.vue";
import UpdateUserInfo from "@/pages/MyPage/UpdateUserInfo.vue";

import ChatDetailPage from "@/pages/Chat/ChatBoard.vue"

import Login from "@/pages/Login.vue";
import Join from "@/pages/Join.vue";
import Main from "@/pages/Main/Main.vue";
import WebtoonReview from "@/pages/Main/WebtoonReview.vue";

//board(SY)
import createBoard from "@/pages/board/createBoard.vue"
import updateBoard from "@/pages/board/updateBoard.vue"

import WebtoonCommentList from "@/pages/Main/WebtoonCommentList.vue";

const router= createRouter({
    history: createWebHistory(),
    routes : [
        {path:'/',component:Main},
        {path:'/review',component:WebtoonReview},
        {path:'/comment',component:WebtoonCommentList},
        {path:'/userinfo',component:UserInfo},
        {path:'/chat/:masterId',component:ChatDetailPage},
        {path:'/login',component:Login},
        {path:'/join', component:Join},

        //board
        {path:'/post/new', component: createBoard},
        {path:'/post/edit/:boardId', component: updateBoard},

        {path:'/mypage/userinfo',component:UserInfo},
        {path:'/mypage/userinfo/updateuserinfo',component:UpdateUserInfo}]}
)

export default router;