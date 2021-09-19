import Vue from 'vue'
import login from './login.vue'
import store from '@/store/index'
import Router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
    store,
    Router,
    render: h => h(login),
}).$mount('#login')
