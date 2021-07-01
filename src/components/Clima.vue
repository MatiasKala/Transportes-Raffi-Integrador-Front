<template>
  <div class="home">
    <b-row>
      <b-card title="Clima" class="ml-4" :img-src="`http://openweathermap.org/img/wn/${this.$store.state.codigoIcono}@2x.png`" img-alt="Card image" img-left>
        <b-card-text>
          Some quick example text to build on the card and make up the bulk of the card's content.
        </b-card-text>

      </b-card>
        <!-- Esta en global Mixin -->

    </b-row>
  </div>
</template>

<script>
export default {
  name: 'clima',
  props: {
  },
  created(){
    this.setCodigoIconoClima()
  }
}
</script>

<style scoped>

</style>
