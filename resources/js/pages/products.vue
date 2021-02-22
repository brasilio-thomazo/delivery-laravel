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
        <div v-if="form.errors.name" class="form-text text-danger">
          {{ form.errors.name }}
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
          <div v-if="form.errors.id_type" class="form-text text-danger">
            {{ form.errors.id_type }}
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
          <div v-if="form.errors.id_category" class="form-text text-danger">
            {{ form.errors.id_category }}
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
          <div v-if="form.errors.description" class="form-text text-danger">
            {{ form.errors.description }}
          </div>
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
          <div v-if="form.errors.cost" class="form-text text-danger">
            {{ form.errors.id_type }}
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
          <div v-if="form.errors.price" class="form-text text-danger">
            {{ form.errors.id_type }}
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm">
          <button
            v-if="form.id"
            type="button"
            @click="clear"
            class="btn btn-outline-dark"
          >
            Novo
          </button>
          <button type="submit" class="btn btn-outline-dark">Salvar</button>
        </div>
      </div>
    </form>
    <form-product-type
      id="product_type"
      v-bind:types="types"
      @save="onSaveType"
      @onDelete="onDeleteType"
    />
    <form-product-category
      id="product_category"
      v-bind:categories="categories"
      @save="onSaveCategory"
      @onDelete="onDeleteCategory"
    />
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Categoria</th>
            <th>Descri&ccedil;&atilde;o</th>
            <th>(R$)Custo</th>
            <th>(R$)Venda</th>
            <th class="actions">A&ccedil;&otilde;es</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, i) in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.id_type }}</td>
            <td>{{ product.id_category }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.cost }}</td>
            <td>{{ product.price }}</td>
            <td class="actions">
              <button
                @click="select(i)"
                class="btn btn-outline-dark btn-sm"
                type="button"
              >
                <i class="far fa-edit"></i>
              </button>
              <button
                @click="handleDelete(type.id)"
                class="btn btn-outline-dark btn-sm"
                type="button"
              >
                <i class="far fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </app-layout>
</template>

<script>
import appLayout from "../layouts/appLayout.vue";
import formProductCategory from "../components/forms/product-categories";
import formProductType from "../components/forms/product-types";
import _ from "lodash";
import api from "../services/api";
import { Inertia } from "@inertiajs/inertia";

export default {
  components: { appLayout, formProductCategory, formProductType },
  props: {
    products: Array
  },
  data() {
    return {
      form: this.$inertia.form({
        id: null,
        name: null,
        description: null,
        id_type: null,
        id_category: null,
        cost: null,
        price: null
      }),
      types: [],
      categories: []
    };
  },
  watch: {
    form: {
      wasSuccessful() {
        console.log("OK");
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.form.id === null) this.form.post("products");
      else this.$inertia.put(`products/${this.form.id}`, this.form);
    },

    select(index) {
      _.forEach(this.products[index], (v, k) => {
        this.form[k] = v;
      });
    },

    clear() {
      this.form.reset();
    },

    // Handle de evento ao clucluir o save de um novo tipo
    onSaveType(obj) {
      var index = _.findIndex(this.types, { id: obj.id });
      if (index >= 0) this.types.splice(index, 1, obj);
      else this.types = _.concat(this.types, obj);
      this.form.id_type = obj.id;
    },

    // Handle de evento ao concluir o save de uma categoria
    onSaveCategory(obj) {
      var index = _.findIndex(this.categories, { id: obj.id });
      if (index >= 0) this.categories.splice(index, 1, obj);
      else this.categories = _.concat(this.categories, obj);
      this.form.id_category = obj.id;
    },

    // Handle de envento ao deletar um tipo
    onDeleteType(data) {
      if (this.form.id_type === data.id) this.form.id_type = null;
      this.types = _.remove(this.types, t => {
        return t.id !== data.id;
      });
    },

    // Handle de envento ao deletar uma categoria
    onDeleteCategory(data) {
      if (this.form.id_category === data.id) this.form.id_category = null;
      this.categories = _.remove(this.categories, category => {
        return category.id !== data.id;
      });
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

    Inertia.on("success", () => {
      this.form.reset();
    });
  }
};
</script>
