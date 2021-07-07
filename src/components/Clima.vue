<template>
  <div class="home" v-if="this.$store.state.dataClima">
    <b-row>
      <b-col>
        <b-card style="margin-top:1px;" footer-border-variant="info">
          <b-card-header header-bg-variant="dark" style="color:white">
            <b>
              {{this.$store.state.dataClima.name}}
            </b>
            <br>
              {{this.$store.state.dataClima.weather[0].description | primeraMayuscula}}
          </b-card-header>
          <b-card-img left :src="`http://openweathermap.org/img/wn/${this.$store.state.codigoIconoClima}@2x.png`" alt="IconoClima" class="rounded-0"></b-card-img>
          <b-card-text>
            <p :style="getColorTemperatura()">
              <b>Temperatura
              
              {{this.$store.state.dataClima.main.temp?this.$store.state.dataClima.main.temp:'' | aCelsius | conSimbolo}}</b>
            </p>
            <p :style="getColorTermica()" >
              Sensación 
              {{this.$store.state.dataClima.main.feels_like?this.$store.state.dataClima.main.feels_like:'' | aCelsius | conSimbolo}}
            </p>
          </b-card-text>
          <b-card-text style="color:#6381e2" >
            <b>Humedad {{this.$store.state.dataClima.main.humidity+'%'}}</b>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'clima',
  props: {
  },
  filters:{
    aCelsius: function (value) {
      if (!value) return ''
      return Math.round((value - 273.15) * 10) / 10
    },
    conSimbolo: function(value){
      return value+' °C'
    }
  },
  methods:{
    getColorTemperatura(){
      let color = this.getColorSegunTemperatura(this.$store.state.dataClima.main.temp)
      return{
        'color': color
      }
    },
    getColorTermica(){
      let color = this.getColorSegunTemperatura(this.$store.state.dataClima.main.feels_like)
      return{
        'color': color
      }
    },
    getColorSegunTemperatura(temperatura){
         if (temperatura) {
           if(temperatura>303) {
             return '#ff0000'
           }
           else if(temperatura>298) {
             return '#ff9090'
           }
           else if(temperatura>286) {
             return '#928787'
           } 
           else if(temperatura>281){
             return '#64bcff'
           }
           else{
             return '#00abff'
           }

         } else {
           return 'black'
         }
    }
  }
}
</script>

<style scoped>

</style>
