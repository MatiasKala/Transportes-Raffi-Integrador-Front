<template>
  <b-container class="tabla">
    <h1>Tabla de {{nombre | primeraMayuscula()}}</h1>
    <div  v-if="datos" class="table-container ">
      <b-table table-variant='info' head-variant="dark" bordered outlined hover responsive :items="datos"></b-table>
    </div>
    <div v-else>TABLA SIN DATOS</div>
  </b-container>
</template>

<script>
export default {
  name: 'tabla',
  props: ['datos','nombre'],
  data(){
    return{

    }
  },
  filters:{
    primeraMayuscula(value){
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  methods:{
  },
}
</script>

<style scoped>

</style>
