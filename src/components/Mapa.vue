<template>


    <div id="map">
        <link href='https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css' rel='stylesheet' />
        <p>Mapa {{data}}</p>
    </div>

</template>

<script>

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

export default {
  name: 'App',
  props:['data'],
  data() {
    return {
      accessToken: 'pk.eyJ1IjoibWF0aWthbGEiLCJhIjoiY2txemlicTQ4MGU0OTJvcng5am1xODgzOCJ9.OaaWOThhntj9fX7YaUnCbw',
      mapStyle: 'mapbox://map_style',
      geojson: { /* … some geojson */},
      layerId: 'firstLayer',
      sourceId: 'firstSource',
      markerCoordinates:'[50, 50]'
    }
  },
  methods:{
    getMapa(){
        mapboxgl.accessToken = 'pk.eyJ1IjoibWF0aWthbGEiLCJhIjoiY2txemlicTQ4MGU0OTJvcng5am1xODgzOCJ9.OaaWOThhntj9fX7YaUnCbw';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center:  [-58.428773, -34.66198],
            zoom: 15
        });

        map.on('load', function () {
            map.addSource('route', {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': this.data
                    }
                }
            });
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
        });
    }
  }
}
</script>