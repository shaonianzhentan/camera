import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import './style/common.less'
Vue.use(MuseUI);

import Api from './api/index'
Vue.use(Api, {store,router})

Vue.config.productionTip = false

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
