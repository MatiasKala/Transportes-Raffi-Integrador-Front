<template>
  <div class="Test">
    <Tabla :datos="viajesProgramados" :entidad="'Viajes'" :isCRUD="true"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Tabla from "@/components/Tabla.vue"

export default {
  name: 'TestView',
  components: {
    Tabla
  },
  props:['entidad'],
  data(){
    return{
      viajesProgramados:this.getViajesProgramados(this.getLoggedUserToken())
    }
  },
  methods:{
    getViajesProgramados(token){
      this.registros=this.axios.get(`${this.$store.state.apiDominio}/${this.entidad}`, {
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
