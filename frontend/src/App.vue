<template>
  <div id="app" style="background-color: #131022">
    <NavBar :msg="$route.fullPath"/>
    <router-view :key="$route.fullPath" />
    <div>
      {{$route.fullPath}}
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBarCustomer'

export default {
  name: 'App',
  components: {
    NavBar
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
