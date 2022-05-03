<template>
    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #131022;">
            <div class="container-fluid">
                <div class="navbar-brand mx-0 my-1" @click="$router.push('/').catch(err => {
                    $router.go('/')
                })" style="color: white; font-size: 2.25rem">
                    <img src="../assets/MusicMoodLOGO.png" alt="" width="52" height="52">
                    <span class="px-3">MusicMood</span>
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link active px-5" aria-current="page" to="/room-list" style="color: white; font-size: 1.25rem" :style="compute_path=='/room-list' ? {'color': '#6865F2'}:''">Room List</router-link>
                    </li>
                    <li class="nav-item px-5">
                        <router-link class="nav-link" to="/reservation-list" style="color: white; font-size: 1.25rem">Reservation list</router-link>
                    </li>
                </ul>
                <form class="d-flex">
                    <div class="dropdown">
                        <button class="btn btn-custom dropdown-toggle" type="button" style="border-color:#6865F2; color:#6865F2" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-person-circle me-2"></i>Staff</button>
                        <ul class="dropdown-menu" style="background-color:#1C192B" aria-labelledby="navbarDropdown">
                            <li class="py-1"><a class="dropdown-item btn" style="color:#EF4444" @click="logout()">Log Out <span class="float-end"><i class="bi bi-box-arrow-right"></i></span>
                            </a></li>
                        </ul>
                    </div>
                    
                </form>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
  name: 'NavStaff',
  props: {
    msg: String,
    path: String
  },
  data() {
    return {
      now_path: ''
    };
  },
  methods:{
    logout(){
        console.log(this.$router)
        localStorage.clear()
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
