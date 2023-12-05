import { createRouter, createWebHistory } from 'vue-router'

import UserInfo from "@/pages/MyPage/UserInfo.vue";
import UpdateUserInfo from "@/pages/MyPage/UpdateUserInfo.vue";


const router= createRouter({
    history: createWebHistory(),

    routes : [
        {path:'/userinfo',component:UserInfo},
        {path:'/userinfo/updateuserinfo',component:UpdateUserInfo},

    ]
})

export default router;