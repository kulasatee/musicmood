<template>
    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #131022;">
            <div class="container-fluid">
                <router-link to="/" class="navbar-brand mx-0 my-1" style="color: white; font-size: 2.25rem; cursor: pointer">
                    <img src="../assets/MusicMoodLOGO.png" alt="" width="52" height="52">
                    <span class="px-3">MusicMood</span>
                </router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                </ul>
                <form class="d-flex">
                    <a href="/login"><button class="btn btn-custom me-3" type="button" style="border-color:#6865F2; color: white; background-color: #6865F2">Log In</button></a>
                    <a href="/signup"><button class="btn btn-custom me-3" type="button" style="border-color:#6865F2; color:#6865F2">Sign Up</button></a>
                </form>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
  name: 'NavAno',
  props: {
    msg: String,
    path: String,
    role: Object
  },
  methods:{
      logout(){
          localStorage.clear()
          this.$router.replace('/')
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li > a:hover{
    color: #6865F2 !important
}

li > a:active{
    color: #6865F2 !important
}
</style>
