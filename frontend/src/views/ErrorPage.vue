<template>
    <div class="container">
    <p class="fw-normal text-wrap" style="font-size: 15rem; color:#C4C4C4; height: 18rem">404</p>
    <p class="fw-normal" style="font-size: 5rem; color:#C4C4C4">Ooops!</p>
    <p class="fw-lighter" style="font-size: 1.5rem; color:#C4C4C4">The page you are looking for is not available.</p>
    <!-- blur bg -->
      <div class="circle1"></div>
      <div class="circle2"></div>
    </div>
</template>

<script>
import {} from "bootstrap";
export default {
  name: "ErrorPage",
  data() {
    return {

    };
  },
}
</script>

<style scoped>
.linear-color {
  background: -webkit-linear-gradient(180deg, #d647ef, #6865f2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.circle1 {
  position: absolute;
  width: 150px;
  height: 150px;
  left: 950px;
  top: 64px;

  background: #d647ef;
  mix-blend-mode: normal;
  filter: blur(135px);
}
.circle2 {
  position: absolute;
  width: 150px;
  height: 150px;
  left: 1175px;
  top: 220px;

  background: #6366f1;
  mix-blend-mode: normal;
  filter: blur(135px);
}
</style>
