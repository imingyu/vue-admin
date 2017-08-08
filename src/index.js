import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-default/index.css'

import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './components/App'
import router from './router'

Vue.use(ElementUI);
Vue.config.productionTip = false

var global = typeof window === 'object' ? window : this
global.$moduleMain = new Vue({
    el: '#moduleMain',
    router,
    template: '<App/>',
    components: { App }
})