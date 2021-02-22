import axios from "axios";
import utils from "./utils";

const http = axios.create({
  baseURL: "/api/"
});

const options = {
  //headers: { "Content-type": "application/json" },
};

export default {
  get: {
    clients() {
      return http.get("clients");
    },
    produts() {
      return http.get("products");
    },
    product: {
      types() {
        return http.get("product-types");
      },
      categories() {
        return http.get("product-categories");
      }
    }
  },
  post: {
    clients(data) {
      return http.post("clients", utils.replaceClient(data), options);
    },
    products(data) {
      return http.post("products", utils.replaceBlank(data), options);
    },
    product: {
      types(data) {
        return http.post("product-types", utils.replaceBlank(data), options);
      },
      categories(data) {
        return http.post(
          "product-categories",
          utils.replaceBlank(data),
          options
        );
      }
    }
  },
  put: {
    clients(data) {
      return http.put(`clients/${data.id}`, utils.replaceClient(data));
    },
    products(data) {
      return http.put(`products/${data.id}`, utils.replaceBlank(data));
    },
    product: {
      types(data) {
        return http.put(`product-types/${data.id}`, utils.replaceBlank(data));
      },
      categories(data) {
        return http.put(
          `product-categories/${data.id}`,
          utils.replaceBlank(data)
        );
      }
    }
  },
  delete: {
    clients(id) {
      return http.delete(`clients/${id}`);
    },
    products(id) {
      return http.delete(`products/${id}`);
    },
    product: {
      types(id) {
        return http.delete(`product-types/${id}`);
      },
      categories(id) {
        return http.delete(`product-categories/${id}`);
      }
    }
  }
};
