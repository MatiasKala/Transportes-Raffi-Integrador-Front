<template>
  <div class="home">
    <b-button-group  size="lg" class="mb-3">
      <b-button @click="verProgramados()" class="btn btn-viajes">Viajes Programados</b-button>
      <b-button @click="verHistoricos()" class="btn btn-viajes">Viajes Historicos</b-button>
      <b-button @click="verHojaDeRuta()" class="btn btn-viajes">Hoja de Ruta</b-button>
    </b-button-group>
    <Tabla v-if="mostrarProgramados" :datos="viajesProgramados" :entidad="'viajes'" :isCRUD="true"/>
    <div v-if="mostrarHistoricos">HISTORICOS</div>
    <div v-if="mostrarHojaDeRuta">HOJA DE RUTA</div>
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
      viajesProgramados:this.getViajesProgramados(this.getLoggedUserToken()),
      mostrarProgramados:false,
      mostrarHistoricos:false,
      mostrarHojaDeRuta:false,
    }
  },
  methods:{
      getViajesProgramados(token){
      this.viajesProgramados=this.axios.get(`${this.$store.state.apiDominio}/viajes`, {
          headers: {
            Authorization: 'Bearer ' + token 
          }
      }).then(response => {
        console.log('Obtenidos ',response.data);        
        this.viajesProgramados= response.data
      }).catch(error =>{
        console.log(error);
      })
    },
    verProgramados(){
      this.mostrarHistoricos=false,
      this.mostrarHojaDeRuta=false,
      this.mostrarProgramados=true
    },
    verHistoricos(){
      this.mostrarProgramados=false,
      this.mostrarHojaDeRuta=false,
      this.mostrarHistoricos=true
    },
    verHojaDeRuta(){
      this.mostrarHistoricos=false,
      this.mostrarProgramados=false,
      this.mostrarHojaDeRuta=true
    }
  },
  components: {
    Tabla
  },
  computed:{
    programadosSeleccionados(){
      return this.mostrarProgramados
    },
  }
}
</script>
<style scoped>
.btn-viajes{
  
  background-color: 	#330040;
  transition: all 0.7s ease 0s;
}
.btn-viajes:hover{
  background-color: rgb(101, 0, 114);
	letter-spacing: 2px;
	transition: all 0.7s ease 0s;
}
.btn-viajes:focus{
  background-color: rgb(101, 0, 114);
	letter-spacing: 4px;
	-webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
	-moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
	box-shadow: 5px 40px -10px rgba(0,0,0,0.57);
	transition: all 0.7s ease 0s;
}
</style>