import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8000/api"
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
  get: {
    clients() {
      return http.get("clients/");
    },
    produts() {
      return http.get("products/");
    },
    product: {
      types() {
        return http.get("product-types/");
      },
      categories() {
        return http.get("product-categories/");
      }
    }
  },
  post: {
    clients(data) {
      let json = JSON.stringify(data, clientReplace);
      return http.post("clients/", json, options);
    },
    product: {
      types(data) {
        return http.post("product-types/", data, options);
      },
      categories(data) {
        return http.post("product-categories/", data, options);
      }
    }
  }
};
