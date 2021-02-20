<template>
  <div>
    <header>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <inertia-link href="/" class="navbar-brand"
            >Delivery v1.0.2</inertia-link
          >
          <button
            class="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbar"
            aria-expanded="false"
            aria-label="Abrir Navegação"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
        <div class="collapse navbar-collapse" id="navbar">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <inertia-link href="/" class="nav-link">Home</inertia-link>
            </li>
            <li className="nav-item">
              <inertia-link class="nav-link" href="/clients"
                >Clientes</inertia-link
              >
            </li>
            <li className="nav-item">
              <inertia-link class="nav-link" href="/products"
                >Produtos</inertia-link
              >
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <main class="container-fluid">
      <slot />
    </main>
  </div>
</template>

<script>
export default {
  name: "app-layout",
};
</script>

<style></style>
