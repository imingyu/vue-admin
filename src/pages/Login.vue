<template>
    <div class="page page-login">
        <div class="scrub-box"></div>
        <div class="login-container">
            <h1>欢迎你</h1>
            <h6>请输入您的账号和密码进行登录</h6>
            <LoginBox></LoginBox>
        </div>
    </div>
</template>

<style lang="scss">
.page-login {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;

    .scrub-box {
        background: url('../assets/cover.jpg') no-repeat center fixed;
        background-size: cover;
        filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=20, MakeShadow=false);
        filter: blur(20px);
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
    }

    $loginBoxWidth:400px;
    .login-container {
        width: 40%;
        min-width: $loginBoxWidth;
        max-width: $loginBoxWidth;
        position: relative;
        z-index: 2;
        color: #fff;
        text-align: center;

        >h1{
            font-weight: normal;
            margin-bottom: 20px;
            font-size: 32px;
        }
        >h6{
            font-weight: normal;
            margin-bottom: 30px;
            font-size: 14px;
        }
    }
}
</style>

<script>
import LoginBox from '../components/LoginBox'
export default {
    name: 'Login',
    components: {
        LoginBox
    }
}
</script>

