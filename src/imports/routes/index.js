import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Test from '@/views/Test.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/',component: Home},
  {path: '/test',component: Test},
  { path: '/test/:entidad', name: 'test', component: Test, props:true },
]

const router = new VueRouter({
  routes
})

export default router
