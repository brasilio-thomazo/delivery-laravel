import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8000/",
});

const options = {
  //headers: { "Content-type": "application/json" },
};

const clientReplace = (k, v) => {
  let value = v;
  if (k === "phone") {
    value = v.replace(/[^0-9]/g, "");
  }
  return value === "" ? null : value;
};

export default {
  getClients() {
    return http.get("clients/");
  },
  postClient(client) {
    let json = JSON.stringify(client, clientReplace);
    return http.post("clients/", client, options);
  },
  putClient(client) {},
  getProduct() {},
  postProduct(product) {},

  product: {
    getType() {
      return http.get("product-type/");
    },
    postType(p_type) {
      return http.post("product-type/", p_type, options);
    },

    getCategory() {
      return http.get("product-category/");
    },

    postCategory(p_category) {
      return http.post("product-category/", p_category, options);
    },
  },
};
