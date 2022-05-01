<template>
  <div class="container pt-5">
      <div class="row justify-content-center">
          <div class="col-10">
            <div class="row justify-content-center">
                <div class="col-6 px-5" style="z-index: 1">
                    <div class="d-flex flex-column text-start">
                        <div class="h1 text-white" style="font-size: 3rem">
                            Create Account
                        </div>
                        <div class="text-white fw-light" style="font-size: 1rem">
                            Already have an account ? <a href="/login" class="ps-1" style="color: #6865F2; text-decoration: underline">Log in here</a>
                        </div>
                        <div class="d-flex flex-row mt-4">
                                <div class="text-white me-2" style="font-size: 1rem;">
                                    <label for="firstname" class="form-label text-white">First name</label>
                                    <input type="text" class="form-control form-control-lg input-bg " id="firstname" v-model="form_input.first_name">
                                </div>
                                <div class="text-white ms-2" style="font-size: 1rem;">
                                    <label for="lastname" class="form-label text-white">Last name</label>
                                    <input type="text" class="form-control form-control-lg input-bg " id="lastname" v-model="form_input.last_name">
                                </div>
                        </div>
                        <div class="text-white mt-4" style="font-size: 1rem">
                            <label for="phonenumber" class="form-label text-white">Phone number</label>
                            <input type="text" class="form-control form-control-lg input-bg " id="phonenumber" v-model="form_input.phone_number">
                        </div>
                        <div class="text-white mt-4" style="font-size: 1rem">
                            <label for="username" class="form-label text-white">Username</label>
                            <input type="text" class="form-control form-control-lg input-bg " id="username" v-model="form_input.username">
                        </div>
                        <div class="text-white mt-4" style="font-size: 1rem">
                            <label for="password" class="form-label text-white">Password</label>
                            <input type="password" class="form-control form-control-lg input-bg " id="password" v-model="form_input.password">
                        </div>
                        <div class="text-white mt-4" style="font-size: 1rem">
                            <label for="confirm_password" class="form-label text-white">Confirm Password</label>
                            <input type="password" class="form-control form-control-lg input-bg" id="confirm_password" v-model="form_input.confirm_password">
                        </div>
                        <div class="mt-4 text-center" type="button" style="font-size: 1rem;">
                            <div class="text-white py-2 rounded" style="text-decoration: none; background-color: #6366F1; display: block" @click="validate_form()">SIGN UP</div>
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
export default {
  name: "LoginPage",
  components: {
  },
  data () {
    return {
        form_input: {
            first_name: '',
            last_name: '',
            phone_number: '',
            username: '',
            password: '',
            confirm_password: '',
            checked: false
        }
        
    };
  },
  methods: {
      validate_form(){
          if(this.form_input.username == ''){
              alert('please fill in username')
          }else if(this.form_input.password == ''){
               alert('please fill in password')
          }
          else if(this.form_input.first_name == ''){
               alert('please fill in password')
          }
          else if(this.form_input.last_name == ''){
               alert('please fill in password')
          }
          else if(this.form_input.phone_number == ''){
               alert('please fill in password')
          }else if(this.form_input.confirm_password == ''){
               alert('please fill in password')
          }
          this.$router.replace('/room-list')
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