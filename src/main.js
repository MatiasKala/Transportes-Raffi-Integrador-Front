import Vue from 'vue'
import App from './App.vue'
import store from './vuex-store'
import router from './routes'

import './forms'

import {BootstrapVue , IconsPlugin} from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@popperjs/core'
import './http'


Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
