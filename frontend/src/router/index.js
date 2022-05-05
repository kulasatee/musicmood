import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/room-list',
    name: 'RoomListPage',
    component: () => import('../views/RoomList.vue') // set home as path '/'
    // ทุกคนเข้าได้
  },
  {
    path: '/',
    name: 'LandingPage',
    component: () => import('../views/LandingPage.vue') // set home as path '/'
    // ทุกคนเข้าได้
  },
  {
    path: '/create-room',
    name: 'CreateRoomPage',
    meta: {
      staff: true,
      guess: true
    },
    component: () => import('../views/CreateRoom.vue') // set home as path '/'
    // staff เท่านั้น
  },
  {
    path: '/login',
    name: 'LoginPage',
    meta: {
      login: true
    },
    component: () => import('../views/LoginPage.vue') // set home as path '/'
    // อะโนนีมัส เท่านั้น
  },
  {
    path: '/signup',
    name: 'SignupPage',
    meta: {
      login: true
    },
    component: () => import('../views/SignupPage.vue') // set home as path '/'
    // อะโนนีมัส เท่านั้น
  },
  {
    path: '/account-detail',
    name: 'AccountDetailPage',
    meta: {
      customer: true,
      guess: true
    },
    component: () => import('../views/AccountDetail.vue') // set home as path '/'
    // customer เท่านั้น
  },
  {
    path: '/edit-account-detail',
    name: 'EditAccountDetailPage',
    meta: {
      customer: true,
      guess: true
    },
    component: () => import('../views/EditAccountDetail.vue') // set home as path '/'
    // customer เท่านั้น
  },
  {
    path: '/change-password',
    name: 'ChangePasswordPage',
    meta: {
      customer: true,
      guess: true
    },
    component: () => import('../views/ChangePassword.vue') // set home as path '/'
    // customer เท่านั้น
  },
  {  
    path: '/edit-room/:id',
    name: 'EditRoomPage',
    meta: {
      staff: true,
      guess: true
    },
    component: () => import('../views/EditRoom.vue') // set home as path '/'
    // staff เท่านั้น
  },
  {
    path: '/room-detail/:id',
    name: 'RoomDetailPage',
    component: () => import('../views/RoomDetail.vue') // set home as path '/'
    // ทุกคนเข้าได้
  },
  {
    path: '/reservation-list',
    name: 'ReservationList',
    meta: {
      staff: true,
      guess: true
    },
    component: () => import('../views/ReservationList.vue') // set home as path '/'
    // staff เท่านั้น
  },
  {
    path: '/reservation-status',
    name: 'ReservationStatus',
    meta: {
      customer: true,
      guess: true
    },
    component: () => import('../views/ReservationStatus.vue') // set home as path '/'
    // customer เท่านั้น
  },
  {
    path: '*',
    name: 'ErrorPage',
    component: () => import('../views/ReservationStatus.vue') // set home as path '/'
    // ทุกคนเข้าได้
  },
  {
    path: '*',
    name: 'ErrorPage',
    component: () => import('../views/ErrorPage.vue') // set home as path '/'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
   const isLoggedIn = JSON.parse(localStorage.getItem('user'))
   console.log(isLoggedIn)
 
   if (to.meta.login && isLoggedIn) {
     alert("You've already logged in!")
     next({ path: '/' })
   }

   if (to.meta.guess && !isLoggedIn) {
    alert("You've not logged in!")
    next({ path: '/' })
  }
 

   if (to.meta.staff && (isLoggedIn.role != 'staff')) {
     alert("You're not staff!")
     next({ path: '/'})
   }

   if (to.meta.customer && (isLoggedIn.role != 'customer')) {
    alert("You're not customer!")
    next({ path: '/'})
  }
 
  next()
})

export default router