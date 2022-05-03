<template>
  <div id="app" style="background-color: #131022">
    <NavBarStaff :msg="$route.fullPath" class="pb-3" :path="'landing'" v-if="user_proxy() && user_proxy().role == 'staff'"/>
    <NavBarCustomer :msg="$route.fullPath" class="pb-3" v-if="user_proxy() && user_proxy().role == 'customer'"/>
    <NavBarAno :msg="$route.fullPath" class="pb-3" v-if="user_proxy() == null"/>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import NavBarAno from './components/NavBarAno'
import NavBarStaff from './components/NavBarStaff'
import NavBarCustomer from './components/NavBarCustomer'
import user from './js/script'

export default {
  name: 'App',
  components: {
    'NavBarStaff' :NavBarStaff,
    'NavBarCustomer' :NavBarCustomer,
    'NavBarAno' :NavBarAno,
  },
  data(){
    return {
      req_user: {},
    }
  },
  mounted(){
    this.req_user = JSON.parse(localStorage.getItem("user"))
    console.log(this.req_user)
    console.log(JSON.parse(localStorage.getItem("user")))
  },
  methods:{
    user_proxy: user
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
