<template>

    <div>
        <MglMap
            container="map-test"
            :center.sync="center"
            :accessToken="accessToken"
            :mapStyle="mapStyle"
        >
        <MglMarker
        :coordinates.sync="markerCoordinates"
        color='green'
        />
        <MglGeojsonLayer
        type="fill"
        :sourceId="sourceId"
        :layerId="layerId"
        :source="geojson"
        @click="handleClick"
        />
        </MglMap>
    </div>
</template>

<script>
import {
  MglMap,
  MglMarker,
  MglGeojsonLayer
} from 'vue-mapbox'

export default {
  name: 'App',
  components:MglMap,MglMarker,MglGeojsonLayer,
  data() {
    return {
      accessToken: 'pk.eyJ1IjoibWF0aWthbGEiLCJhIjoiY2txemlicTQ4MGU0OTJvcng5am1xODgzOCJ9.OaaWOThhntj9fX7YaUnCbw',
      mapStyle: 'mapbox://map_style',
      geojson: { /* … some geojson */},
      layerId: 'firstLayer',
      sourceId: 'firstSource',
      markerCoordinates:'[50, 50]'
    }
  }
}
</script>