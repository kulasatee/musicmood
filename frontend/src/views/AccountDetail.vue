<template>
  <div class="container pt-5">
      <div class="row justify-content-center">
          <div class="col-10">
            <div class="row justify-content-center">
                <div class="col-6 px-5" style="z-index: 1">
                    <div class="d-flex flex-column text-start">
                        <div class="h1 text-white" style="font-size: 3rem">
                            {{account.username}} Account
                        </div>
                        <div class="d-flex flex-row mt-4">
                                <div class="text-white me-2" style="font-size: 1rem;">
                                    <label for="firstname" class="form-label text-white">First name</label>
                                    <input type="text" class="form-control form-control-lg input-bg " disabled id="firstname" v-model="account.firstname">
                                </div>
                                <div class="text-white ms-2" style="font-size: 1rem;">
                                    <label for="lastname" class="form-label text-white">Last name</label>
                                    <input type="text" class="form-control form-control-lg input-bg " disabled id="lastname" v-model="account.lastname">
                                </div>
                        </div>
                        <div class="text-white mt-4" style="font-size: 1rem">
                            <label for="phonenumber" class="form-label text-white">Phone number</label>
                            <input type="text" class="form-control form-control-lg input-bg " disabled id="phonenumber" v-model="account.phone">
                        </div>
                        <div class="text-white mt-4" style="font-size: 1rem">
                            <label for="username" class="form-label text-white">Username</label>
                            <input type="text" class="form-control form-control-lg input-bg " disabled id="username" v-model="account.username">
                        </div>
                        <div class="mt-5 text-center" type="button" style="font-size: 1rem;">
                            <router-link to="/edit-account-detail" class="text-white py-2 rounded" style="text-decoration: none; background-color: #6366F1; display: block">EDIT PROFILE</router-link>
                        </div>
                        <div class="mt-4 text-center rounded" style="font-size: 1rem; border: solid 1px; border-color: #6366F1">
                            <router-link to="/room-list" class="py-2 rounded" style="text-decoration: none; color: #6366F1; display: block">BACK</router-link>
                        </div>
                    </div>
                </div>
            </div>
          </div>
      </div>
      <div class="circle1"></div>
    <div class="circle2"></div> 
  </div>
</template>

<script>
import {} from 'bootstrap';
import axios from "../plugins/axios";
export default {
  name: "LoginPage",
  data () {
    return {
        account: {}
        
    };
  },
  async created(){
    try{
      var res = await axios.post("/account", JSON.parse(localStorage.getItem("user")))
      this.account = res.data
      console.log(this.account)
    }catch(err){
      console.log(err)
    }
  }
};
</script>

<style scoped>
.linear-color {
  background: -webkit-linear-gradient(180deg, #d647ef, #6865f2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
input{
    z-index: 2;
}
input:disabled{
    background-color: rgba(31, 28, 45, 0.1); 
    border-color: #5C5B64;
    border-width: 0.5px;
    color:#ffffff;
}
.circle1 {
  position: absolute;
  width: 10rem;
  height: 10rem;
  left: 55rem;
  top: 5rem;

  background: #D647EF;
  mix-blend-mode: normal;
  filter: blur(135px);
}
.circle2 {
  position: absolute;
  width: 10rem;
  height: 10rem;
  left: 65rem;
  top: 13rem;

  background: #6366F1;
  mix-blend-mode: normal;
  filter: blur(135px);
}
input:focus {
    background-color: #1F1C2D;
    color: white;
  }
textarea:focus {
    background-color: #1F1C2D;
    color: white;
  }
</style>