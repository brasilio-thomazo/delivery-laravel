<template>
  <app-layout>
    <form @submit.prevent="onSubmit">
      <div class="row mb-3">
        <div class="col-sm">
          <label for="name" class="form-label">Nome:</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            class="form-control"
            required
          />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm">
          <label for="id_type" class="form-label">Tipo:</label>
          <div class="input-group">
            <select
              id="id_type"
              class="form-select"
              v-model="form.id_type"
              required
            >
              <option
                v-for="type in types"
                :key="type.id"
                v-bind:value="type.id"
              >
                {{ type.name }}
              </option>
            </select>
            <button
              class="btn btn-outline-secondary"
              data-bs-toggle="modal"
              data-bs-target="#product_type"
              type="button"
            >
              <i class="far fa-plus-square"></i>
            </button>
          </div>
        </div>
        <div class="col-sm">
          <label for="id_category" class="form-label">Categoria:</label>
          <div class="input-group">
            <select
              id="id_category"
              class="form-select"
              v-model="form.id_category"
              required
            >
              <option
                v-for="category in categories"
                :key="category.id"
                v-bind:value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
            <button
              class="btn btn-outline-secondary"
              data-bs-toggle="modal"
              data-bs-target="#product_category"
              type="button"
            >
              <i class="far fa-plus-square"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm">
          <label for="description" class="form-label"
            >Descri&ccedil;&atilde;o:</label
          >
          <textarea
            id="description"
            v-model="form.description"
            rows="3"
            class="form-control"
          ></textarea>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm">
          <label for="cost" class="form-label">Custo:</label>
          <div class="input-group">
            <span class="input-group-text">R$:</span>
            <currency-input
              locale="pt-br"
              class="form-control"
              v-bind:auto-decimal-mode="true"
              v-model="form.cost"
              required
            />
          </div>
        </div>
        <div class="col-sm">
          <label for="cost" class="form-label">Venda:</label>
          <div class="input-group">
            <span class="input-group-text">R$:</span>
            <currency-input
              locale="pt-br"
              class="form-control"
              v-bind:auto-decimal-mode="true"
              v-model="form.price"
              required
            />
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm">
          <button type="submit" class="btn btn-outline-dark">Salvar</button>
        </div>
      </div>
    </form>
    <form-product-type
      id="product_type"
      @save="onSaveType"
      v-bind:types="types"
    />
    <form-product-category
      id="product_category"
      v-bind:categories="categories"
      @save="onSaveCategory"
    />
    {{ errors }}
  </app-layout>
</template>

<script>
import appLayout from "../layouts/appLayout.vue";
import formProductCategory from "../components/forms/product-categories";
import formProductType from "../components/forms/product-types";
import _ from "lodash";
import api from "../services/api";

export default {
  components: { appLayout, formProductCategory, formProductType },
  props: {
    errors: Object,
    products: Array
  },
  data() {
    return {
      form: {
        id: null,
        name: null,
        id_type: null,
        id_category: null,
        cost: null,
        price: null
      },
      types: [],
      categories: []
    };
  },
  methods: {
    onSubmit() {
      if (this.form.id === null) this.$inertia.post("products", this.form);
      else this.$inertia.put(`products/${this.form.id}`, this.form);
    },
    select(index) {
      _.forEach(this.products[index], (v, k) => {
        this.form[k] = v;
      });
    },
    clear() {
      _.forEach(this.form, (v, k) => {
        this.form[k] = null;
      });
    },
    // Handle de evento ao clucluir o save de um novo tipo
    onSaveType(obj) {
      this.types = _.concat(this.types, obj);
      this.form.id_type = obj.id;
    },
    // Handle de evento ao concluir o save de uma categoria
    onSaveCategory(obj) {
      this.categories = _.concat(this.categories, obj);
      this.form.id_category = obj.id;
    }
  },
  mounted() {
    // Busca os tipos registrados
    api.get.product
      .types()
      .then(response => {
        if (response.status === 200) {
          this.types = response.data;
        }
      })
      .catch(console.error);
    // Busca as categorias registradas
    api.get.product
      .categories()
      .then(response => {
        if (response.status === 200) {
          this.categories = response.data;
        }
      })
      .catch(console.error);
  }
};
</script>
