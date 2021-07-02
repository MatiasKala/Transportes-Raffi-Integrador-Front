<template>
  <div v-if="hayUsuario" class="container py-3">
    <b-row>
      <b-col lg="3" md="12" cols="12">
        <Clima/>
      </b-col>
      <b-col lg="9" md="12" cols="12">
        <b-navbar class="mt-4" toggleable="lg" type="dark" variant="dark">
          <router-link to="/">
              <b-navbar-brand>Home</b-navbar-brand>
          </router-link>

          <b-navbar-toggle target="navbar-toggle-collapse">
            <template #default="{ expanded }">
              <b-icon v-if="expanded" icon="chevron-double-up"></b-icon>
              <b-icon v-else icon="chevron-double-down"></b-icon>
            </template>
          </b-navbar-toggle>

          <b-collapse id="navbar-toggle-collapse" is-nav>
            <b-navbar-nav class="mr-auto ml-auto">
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
                  <router-link to="/viajes">
                    <a class="nav-link"><b-button variant="dark"> Viajes </b-button></a> 
                  </router-link>
              </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Clima from './Clima.vue'

export default {
  name: 'navbar',
  props: {
  },
  components:{
    Clima
  },
  computed:{
    hayUsuario(){
      return this.hayUsuarioLogeadoEnStorage()
    }
  },
  created(){
    this.setCodigoIconoClima()
    this.getDatosClima()
  }
}
</script>

<style scoped>

</style>
