<template>
  <div class="tabla container">
    <h1>TABLA</h1>
    <div  v-if="datos.length" class="table-container ">
      <b-table table-variant='info' responsive head-variant="dark" bordered outlined hover :items="datos"></b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tabla',
  props: ['datos'],
  data(){
    return{
      // datos:[
      //   {nombre:'Juan',apellido:'Lich',nota:2},
      //   {nombre:'Pedro',apellido:'Perez',nota:4},
      //   {nombre:'Jose',apellido:'Krue',nota:10},
      //   {nombre:'Mati',apellido:'Parson',nota:7},
      // ]
    }
  },
  methods:{

  },
  computed:{
    getEncabezado(){
      return Object.keys(this.datos[0])
    },
  }
}
</script>

<style scoped>

</style>
