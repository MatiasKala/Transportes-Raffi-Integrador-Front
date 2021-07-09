<template>
  <div class="home">
    <b-button-group  size="lg" class="mb-3">
      <b-button @click="verProgramados()" class="btn btn-viajes">Viajes Programados</b-button>
      <b-button @click="verHistoricos()" class="btn btn-viajes">Viajes Historicos</b-button>
      <b-button @click="verHojaDeRuta()" class="btn btn-viajes">Hoja de Ruta</b-button>
    </b-button-group>


    <!-- VIAJES PROGRAMADOS -->

    <Tabla v-if="mostrarProgramados" :datos="viajesProgramados" :entidad="'viajes'" :isCRUD="true" :isHojaDeRuta="false"/>
    
    <!-- VIAJES HISTORICOS -->
    
    <div v-if="mostrarHistoricos">
      <Tabla v-if="mostrarHistoricos" :datos="viajesHistoricos" :entidad="'historicos'" />
    </div>
    <!-- HOJA DE RUTA -->
    
    <div v-if="mostrarHojaDeRuta">
        <Tabla v-if="mostrarHojaDeRuta" :datos="viajesHojaDeRuta" :entidad="'hojaDeRuta'" :isCRUD="false" :isHojaDeRuta="true" />
    </div>
  
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
      viajesHojaDeRuta:this.getViajesHojaDeRuta(this.getLoggedUserToken()),
      viajesHistoricos:this.getViajesHistoricos(this.getLoggedUserToken()),
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
        const programados = response.data.filter(v => v.estado != 'FINALIZADO')
        console.log('Obtenidos Viajes Programados',programados);        
        this.viajesProgramados= programados
      }).catch(error =>{
        console.log(error);
      })
    },
    getViajesHistoricos(token){
      this.viajesHistoricos=this.axios.get(`${this.$store.state.apiDominio}/viajes`, {
          headers: {
            Authorization: 'Bearer ' + token 
          }
      }).then(response => {
        const historicos = response.data.filter(v => v.estado == 'FINALIZADO')
        console.log('Obtenidos Viajes Historicos',historicos);        
        this.viajesHistoricos= historicos
      }).catch(error =>{
        console.log(error);
      })
    },
    getViajesHojaDeRuta(token){
      this.viajesHojaDeRuta=this.axios.get(`${this.$store.state.apiDominio}/hojaDeRuta/viajes`, {
          headers: {
            Authorization: 'Bearer ' + token 
          }
      }).then(response => {
        console.log('Obtenidos Hoja De Ruta',response.data);
        console.log(response.data);  
        this.viajesHojaDeRuta= response.data
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
  }
}
</script>
<style scoped>
.btn-viajes{
  
  background-color: 	#000000;
  transition: all 0.7s ease 0s;
}
.btn-viajes:hover{
  background-color: rgb(124, 124, 124);
	letter-spacing: 2px;
	transition: all 0.7s ease 0s;
}
.btn-viajes:focus{
  background-color: rgb(124, 124, 124);
	letter-spacing: 4px;
	-webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
	-moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
	box-shadow: 5px 40px -10px rgba(0,0,0,0.57);
	transition: all 0.7s ease 0s;
}
</style>