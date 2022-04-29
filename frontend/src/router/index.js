import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/room-list',
    name: 'RoomListPage',
    component: () => import('../views/RoomList.vue') // set home as path '/'
  },
  {
    path: '/',
    name: 'LandingPage',
    component: () => import('../views/LandingPage.vue') // set home as path '/'
  },
  {
    path: '/create-room',
    name: 'Home',
    component: () => import('../views/CreateRoom.vue') // set home as path '/'
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('../views/LoginPage.vue') // set home as path '/'
  },
  {
    path: '/signup',
    name: 'SignupPage',
    component: () => import('../views/SignupPage.vue') // set home as path '/'
  },
  {
    path: '/account-detail',
    name: 'AccountDetailPage',
    component: () => import('../views/AccountDetail.vue') // set home as path '/'
  },
  {
    path: '/edit-account',
    name: 'EditAccountPage',
    component: () => import('../views/EditAccount.vue') // set home as path '/'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router