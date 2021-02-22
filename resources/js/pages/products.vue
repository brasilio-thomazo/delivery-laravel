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
          <label for="p_type" class="form-label">Tipo:</label>
          <div class="input-group">
            <select
              id="p_type"
              class="form-select"
              v-model="form.id_type"
              required
            >
              <option
                v-for="p_type in p_types"
                :key="p_type.id"
                v-bind:value="p_type.id"
              >
                {{ p_type.name }}
              </option>
            </select>
            <button
              class="btn btn-outline-secondary"
              data-bs-toggle="modal"
              data-bs-target="#product_type"
            >
              <i class="bi bi-plus-square"></i>
            </button>
          </div>
        </div>
        <div class="col-sm">
          <label for="p_category" class="form-label">Categoria:</label>
          <div class="input-group">
            <select
              id="p_category"
              class="form-select"
              v-model="form.id_category"
              required
            >
              <option
                v-for="p_category in p_categories"
                :key="p_category.id"
                v-bind:value="p_category.id"
              >
                {{ p_category.name }}
              </option>
            </select>
            <button
              class="btn btn-outline-secondary"
              data-bs-toggle="modal"
              data-bs-target="#product_category"
            >
              <i class="bi bi-plus-square"></i>
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

export default {
  components: { appLayout, formProductCategory, formProductType },
  props: {
    errors: Object,
    products: Array,
    types: Array,
    categories: Array,
  },
  data() {
    return {
      form: {
        id: null,
        name: null,
        id_type: null,
        id_category: null,
        cost: null,
        price: null,
      },
      p_types: {},
      p_categories: {},
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
    onSaveType() {},
    onSaveCategory() {},
  },
  mounted() {
    console.log("MOUNT");
  },
};
</script>
