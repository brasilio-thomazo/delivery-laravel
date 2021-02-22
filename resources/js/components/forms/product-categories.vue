<template>
  <form-modal v-bind:id="id" title="Categorias de produto" @submit="onSubmit">
    <div class="row mb-3">
      <div class="col-sm">
        <label for="name" class="form-label">Nome:</label>
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            id="name"
            v-model="form.name"
            required
          />
          <button
            v-if="this.form.id !== null"
            class="btn btn-outline-dark btn-sm"
            @click="clear"
            type="button"
          >
            <i class="fas fa-backspace"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="table-responsive">
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
                @click="select(i)"
                class="btn btn-outline-dark btn-sm"
                type="button"
              >
                <i class="far fa-edit"></i>
              </button>
              <button class="btn btn-outline-dark btn-sm" type="button">
                <i class="far fa-trash-alt"></i>
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
import api from "../../services/api";
export default {
  name: "form-product-category",
  components: { formModal },
  props: {
    categories: Array,
    id: String
  },
  data() {
    return {
      form: {
        id: null,
        name: null
      }
    };
  },
  methods: {
    select(i) {
      utils.select(this.categories, this.form, i);
    },
    clear() {
      utils.clear(this.form);
    },

    onSubmit() {
      if (this.form.id !== null) {
        return;
      }
      api.post.product
        .categories(this.form)
        .then(response => {
          if (response.status === 201) {
            utils.clear(this.form);
            this.$emit("save", response.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
