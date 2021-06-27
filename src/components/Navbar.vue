<template>
  <div v-if="hayUsuario" class="container p-5">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">Navegacion</b-navbar-brand>

      <b-navbar-toggle target="navbar-toggle-collapse">
        <template #default="{ expanded }">
          <b-icon v-if="expanded" icon="chevron-double-up"></b-icon>
          <b-icon v-else icon="chevron-double-down"></b-icon>
        </template>
      </b-navbar-toggle>

      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav class="mr-auto ml-auto">
          <b-nav-item>
              <router-link to="/test/usuarios">
                <a class="nav-link"><b-button variant="dark"> TestView </b-button></a>
              </router-link>
          </b-nav-item>
          <b-nav-item>
              <router-link to="/manejoMaestros/choferes">
                <a class="nav-link"><b-button variant="dark"> Choferes </b-button></a> 
              </router-link>
          </b-nav-item>
          <b-nav-item>
              <router-link to="/manejoMaestros/vehiculos">
                <a class="nav-link"><b-button variant="dark"> Vehiculos </b-button></a> 
              </router-link>
          </b-nav-item>
          <b-nav-item>
              <router-link to="/manejoMaestros/clientes">
                <a class="nav-link"><b-button variant="dark"> Clientes </b-button></a> 
              </router-link>
          </b-nav-item>
          <b-nav-item>
              <router-link to="/manejoMaestros/viajes">
                <a class="nav-link"><b-button variant="dark"> Viajes </b-button></a> 
              </router-link>
          </b-nav-item>
          <b-nav-item>
              <router-link to="/">
                <a class="nav-link"><b-button variant="dark"> Home </b-button></a>
              </router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  props: {
  },
  computed:{
    hayUsuario(){
      return this.hayUsuarioLogeadoEnStorage()
    }
  }
}
</script>

<style scoped>

</style>
