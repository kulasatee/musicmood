<template>
  <div class="container pt-5">
      <div class="row justify-content-center">
          <div class="col-10">
            <div class="row justify-content-center">
                <div class="col-6 px-5">
                    <div class="d-flex flex-column text-start">
                        <div class="h1 text-white" style="font-size: 3rem">
                            Welcome Back
                        </div>
                        <div class="text-white fw-light" style="font-size: 1rem">
                            Don't have an account yet ? <a class="ps-1" href="/signup" style="color: #6865F2; text-decoration: underline">Registerd here</a>
                        </div>
                        <div class="text-white mt-5" style="font-size: 1rem">
                            <label for="username" class="form-label text-white">Username</label>
                            <input type="text" class="form-control form-control-lg input-bg " id="username" v-model="username">
                        </div>
                        <div class="text-white mt-4" style="font-size: 1rem">
                            <label for="password" class="form-label text-white">Password</label>
                            <input type="password" class="form-control form-control-lg input-bg " id="password" v-model="password">
                        </div>
                        <div class="text-white mt-4 fw-light" style="font-size: 1rem">
                            <input type="checkbox" id="checkbox" v-model="checked">
                            <label for="checkbox" class="px-2" style="color: #AFACB6">Remember me ? </label>
                        </div>
                        <div class="btn text-white btn-custom mt-4 py-2" style="font-size: 1rem; background-color: #6366F1">
                            LOG IN
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
        form_input: {
            username: '',
            password: '',
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