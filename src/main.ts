import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import axios from "axios";
import VueLoading from "vue-loading-template";
import "./plugins/element.js";

Vue.config.productionTip = false;
Vue.use(VueLoading);

axios.defaults.baseURL = "https://app.jike.ruguoapp.com";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
