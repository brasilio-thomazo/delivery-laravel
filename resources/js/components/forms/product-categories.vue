<template>
  <form-modal v-bind:id="id" title="Categorias de produto" @submit="onSubmit">
    <div class="row mb-3">
      <div class="col-sm">
        <label for="name" class="form-label">Nome:</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="form.name"
          required
        />
      </div>
    </div>
    <div class="table-responsive">
      {{ form.name }}
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(category, i) in categories" :key="category.id">
            <td>{{ category.id }}</td>
            <td>{{ category.name }}</td>
            <td>
              <button
                v-on:click="select(i)"
                class="btn btn-outline-dark btn-sm"
              >
                <i class="bi bi-pencil-square"></i>
              </button>
              <button class="btn btn-outline-dark btn-sm">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </form-modal>
</template>

<script>
import formModal from "./modal";
import utils from "../../services/utils";
export default {
  name: "form-product-category",
  components: { formModal },
  props: {
    categories: Array,
    id: String,
  },
  data() {
    return {
      form: {
        id: null,
        name: null,
      },
    };
  },
  methods: {
    select(i) {
      utils.select(this.categories, this.form, i);
    },
    onSubmit() {},
  },
};
</script>