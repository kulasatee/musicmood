import Vue from "vue";
import Toast, { POSITION } from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options = {
    // You can set your default options here
    timeout: 5000,
    closeOnClick: true,
    position: POSITION.BOTTOM_LEFT
};


Vue.use(Toast, options);