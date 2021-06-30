<template>
  <div class="home">
    <b-button-group size="lg">
      <b-button>Viajes Programados</b-button>
      <b-button>Viajes Historicos</b-button>
      <b-button>Hoja de Ruta</b-button>
    </b-button-group>
    <Tabla v-if="false" :datos="registros" :entidad="entidad" :isCRUD="true"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Tabla from '@/components/Tabla.vue'

export default {
  name: 'TablaView',
  props:[''],
  data(){
    return{
      viajesProgramados:this.getViajesProgramados(this.getLoggedUserToken())
    }
  },
  methods:{
      getViajesProgramados(token){
      this.viajesProgramados=this.axios.get(`${this.$store.state.apiDominio}/${this.entidad}`, {
          headers: {
            Authorization: 'Bearer ' + token 
          }
      }).then(response => {
        // ESTA EN GLOBAL MIXIN 
        this.eliminarCamposPrivados(response.data)
        this.registros= response.data
      }).catch(error =>{
        console.log(error);
      })
    },
  },
  components: {
    Tabla
  }
}
</script>
