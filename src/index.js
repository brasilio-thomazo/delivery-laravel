import Vue from "vue";
import App from "./components/App";
import router from "./router";
import VueTheMask from "vue-the-mask";
import bootstrap from "bootstrap";
import VueCurrencyInput from "vue-currency-input";

Vue.use(VueTheMask).use(VueCurrencyInput, {
  globalOptions: { currency: "BRL" },
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
