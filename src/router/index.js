import { createRouter, createWebHistory } from 'vue-router'

import UserInfo from "@/pages/MyPage/UserInfo.vue";
import Login from "@/pages/Login.vue";
import Join from "@/pages/Join.vue";
//board(SY)
import boardForm from "@/pages/board/boardForm.vue"

const router= createRouter({
    history: createWebHistory(),
    routes : [
        {path:'/userinfo',component:UserInfo},
        {path:'/login',component:Login},
        {path:'/join', component:Join},
        //board
        {path:'/boardform', component: boardForm},
    ]
})

export default router;