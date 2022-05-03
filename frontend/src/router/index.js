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
    name: 'CreateRoomPage',
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
    path: '/edit-account-detail',
    name: 'EditAccountDetailPage',
    component: () => import('../views/EditAccountDetail.vue') // set home as path '/'
  },
  {
    path: '/change-password',
    name: 'ChangePasswordPage',
    component: () => import('../views/ChangePassword.vue') // set home as path '/'
  },
  {  
    path: '/edit-room/:id',
    name: 'EditRoomPage',
    component: () => import('../views/EditRoom.vue') // set home as path '/'
  },
  {
    path: '/room-detail/:id',
    name: 'RoomDetailPage',
    component: () => import('../views/RoomDetail.vue') // set home as path '/'
  },
  {
    path: '/reservation-list',
    name: 'ReservationList',
    component: () => import('../views/ReservationList.vue') // set home as path '/'
  },
  {
    path: '/reservation-modal',
    name: 'ReservationModal',
    component: () => import('../views/ReservationModal.vue') // set home as path '/'
  },
  {
    path: '/reservation-status',
    name: 'ReservationStatus',
    component: () => import('../views/ReservationStatus.vue') // set home as path '/'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router