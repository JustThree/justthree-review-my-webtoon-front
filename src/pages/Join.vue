<script setup>

</script>

<template>
    <form method="post" action="http://localhost:8089/api/join" >
        <div class="formContainer">
            <input type="text" name="usersId" width="100px" placeholder="아이디" required>
            <input type="email" name="usersEmail" width="100px" placeholder="이메일" required>
            <input type="text" name="usersNickname" width="100px" placeholder="닉네임" required>
            <input type="password" name="usersPw" width="100px" placeholder="비밀번호" required>
            <input type="password" name="checkPw" width="100px" placeholder="재확인" required>
            <button class="btn btn-primary" type="submit">가입하기</button>
        </div>
    </form>
</template>

<style scoped>
    .formContainer{
        width: 60%;
        margin: auto;
        display: flex;
        flex-direction: column;
    }
</style>