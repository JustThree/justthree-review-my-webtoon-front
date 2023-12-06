import { createRouter, createWebHistory } from 'vue-router'

import UserInfo from "@/pages/MyPage/UserInfo.vue";
import ChatDetailPage from "@/pages/Chat/ChatBoard.vue"

const router= createRouter({
    history: createWebHistory(),
    routes : [
        {path:'/userinfo',component:UserInfo},
        {path:'/chat',component:ChatDetailPage},


    ]
})

export default router;