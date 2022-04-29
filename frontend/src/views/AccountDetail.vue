<template>
  <div class="container pt-5">
      <div class="row justify-content-center">
          <div class="col-10">
            <div class="row justify-content-center">
                <div class="col-6 px-5">
                    <div class="d-flex flex-column text-start">
                        <div class="h1 text-white" style="font-size: 3rem">
                            {{account.username}} Account
                        </div>
                        <div class="d-flex flex-row mt-4">
                                <div class="text-white me-2" style="font-size: 1rem;">
                                    <label for="firstname" class="form-label text-white">First name</label>
                                    <input type="text" class="form-control form-control-lg input-bg " disabled id="firstname" v-model="account.first_name">
                                </div>
                                <div class="text-white ms-2" style="font-size: 1rem;">
                                    <label for="lastname" class="form-label text-white">Last name</label>
                                    <input type="text" class="form-control form-control-lg input-bg " disabled id="lastname" v-model="account.last_name">
                                </div>
                        </div>
                        <div class="text-white mt-4" style="font-size: 1rem">
                            <label for="phonenumber" class="form-label text-white">Phone number</label>
                            <input type="text" class="form-control form-control-lg input-bg " disabled id="phonenumber" v-model="account.phone_number">
                        </div>
                        <div class="text-white mt-4" style="font-size: 1rem">
                            <label for="username" class="form-label text-white">Username</label>
                            <input type="text" class="form-control form-control-lg input-bg " disabled id="username" v-model="account.username">
                        </div>
                        <div class="btn text-white btn-custom mt-5 py-2" type="button" style="font-size: 1rem; background-color: #6366F1">
                            <a href="/edit-account" class="text-white" style="text-decoration: none;">EDIT PROFILE</a>
                        </div>
                        <div class="btn btn-custom mt-4 py-2" style="color: #6366F1;font-size: 1rem; border: solid 1px; border-color: #6366F1">
                            BACK
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
  data () {
    return {
        account: {
            first_name: 'SalinyaZa007',
            last_name: 'Timklip',
            phone_number: '0908940562',
            username: 'Salinya',
            checked: false
        }
        
    };
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