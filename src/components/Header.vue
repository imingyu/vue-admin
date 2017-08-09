<template>
    <header class="header-main">
        <el-menu theme="dark" mode="horizontal">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-submenu index="2">
                <template slot="title">我的工作台</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
            </el-submenu>
            <el-menu-item index="3">
                <a href="javascript:void(0)" target="_blank">订单管理</a>
            </el-menu-item>
        </el-menu>
        <ul v-if="isLogin" class="user-menu">
            <li class="user-name">Hi {{userName}}</li>
            <li class="user-logout">
                <a href="javascript:void(0)" @click="logout">退出登录</a>
            </li>
        </ul>
        <slot></slot>
    </header>
</template>

<style lang="scss">
@import '../assets/style/mixin.scss';
.header-main {
    height: $ht-header;
    background: $clr-bg-top-menu;
    text-align: right;
    font-size: 14px;
    color: #fff;
    vertical-align: top;
    .el-menu {
        border-radius: 0;
        display: inline-block;
        text-align: left;
        margin-right: 100px;
    }
    .el-menu--horizontal .el-menu-item,
    .el-menu--horizontal .el-submenu .el-submenu__title {
        height: $ht-header;
        line-height: $ht-header;
    }
    .el-menu--horizontal .el-submenu>.el-menu {
        top: $ht-header+5px;
    }
    .user-menu{
        vertical-align: top;
        display: inline-block;
        list-style: none;
        margin: 0;
        padding: 0;
        >li{
            height: $ht-header;
            line-height: $ht-header;
            padding: 0 15px;
            display: inline-block;
        }
        a{
            color: inherit;
        }
        .user-logout:hover{
            background: #FF4949;
        }
    }
}
</style>


<script>
import { UserLogic } from '../modules/index';
export default {
    name: 'ComHeader',
    data() {
        return {
            isLogin: false,
            userName: ''
        }
    },
    methods: {
        logout() {
            UserLogic.logout();
        }
    },
    created() {
        UserLogic.isLogin().then(result => {
            if (result) {
                this.isLogin = true;
                var loginUser = UserLogic.getLoginUser();
                this.userName = loginUser.username;
            }
        })
    }
}
</script>
