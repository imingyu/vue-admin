<template>
    <div class="login-box">
        <el-form :model="value">
            <el-form-item>
                <el-input v-model="value.username" auto-complete="off" placeholder="账号"></el-input>
            </el-form-item>
            <template v-if="!autoComplete">
                <el-form-item hidden>
                    <el-input name="username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item hidden>
                    <el-input type="password" name="password" auto-complete="off"></el-input>
                </el-form-item>
            </template>
            <el-form-item>
                <el-input type="password" v-model="value.password" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-button class="btn-block btn-login" type="success" :loading="loading" @click="submit">登录</el-button>
        </el-form>
    </div>
</template>

<style lang="scss">
.login-box {
    display: block;
    width: 100%;
}

.btn-login {
    padding: 15px;
    border-radius: 25px;
    font-size: 18px;
}

.el-input__inner {
    height: 50px;
    border-radius: 25px;
    background: none;
    color: inherit;
    font-size: 18px;
    text-align: inherit;

    &::-moz-placeholder {
        color: #fff;
        opacity: .2;
    }
    &:-ms-input-placeholder {
        color: #fff;
        opacity: .2;
    }
    &::-webkit-input-placeholder {
        color: #fff;
        opacity: .2;
    }
}
</style>


<script>
import { UserLogic } from '../modules/index'
export default {
    name: 'LoginBox',
    props: {
        autoComplete: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            loading: false,
            value: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        submit() {
            this.loading = true;
            var self = this,
                redirectUrl = self.$route.query.redirect;
            UserLogic.login(this.value).then(data => {
                self.loading = false;
                console.log(`redirectUrl=${redirectUrl}`);
                self.$router.push(redirectUrl ? redirectUrl : '/');
            })
        }
    }
}
</script>
