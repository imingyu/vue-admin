import './assets/style/base.scss'

import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './components/App'
import router from './router'

Vue.use(ElementUI);
Vue.config.productionTip = false

import Page from './components/Page'
Vue.use({
    install(v) {
        v.component(Page.name, Page);
    }
});

//初始化化Vue实例
var global = typeof window === 'object' ? window : this
global.$moduleMain = new Vue({
    el: '#moduleMain>.module-content',
    router,
    template: '<App/>',
    components: { App }
})

//组装系统变量appAgent
import { version } from 'json-loader!../package.json';
var env = process.env.NODE_ENV,
    userAgent = global.navigator.userAgent,
    appAgent = `${env} ${version}|${userAgent}`;

if (Object.defineProperty) {
    Object.defineProperty(global, '$appAgent', {
        value: appAgent
    })
} else {
    global.$appAgent = appAgent;
}