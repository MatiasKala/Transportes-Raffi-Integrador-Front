<template>
  <div class="home" v-if="this.$store.state.dataClima">
    <b-row>
      <b-col>
        <b-card style="margin-top:20px;">
        <b-card-header>
          {{this.$store.state.dataClima.name}}
        </b-card-header>
        <b-card-img left :src="`http://openweathermap.org/img/wn/${this.$store.state.codigoIconoClima}@2x.png`" alt="IconoClima" class="rounded-0"></b-card-img>
        <b-card-text>
          <p style="color:#0714cc">
            <b>Min {{this.$store.state.dataClima.main.temp_min?this.$store.state.dataClima.main.temp_min:'' | aCelsius | conSimbolo}}</b>
          </p>
          <p style="color:#f20404;" >
            <b>Max {{this.$store.state.dataClima.main.temp_max?this.$store.state.dataClima.main.temp_max:'' | aCelsius | conSimbolo}}</b>
          </p>
        </b-card-text>
        <b-card-text style="color:#858585" >
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
      var m = Number((Math.abs((value - 32) * 5/9) * 100).toPrecision(15));
      return Math.round(m) / 100 * Math.sign((value - 32) * 5/9);
    },
    conSimbolo: function(value){
      return value+' °C'
    }
  },
  methods:{

  }
}
</script>

<style scoped>

</style>
