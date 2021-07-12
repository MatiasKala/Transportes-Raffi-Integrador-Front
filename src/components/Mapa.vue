<template>


    <div id="componente">
        <head>
            <link href="https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css" rel="stylesheet">
        </head>
        <body>
            <b-row>
                <b-col  cols="12">
                    <div v-if="this.data != null" id="mapa"></div>
                    <div v-else>No hay ningun viaje eleccionado</div>
                    {{data ? data.coordinates : ''}}
                </b-col>
            </b-row>
        </body>
    </div>

</template>

<script>

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

export default {
  name: 'App',
  props:['data'],
  data() {
    return {
    }
  },
  updated(){
      this.getMapa()
  },
  methods:{
    getMapa(){
        console.log('1 '+Object.keys(mapboxgl));
        mapboxgl.accessToken = 'pk.eyJ1IjoibWF0aWthbGEiLCJhIjoiY2txemlicTQ4MGU0OTJvcng5am1xODgzOCJ9.OaaWOThhntj9fX7YaUnCbw';
        console.log('2 '+mapboxgl.accessToken);
        var map = new mapboxgl.Map({
            container: 'mapa',
            style: 'mapbox://styles/mapbox/streets-v11',
            center:  [ -58.43324530189723,-34.630453163876325],
            zoom: 12
        });
        map.on('load', function () {
            map.addSource('route', {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                        "type":'LineString',
                        "coordinates":this.data.coordinates
                    }
                }
            });
            console.log('Pase LOAD');
            map.addLayer({
                'id': 'route',
                'type': 'line',
                'source': 'route',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': '#888',
                    'line-width': 8
                }
            });
            console.log('Pase LAYER');
            console.log(map);
        });
    },
    
  },
}
</script>

<style scoped>
    #mapa{
        width: 790px;
        height: 600px;
    }
</style>
