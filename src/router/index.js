import { createRouter, createWebHistory } from 'vue-router'

import UserInfo from "@/pages/MyPage/UserInfo.vue";
const router= createRouter({
    history: createWebHistory(),
    routes : [
        {path:'/userinfo',component:UserInfo},


    ]
})

export default router;