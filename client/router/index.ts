import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'

const Async = () => import('../views/Async.vue')

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/async', name: 'async', component: Async }
  ]
})

export default router
