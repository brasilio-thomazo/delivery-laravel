require("./bootstrap");
require("../css/app.scss");
require("bootstrap");

import { App, plugin } from "@inertiajs/inertia-vue";
import Vue from "vue";
import VueCurrencyInput from "vue-currency-input";
import VueTheMask from "vue-the-mask";

Vue.use(plugin)
  .use(VueTheMask)
  .use(VueCurrencyInput, {
    globalOptions: { currency: "BRL" },
  });
const el = document.getElementById("app");
new Vue({
  render: (h) =>
    h(App, {
      props: {
        initialPage: JSON.parse(el.dataset.page),
        resolveComponent: (name) => require(`./pages/${name}`).default,
      },
    }),
}).$mount(el);
