<template>
  <div class="container">
      <div class="row py-5">
          <div class="col-7">
              <img src="../assets/Headphone.png" class="img-fluid p-2" alt="">
          </div>
          <div class="col-5 text-start justify-content-center">
              <h1 style="font-size: 3.75rem; margin-top:10rem !important" class="text-white">
                  We <span class="linear-color">Serve</span> the Way
              </h1>
              <h1 style="font-size: 3.75rem;" class="mt-3 text-white">
                  You want to 
              </h1>
              <h1 style="font-size: 3.75rem;" class="mt-3 mb-5 text-white">
                  Perform
              </h1>
              <a href="/room-list"><button class="btn btn-custom me-3" type="button" style="border-color:#6865F2; color: white; background-color: #6865F2; font-size:1.25rem">RESERVE WITH US</button></a>
          </div>
      </div>
    <div class="circle1"></div>
    <div class="circle2"></div> 
  </div>
</template>

<script>
import {} from 'bootstrap'
export default {
  name: "LandingPage",
  data () {
    return {
    };
  }
};
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
.linear-color {
  background: -webkit-linear-gradient(180deg, #d647ef, #6865f2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.circle1 {
  position: absolute;
  width: 10rem;
  height: 10rem;
  left: 60rem;
  top: 15rem;

  background: #D647EF;
  mix-blend-mode: normal;
  filter: blur(135px);
}
.circle2 {
  position: absolute;
  width: 10rem;
  height: 10rem;
  left: 73rem;
  top: 22rem;

  background: #6366F1;
  mix-blend-mode: normal;
  filter: blur(135px);
}
</style>