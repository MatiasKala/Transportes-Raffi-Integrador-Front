import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
// import Test from '@/views/Test.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import ManejoMaestros from '@/views/ManejoMaestros.vue'
import Viajes from '@/views/Viajes.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/',component: Home},
  // {path: '/test',component: Test},
  // {path: '/test/:entidad', name: 'test', component: Test, props:true },
  {path: '/login', name: 'login', component: Login },
  {path: '/register', name: 'register', component: Register },
  {path: '/manejoMaestros/:entidad', name: 'maestros', component: ManejoMaestros ,props:true},
  {path: '/viajes', name: 'viajes', component: Viajes ,props:true},
]

const router = new VueRouter({
  routes
})

export default router
