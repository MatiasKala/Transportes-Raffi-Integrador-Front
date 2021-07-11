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
            <body>
              <div id="map"></div>
            </body>
          </b-card>
        </b-col>
      </b-row>
        
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Tabla from '@/components/Tabla.vue'
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
    // getMapa(){
    //   console.log('pase por get mapa');
    //     mapboxgl.accessToken = 'pk.eyJ1IjoibWF0aWthbGEiLCJhIjoiY2txemlicTQ4MGU0OTJvcng5am1xODgzOCJ9.OaaWOThhntj9fX7YaUnCbw';
    //     var map = new mapboxgl.Map({
    //         container: 'map',
    //         style: 'mapbox://styles/mapbox/streets-v11',
    //         center:  [-58.428773, -34.66198],
    //         zoom: 15
    //     });

    //     map.on('load', function () {
    //         map.addSource('route', {
    //             'type': 'geojson',
    //             'data': {
    //                 'type': 'Feature',
    //                 'properties': {},
    //                 'geometry': {
    //                     'type': 'LineString',
    //                     'coordinates': [ [ -58.426871, -34.610451 ], [ -58.426018, -34.610324 ], [ -58.424566, -34.610105 ], [ -58.424659, -34.60903 ], [ -58.424691, -34.608623 ], [ -58.42307, -34.608594 ], [ -58.421879, -34.608573 ], [ -58.421721, -34.608569 ], [ -58.421515, -34.608565 ], [ -58.420714, -34.608548 ], [ -58.420055, -34.608537 ], [ -58.418767, -34.608524 ], [ -58.417479, -34.608556 ], [ -58.416233, -34.608551 ], [ -58.416057, -34.60855 ], [ -58.41529, -34.608472 ], [ -58.415176, -34.608433 ], [ -58.414883, -34.608292 ], [ -58.414651, -34.608172 ], [ -58.414178, -34.607926 ], [ -58.41414, -34.607902 ], [ -58.414077, -34.607829 ], [ -58.414046, -34.607752 ], [ -58.413957, -34.607329 ], [ -58.413658, -34.606118 ], [ -58.413444, -34.605227 ], [ -58.413419, -34.605129 ], [ -58.413404, -34.605062 ], [ -58.413242, -34.604321 ], [ -58.413201, -34.604136 ], [ -58.413136, -34.604138 ], [ -58.413039, -34.604135 ], [ -58.411723, -34.604072 ], [ -58.410621, -34.604025 ], [ -58.410443, -34.604022 ], [ -58.410304, -34.604028 ], [ -58.409858, -34.604056 ], [ -58.40954, -34.604085 ], [ -58.408904, -34.604136 ], [ -58.407813, -34.604257 ], [ -58.406608, -34.604425 ], [ -58.406232, -34.604474 ], [ -58.405756, -34.604536 ], [ -58.405446, -34.604576 ], [ -58.405034, -34.604619 ], [ -58.404455, -34.604684 ], [ -58.403623, -34.604762 ], [ -58.403246, -34.60475 ], [ -58.402319, -34.604741 ], [ -58.40212, -34.604736 ], [ -58.40083, -34.604688 ], [ -58.40052, -34.604674 ], [ -58.399705, -34.604638 ], [ -58.399464, -34.604632 ], [ -58.398232, -34.604585 ], [ -58.397675, -34.604562 ], [ -58.397106, -34.604542 ], [ -58.39678, -34.604528 ], [ -58.396127, -34.604517 ], [ -58.395517, -34.604506 ], [ -58.395312, -34.604451 ], [ -58.393869, -34.604419 ], [ -58.39375, -34.604416 ], [ -58.392311, -34.604384 ], [ -58.392324, -34.604154 ], [ -58.392379, -34.603443 ], [ -58.392404, -34.603151 ], [ -58.392613, -34.60197 ], [ -58.392767, -34.600821 ], [ -58.392798, -34.600604 ], [ -58.392882, -34.600073 ], [ -58.392941, -34.599686 ], [ -58.392951, -34.599611 ], [ -58.39305, -34.59871 ], [ -58.393062, -34.598591 ], [ -58.393185, -34.597378 ], [ -58.393199, -34.597226 ], [ -58.393318, -34.595868 ], [ -58.393268, -34.595409 ], [ -58.393199, -34.594836 ], [ -58.393113, -34.593955 ], [ -58.393095, -34.593818 ], [ -58.392918, -34.593065 ], [ -58.392833, -34.592716 ], [ -58.39282, -34.592666 ], [ -58.392798, -34.592604 ], [ -58.392749, -34.592537 ], [ -58.392112, -34.591955 ], [ -58.39189, -34.591752 ], [ -58.391518, -34.591412 ], [ -58.391419, -34.591323 ], [ -58.390916, -34.590864 ], [ -58.39024, -34.590257 ], [ -58.38999, -34.590033 ], [ -58.38948, -34.589564 ], [ -58.38935, -34.589444 ], [ -58.388987, -34.58911 ], [ -58.388135, -34.588329 ], [ -58.387802, -34.588071 ], [ -58.387096, -34.587543 ], [ -58.386445, -34.587044 ], [ -58.386029, -34.586726 ], [ -58.385836, -34.586582 ], [ -58.385701, -34.586657 ], [ -58.385111, -34.586986 ], [ -58.38501, -34.587042 ], [ -58.383826, -34.587692 ], [ -58.383742, -34.587733 ], [ -58.383011, -34.588137 ], [ -58.382812, -34.588247 ], [ -58.382698, -34.588308 ], [ -58.38189, -34.588736 ], [ -58.382162, -34.589186 ], [ -58.382243, -34.589316 ], [ -58.382291, -34.589489 ], [ -58.382315, -34.589571 ], [ -58.382323, -34.589698 ] ]
    //                 }
    //             }
    //         });
    //         map.addLayer({
    //             'id': 'route',
    //             'type': 'line',
    //             'source': 'route',
    //             'layout': {
    //                 'line-join': 'round',
    //                 'line-cap': 'round'
    //             },
    //             'paint': {
    //                 'line-color': '#888',
    //                 'line-width': 8
    //             }
    //         });
    //     });

    // }

  },
  components: {
    Tabla
  },
  computed:{
    viajeElegidoRuta:() => {return this.$store.state.viajeElegidoRuta},
    getViajesJSON:()=>{return this.jsonViajes},

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