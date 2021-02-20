<template>
  <div>
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
  </div>
</template>

<script>
export default {};
</script>

<style></style>
