<template>
  <form-modal v-bind:id="id" title="Tipos de produto" @submit="onSubmit">
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
        <div v-if="errors.name" class="form-text text-danger">
          {{ errors.name[0] }}
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
          <tr v-for="(type, i) in types" :key="type.id">
            <td>{{ type.id }}</td>
            <td>{{ type.name }}</td>
            <td>
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
  </form-modal>
</template>

<script>
import formModal from "./modal";
import utils from "../../services/utils";
import api from "../../services/api";

export default {
  name: "form-product-type",
  components: { formModal },
  props: {
    types: Array,
    id: String
  },
  data() {
    return {
      form: {
        id: null,
        name: null
      },
      errors: {}
    };
  },
  methods: {
    select(i) {
      this.errors = {};
      utils.select(this.types, this.form, i);
    },

    clear() {
      this.errors = {};
      utils.clear(this.form);
    },

    handleDelete(id) {
      this.errors = {};
      if (/^[0-9]+$/.test(id)) {
        api.delete.product
          .types(id)
          .then(response => {
            if (response.status === 201) this.$emit("onDelete", response.data);
          })
          .catch(errors => {
            if (errors.response) this.errors = errors.response.data.errors;
          });
      }
    },

    onSubmit() {
      this.errors = {};
      if (/^[0-9]+$/.test(this.form.id)) {
        api.put.product
          .types(this.form)
          .then(response => {
            if (response.status === 201) {
              utils.clear(this.form);
              this.$emit("save", response.data);
            }
            console.log(response);
            if (response.status === 422) {
              console.log(response);
            }
          })
          .catch(errors => {
            if (errors.response) this.errors = errors.response.data.errors;
          });
        return;
      }

      api.post.product
        .types(this.form)
        .then(response => {
          if (response.status === 201) {
            utils.clear(this.form);
            this.$emit("save", response.data);
          }
        })
        .catch(errors => {
          if (errors.response) this.errors = errors.response.data.errors;
        });
    }
  }
};
</script>
