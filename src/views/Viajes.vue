<template>
  <div class="home">
    <script type="application/javascript" defer src="https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.js"></script>
    <link
      href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css"
      rel="stylesheet"
    />
    <b-container>

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
      
      <b-row v-if="mostrarHojaDeRuta" align-h="center" class="mt-5">
        <b-col cols="9">
          <b-card title="Ruta de Viaje">
            <b-card-header header-bg-variant="dark" header-text-variant="light">Card subtitle </b-card-header>
            <br>
            <b-card-text>Origen{{ this.$store.state.coordenadasOrigen ? this.$store.state.coordenadasOrigen : ''}}</b-card-text>
            <b-card-text>Destino{{ this.$store.state.coordenadasViajeElegido.data ? this.$store.state.coordenadasViajeElegido.data.features[0].geometry.coordinates : ''}}</b-card-text>
            <b-card-text>JSON{{ this.$store.state.viajeJSON.data ? this.$store.state.viajeJSON.data.features[0].geometry.coordinates  : ''}}</b-card-text>
            <br>
            <Mapa :data="this.$store.state.viajeJSON"/>
          </b-card>
        </b-col>
      </b-row>
        
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Tabla from '@/components/Tabla.vue'
import Mapa from '@/components/Mapa.vue';
// import mapboxgl from "mapbox-gl";

export default {
  name: 'TablaView',
  props:[''],
  mounted(){
    this.getMapa()
  },
  data(){
    return{
      viajesProgramados:this.getViajesProgramados(this.getLoggedUserToken()),
      viajesHojaDeRuta:this.getViajesHojaDeRuta(this.getLoggedUserToken()),
      viajesHistoricos:this.getViajesHistoricos(this.getLoggedUserToken()),
      mostrarHistoricos:false,
      mostrarHojaDeRuta:false,
      mostrarProgramados:false,
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
    },
    async postViajesJSON(){
      if (this.$store.state.coordenadasViajeElegido.data && this.$store.state.coordenadasOrigen) {
        this.$store.dispatch('receiveViajeJSON', await this.axios.post(
            `${this.getDominioApi()}/hojaDeRuta/ruta`,
            {
              "coordinates":  [this.$store.state.coordenadasOrigen,this.$store.state.coordenadasViajeElegido.data.features[0].geometry.coordinates]
            }, 
            {
              headers: {
                Authorization: 'Bearer ' + this.getLoggedUserToken()
              }
            }
        ))
      }
      
    },
  },
  components: {
    Tabla,Mapa
  },
  computed:{
    viajeElegidoRuta:() => {return this.$store.state.viajeElegidoRuta},

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