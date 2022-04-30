<template>
    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #131022;">
            <div class="container-fluid">
                <a class="navbar-brand mx-0 my-1" href="/" style="color: white; font-size: 2.25rem">
                    <img src="../assets/MusicMoodLOGO.png" alt="" width="52" height="52">
                    <span class="px-3">MusicMood</span>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item" v-if="msg=='/room-list' || msg=='reservation-list'">
                        <a class="nav-link active px-5" aria-current="page" href="#" style="color: white; font-size: 1.25rem" :style="msg=='/room-list' ? {'color': '#6865F2'}:''">Room List</a>
                    </li>
                    <li class="nav-item px-5">
                        <a class="nav-link" href="#" v-if="msg=='/room-list' || msg=='reservation-list'" style="color: white; font-size: 1.25rem">Reservation status</a>
                    </li>
                    <li class="nav-item px-5">
                        <a class="nav-link" href="#" v-if="msg=='/staff' || msg=='/staff'" style="color: white; font-size: 1.25rem">Reservation list</a>
                    </li>
                </ul>
                <form class="d-flex">
                    <a href="/login"><button class="btn btn-custom me-3" type="button" style="border-color:#6865F2; color: white; background-color: #6865F2" v-if="msg=='/'">Log In</button></a>
                    <a href="/signup"><button class="btn btn-custom me-3" type="button" style="border-color:#6865F2; color:#6865F2" v-if="msg=='/'">Sign Up</button></a>
                    <div class="dropdown">
                        <button class="btn btn-custom dropdown-toggle" type="button" style="border-color:#6865F2; color:#6865F2" v-if="msg=='/room-list' || msg=='/reservation-list' || msg=='/reservation-status'" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-person-circle me-2"></i>Salinya</button>
                        <ul class="dropdown-menu" style="background-color:#1C192B" aria-labelledby="navbarDropdown">
                            <li class="py-1"><a class="dropdown-item text-white btn" href="/account-detail">My Account</a></li>
                            <li class="py-1"><a class="dropdown-item text-white btn" href="/edit-account-detail">Edit Account</a></li>
                            <li class="py-1"><hr class="dropdown-divider text-white"></li>
                            <li class="py-1"><a class="dropdown-item btn" style="color:#EF4444" href="/">Log Out <span class="float-end"><i class="bi bi-box-arrow-right"></i></span>
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
  name: 'NavCustomer',
  props: {
    msg: String
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
