import { createRouter, createWebHistory } from 'vue-router'

import UserInfo from "@/pages/MyPage/UserInfo.vue";
import UpdateUserInfo from "@/pages/MyPage/UpdateUserInfo.vue";

import ChatDetailPage from "@/pages/Chat/ChatBoard.vue"
import TestUserInfo from "@/pages/TestUserInfo.vue"
import Login from "@/pages/Login.vue";
import Join from "@/pages/Join.vue";
import Main from "@/pages/Main/Main.vue";
import WebtoonReview from "@/pages/Main/WebtoonDetail.vue";

//board(SY)

import createBoard from "@/pages/board/createBoard.vue"
import updateBoard from "@/pages/board/updateBoard.vue"
import getBoard from "@/pages/board/getBoard.vue"
import commBoardList from "@/pages/board/commBoad.vue"


//mypage
import Interest from "@/pages/MyPage/Interest.vue";
import Rated from "@/pages/MyPage/Rated.vue";
import Reviewed from "@/pages/MyPage/Reviewed.vue";
import WebtoonCommentList from "@/pages/Main/WebtoonCommentList.vue";
import WebtoonList from "@/pages/Main/WebtoonList.vue";
import Search from "@/pages/Main/Search.vue";

const router= createRouter({
    history: createWebHistory(),
    routes : [
        {path:'/',component:Main},
        {path:'/webtoon/:masterId',component:WebtoonReview},
        {path:'/comment/:masterId',component:WebtoonCommentList},
        {path:'/webtoon',component:WebtoonList},
        {path:'/userinfo',component:UserInfo},
        {path:'/chat/:masterId',component:ChatDetailPage},
        {path:'/user/login',component:Login},
        {path:'/join', component:Join},
        {path:'/tui', component: TestUserInfo},
        {path:'/search', component:Search},

        //board
        {path:'/comm', component: commBoardList, name: 'commBoardList'},
        {path:'/comm/new', component: createBoard, name: 'newBoard'},
        {path:'/comm/edit/:boardId', component: updateBoard, name: 'updatedBoard'},
        {path:'/comm/:boardId', component: getBoard, name: 'boardOne'},

        {path:'/mypage/userinfo',component:UserInfo},
        {path:'/mypage/userinfo/updateuserinfo',component:UpdateUserInfo},

        //mypage
        //유저 정보 페이지
        {path:'/mypage/userinfo/:usersId',component:UserInfo},
        //유저 업데이트
        {path:'/mypage/userinfo/updateuserinfo',component:UpdateUserInfo},
        //평가 웹툰 목록
        {path:'/mypage/rated/:usersId',component:Rated},
        //웹툰 리뷰 목록
        {path:'/mypage/reviewed/:usersId',component:Reviewed},
        //관심 웹툰 목록
        {path:'/mypage/interested/:usersId',component:Interest},
    ]
})

export default router;