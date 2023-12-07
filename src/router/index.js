import { createRouter, createWebHistory } from 'vue-router'

import UserInfo from "@/pages/MyPage/UserInfo.vue";
import ChatDetailPage from "@/pages/Chat/ChatBoard.vue"

import Login from "@/pages/Login.vue";
import Join from "@/pages/Join.vue";

//board(SY)
import boardForm from "@/pages/board/boardForm.vue"


import Main from "@/pages/Main.vue";

const router= createRouter({
    history: createWebHistory(),
    routes : [
        {path:'/',component:Main},
        {path:'/userinfo',component:UserInfo},
        {path:'/chat',component:ChatDetailPage},
        {path:'/login',component:Login},
        {path:'/join', component:Join},

        //board
        {path:'/boardform', component: boardForm},


    ]
})

export default router;