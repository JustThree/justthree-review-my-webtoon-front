import { createRouter, createWebHistory } from 'vue-router'

import UserInfo from "@/pages/MyPage/UserInfo.vue";
import Login from "@/pages/Login.vue";
import Join from "@/pages/Join.vue";
import Main from "@/pages/Main/Main.vue";
import WebtoonReview from "@/pages/Main/WebtoonReview.vue";
const router= createRouter({
    history: createWebHistory(),
    routes : [
        {path:'/',component:Main},
        {path:'/review',component:WebtoonReview},
        {path:'/userinfo',component:UserInfo},
        {path:'/login',component:Login},
        {path:'/join', component:Join},

    ]
})

export default router;