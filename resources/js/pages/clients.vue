<template>
  <app-layout>
    <form v-on:submit.prevent="onSubmit" autocomplete="off">
      <div class="row mb-3">
        <div class="col-sm">
          <label for="name" class="form-label">Nome:</label>
          <input
            type="text"
            id="name"
            class="form-control"
            v-model="form.name"
            required
          />
        </div>
        <div class="col-sm">
          <label for="phone" class="form-label">Telefone:</label>
          <the-mask
            :mask="['(##) ####-####', '(##) #####-####']"
            class="form-control"
            v-model="form.phone"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm">
          <label for="address" class="form-label">Endere&ccedil;o</label>
          <input
            type="text"
            class="form-control"
            v-model="form.address"
            required
          />
        </div>
        <div class="col-sm">
          <label for="addr_number" class="form-label">N&uacute;mero:</label>
          <input
            type="number"
            class="form-control"
            id="addr_number"
            v-model="form.addr_number"
            required
          />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm">
          <label for="addr_complement" class="form-label">Complemento:</label>
          <input
            type="text"
            id="addr_complement"
            class="form-control"
            v-model="form.addr_complement"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm">
          <button class="btn btn-outline-dark" type="submit">Salvar</button>
          <button
            @click="clear"
            type="button"
            v-if="form.id !== null"
            class="btn btn-outline-dark"
          >
            Novo
          </button>
        </div>
      </div>
    </form>
    <div class="table-responsive">
      <table class="table align-middle">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Telefone</th>
            <th scope="col">Endere&ccedil;o</th>
            <th scope="col">N&deg;</th>
            <th scope="col">Complemento</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(client, i) in clients" :key="client.id">
            <td>{{ client.id }}</td>
            <td>{{ client.name }}</td>
            <td>{{ client.phone }}</td>
            <td>{{ client.address }}</td>
            <td>{{ client.addr_number }}</td>
            <td>{{ client.addr_complement }}</td>
            <td>
              <button @click="select(i)" class="btn btn-outline-dark btn-sm">
                <i class="far fa-edit"></i>
              </button>
              <button class="btn btn-outline-dark btn-sm">
                <i class="far fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    {{ errors }}
  </app-layout>
</template>

<script>
import appLayout from "../layouts/appLayout.vue";
import _ from "lodash";
export default {
  components: { appLayout },
  props: {
    errors: Object,
    clients: Array,
  },
  data() {
    return {
      form: {
        id: null,
        name: "",
        phone: "",
        address: "",
        addr_number: null,
        addr_complement: null,
      },
    };
  },
  methods: {
    onSubmit() {
      if (this.form.id === null) this.$inertia.post("clients", this.form);
      else this.$inertia.put(`clients/${this.form.id}`, this.form);
    },
    select(index) {
      _.forEach(this.clients[index], (v, k) => {
        this.form[k] = v;
      });
    },
    clear() {
      _.forEach(this.form, (v, k) => {
        this.form[k] = null;
      });
    },
  },
  mounted() {
    console.log("MOUNT");
  },
};
</script>
