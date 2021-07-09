<template>
  <div v-if="hayUsuario" class="container py-3">
    <b-row>
      <b-col lg="3" md="12" cols="12">
        <Clima/>
      </b-col>
      <b-col lg="9" md="12" cols="12">
        <b-navbar class="mt-4 nav" toggleable="lg" type="dark" variant="light">
          <router-link to="/">
              <b-navbar-brand style="color:black" class="botonNav"><b-button variant="dark"><b>Home</b></b-button></b-navbar-brand>
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
                    <a class="nav-link botonNav"><b-button  variant="secondary"><b>Choferes</b></b-button></a> 
                  </router-link>
              </b-nav-item>
              <b-nav-item>
                  <router-link to="/manejoMaestros/vehiculos">
                    <a class="nav-link botonNav"><b-button  variant="secondary"><b>Vehiculos</b></b-button></a> 
                  </router-link>
              </b-nav-item>
              <b-nav-item>
                  <router-link to="/manejoMaestros/clientes">
                    <a class="nav-link botonNav"><b-button  variant="secondary"><b>Clientes</b></b-button></a> 
                  </router-link>
              </b-nav-item>
              <b-nav-item>
                  <router-link to="/viajes">
                    <a class="nav-link botonNav"><b-button  variant="secondary"><b>Viajes</b></b-button></a> 
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
.nav{
  background-color: rgb(20, 20, 20) !important;
}
.botonNav :hover{
  background-color: rgb(255, 255, 255);
  color: rgb(58, 58, 58);
	transition: all 0.5s ease 0s;
}
</style>
