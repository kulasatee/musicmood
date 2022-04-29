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
    component: () => import('../views/Landing.vue') // set home as path '/'
  },
  {
    path: '/create-room',
    name: 'CreateRoomPage',
    component: () => import('../views/CreateRoom.vue') // set home as path '/'
  },
  {
    path: '/edit-room',
    name: 'EditRoomPage',
    component: () => import('../views/EditRoom.vue') // set home as path '/'
  },
  {
    path: '/room-detail',
    name: 'RoomDetailPage',
    component: () => import('../views/RoomDetail.vue') // set home as path '/'
  },
  {
    path: '/staff-room-detail',
    name: 'StaffRoomDetailPage',
    component: () => import('../views/StaffRoomDetail.vue') // set home as path '/'
  },
  {
    path: '/reservation-modal',
    name: 'ReservationModal',
    component: () => import('../views/ReservationModal.vue') // set home as path '/'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router