<template>
  <div class="container pt-5">
      <div class="row justify-content-center">
          <div class="col-10">
            <div class="row justify-content-center">
                <div class="col-6 px-5" style="z-index: 1">
                    <div class="d-flex flex-column text-start">
                        <div class="h1 text-white" style="font-size: 3rem">
                            Edit Account
                        </div>
                        <div class="d-flex flex-row mt-4">
                                <div class="text-white me-2" style="font-size: 1rem;">
                                    <label for="firstname" class="form-label text-white">First name</label>
                                    <input type="text" class="form-control form-control-lg input-bg " id="firstname" v-model="account.firstname">
                                </div>
                                <div class="text-white ms-2" style="font-size: 1rem;">
                                    <label for="lastname" class="form-label text-white">Last name</label>
                                    <input type="text" class="form-control form-control-lg input-bg " id="lastname" v-model="account.lastname">
                                </div>
                        </div>
                        <div class="text-white mt-4" style="font-size: 1rem">
                            <label for="phonenumber" class="form-label text-white">Phone number</label>
                            <input type="text" class="form-control form-control-lg input-bg " id="phonenumber" v-model="account.phone">
                        </div>
                        <div class="text-white mt-4" style="font-size: 1rem">
                            <label for="username" class="form-label text-white">Username</label>
                            <input type="text" class="form-control form-control-lg input-bg " disabled id="username" v-model="account.username">
                        </div>
                        <div class="text-white mt-4 fw-light" style="font-size: 1rem">
                            <router-link to="/change-password" class="ps-1" style="color: #6865F2; text-decoration: underline">Change my password</router-link>
                        </div>
                        <div class="mt-5 text-center" type="button" style="font-size: 1rem;">
                            <div class="text-white py-2 rounded" style="text-decoration: none; background-color: #6366F1; display: block" @click="saveEditProfile()">SAVE</div>
                        </div>
                        <div class="mt-4 text-center rounded" style="font-size: 1rem; border: solid 1px; border-color: #6366F1">
                            <router-link to="/account-detail" class="py-2 rounded" style="text-decoration: none; color: #6366F1; display: block">BACK</router-link>
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
import {} from 'bootstrap'
import axios from "../plugins/axios";
export default {
  name: "LoginPage",
  data () {
    return {
        account: {}
    };
  },
  methods: {
      validate_form(){
          if(this.account.firstname == ''){
              this.$toast.error("Please fill in your first name")
          }else if(this.account.lastname == ''){
               this.$toast.error("Please fill in your last name")
          }else if(this.account.phone == ''){
               this.$toast.error("Please fill in your phone number")
          }else{
              this.$toast.success("Your account has been edited!")
          }
      },
      saveEditProfile(){
          axios.post("/edit-account", this.account).then((res) => {
              console.log(res.data)
              this.$toast.success("Your account has been edited!")
              this.$router.push(`/account-detail`)
              
          }).catch((err) => {
                this.$toast.warning(err.response.data)
          })
        //   this.validate_form()
      }
  },
  async created(){
    var temp_account = JSON.parse(localStorage.getItem("user"))
    try{
      var res = await axios.post("/account", JSON.parse(localStorage.getItem("user")))
      this.account = Object.assign({}, temp_account, res.data)
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
    background-color: #1F1C2D; 
    border-color: #5C5B64;
    border-width: 0.5px;
    color:#5C5B64;
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