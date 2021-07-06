<template>
  <div class="Maestros">
    <Tabla v-if="!error" :datos="registros" :entidad="entidad" :isCRUD="true" :isHojaDeRuta="false"/>
    <b-row v-else>
      <b-container>
        <b-card class="mt-2" text-variant="light" bg-variant="danger">Usted no tiene autorizacion para acceder a este recurso: {{entidad | primeraMayuscula}}</b-card>
      </b-container>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import Tabla from "@/components/Tabla.vue"

export default {
  name: 'MaestrosView',
  components: {
    Tabla
  },
  props:['entidad'],
  data(){
    return{
      registros:this.getRegistros(this.getLoggedUserToken()),
      error:null
    }
  },
  methods:{
    getRegistros(token){
      this.registros=this.axios.get(`${this.$store.state.apiDominio}/${this.entidad}`, {
          headers: {
            Authorization: 'Bearer ' + token 
          }
      }).then(response => {
        // ESTA EN GLOBAL MIXIN 
        console.log('LLEGUE A RESPONSE');
        this.eliminarCamposPrivados(response.data)
        this.registros= response.data
      }).catch(error =>{
        this.error = error
      })
    },
  },
  computed:{

  },
  updated() {
    if (localStorage.getItem('reloaded')) {
        localStorage.removeItem('reloaded');
    } else {
        localStorage.setItem('reloaded', '1');
        location.reload();
    }
  }
}
</script>
