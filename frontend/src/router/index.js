import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/room-list',
    name: 'RoomList',
    component: () => import('../views/RoomList.vue') // set home as path '/'
  },
  {
    path: '/',
    name: 'Landing',
    component: () => import('../views/Landing.vue') // set home as path '/'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router