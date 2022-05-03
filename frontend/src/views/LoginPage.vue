<template>
  <div class="container pt-5">
    <div class="row justify-content-center">
      <div class="col-10">
        <div class="row justify-content-center">
          <div class="col-6 px-5" style="z-index: 1">
            <div class="d-flex flex-column text-start">
              <div class="h1 text-white" style="font-size: 3rem">
                Welcome Back
              </div>
              <div class="text-white fw-light" style="font-size: 1rem">
                Don't have an account yet?
                <a
                  href="/signup"
                  class="ps-1"
                  style="color: #6865f2; text-decoration: underline"
                  >Register here</a
                >
              </div>

              <div class="text-white mt-5" style="font-size: 1rem">
                <label for="username" class="form-label text-white"
                  >Username</label
                >
                <input
                  type="text"
                  class="form-control form-control-lg input-bg"
                  id="username"
                  v-model="form_input.username"
                />
              </div>
              <div class="text-white mt-4" style="font-size: 1rem">
                <label for="password" class="form-label text-white"
                  >Password</label
                >
                <input
                  type="password"
                  class="form-control form-control-lg input-bg"
                  id="password"
                  v-model="form_input.password"
                />
              </div>
              <div
                class="mt-5 text-center"
                type="button"
                style="font-size: 1rem"
              >
                <div
                  class="text-white py-2 rounded"
                  @click="validate_form()"
                  style="
                    text-decoration: none;
                    background-color: #6366f1;
                    display: block;
                  "
                >
                  LOG IN
                </div>
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
import {} from "bootstrap";
import axios from "../plugins/axios";
export default {
  name: "LoginPage",
  data() {
    return {
      form_input: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    validate_form() {
      if (this.form_input.username == "") {
        alert("please fill in username");
      } else if (this.form_input.password == "") {
        alert("please fill in password");
      } else {
        axios.post("/login", this.form_input)
          .then((response) => {
            if(response.data.token){
              localStorage.setItem("token", response.data.token)
              console.log(response.data.token);
            }
          })
          .catch((err) => {
            console.log(err.response.status);
            if (err.response.status == 400 || err.response.status == 401) {
              this.$toast.warning(err.response.data);
            }
          });
        // this.$router.replace('/room-list')
      }
    },
  },
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

  background: #d647ef;
  mix-blend-mode: normal;
  filter: blur(135px);
}
.circle2 {
  position: absolute;
  width: 10rem;
  height: 10rem;
  left: 65rem;
  top: 13rem;

  background: #6366f1;
  mix-blend-mode: normal;
  filter: blur(135px);
}
input:focus {
  background-color: #1f1c2d;
  color: white;
}
textarea:focus {
  background-color: #1f1c2d;
  color: white;
}
</style>
