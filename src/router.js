import Vue from 'vue'
import Router from 'vue-router'

import { UserLogic } from './modules/index'

import MainLayout from './components/MainLayout.vue'

import Index from './pages/Index.vue'
import Login from './pages/Login.vue'

Vue.use(Router)

var router = new Router({
    routes: [
        {
            path: '/',
            component: MainLayout,
            children: [
                {
                    name: 'index',
                    path: '',
                    component: Index,
                    meta: {
                        title: '首页',
                        auth: true
                    }
                }
            ]
        },
        {
            name: 'login',
            path: '/login',
            component: Login,
            meta: {
                title: '登录'
            }
        }
    ]
})
router.beforeEach((to, from, next) => {
    // 判断路由是否需要登录认证才能访问
    if (to.matched.some(record => record.meta.auth)) {
        UserLogic.isLogin().then(result => {
            result ? next() : next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
        })
    } else {
        next()
    }
})

export default router;
