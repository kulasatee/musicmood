<template>
  <div class="container pt-5">
      <div class="row justify-content-center">
          <div class="col-10">
            <div class="row justify-content-center">
                <div class="col-6 px-5" style="z-index: 1">
                    <div class="d-flex flex-column text-start">
                        <div class="h1 text-white" style="font-size: 3rem">
                            Change Password
                        </div>
                        <div class="text-white mt-4" style="font-size: 1rem">
                            <label for="current_password" class="form-label text-white">Current Password</label>
                            <input type="password" class="form-control form-control-lg input-bg " id="current_password" v-model="current_password">
                        </div>
                        <div class="text-white mt-4" style="font-size: 1rem">
                            <label for="new_password" class="form-label text-white">New Password</label>
                            <input type="password" class="form-control form-control-lg input-bg " id="new_password" v-model="new_password">
                        </div>
                        <div class="text-white mt-4" style="font-size: 1rem">
                            <label for="confirm_new_password" class="form-label text-white">Confirm New Password</label>
                            <input type="password" class="form-control form-control-lg input-bg " id="confirm_new_password" v-model="confirm_new_password">
                        </div>
                        <div class="mt-5 text-center" type="button" style="font-size: 1rem;">
                            <router-link to="account-detail" class="text-white py-2 rounded" style="text-decoration: none; background-color: #6366F1; display: block" @click="saveChangePassword()">SAVE</router-link>
                        </div>
                        <div class="mt-4 text-center rounded" style="font-size: 1rem; border: solid 1px; border-color: #6366F1">
                            <router-link to="/edit-account-detail" class="py-2 rounded" style="text-decoration: none; color: #6366F1; display: block">CANCEL</router-link>
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
        account: {},
        current_password: null,
        new_password: null,
        confirm_new_password: null
        
    };
  },
  methods: {
      saveChangePassword(){
        if(this.account.password != this.current_password){
          this.$toast.error("Your current password is incorrect")
        }
        else if(this.new_password == null){
          this.$toast.error("Please fill out your new password")
        }
        else if(this.new_password != this.confirm_new_password){
          this.$toast.error("Your new password is mismatch")
        }else{
          axios.post("/change-password", {current_password: this.current_password, new_password: this.new_password, confirm_new_password: this.confirm_new_password, username: this.account.username}).then((res) => {
              console.log(res.data)
              this.$toast.success("Your account has been edited!")
              
          }).catch((err) => {
                this.$toast.warning(err.response.data)
          })
          this.$router.replace('/edit-account-detail')
          this.$toast.success("Your password has been changed !")
        }
    }
  },
  async created(){
    var temp_account = JSON.parse(localStorage.getItem("user"))
    this.account = temp_account
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