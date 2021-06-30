import Vue from 'vue'
import App from './App.vue'

// import desde src/imports
import store from './imports/store'
import router from './imports/routes'
import './imports/forms'
import './imports/client'
import './imports/mixins'
import './imports/filters'

import {BootstrapVue , IconsPlugin} from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@popperjs/core'
import VueMoment from 'vue-moment'
Vue.use(VueMoment)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
