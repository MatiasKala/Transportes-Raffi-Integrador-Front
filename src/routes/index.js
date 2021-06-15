import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Footer from '../components/FooterComponent.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/',component: Home},
  {path: '/footer',component: Footer}
]

const router = new VueRouter({
  routes
})

export default router
