<template>
  <b-container class="tabla">
    <h1>Tabla de {{nombre | primeraMayuscula()}}</h1>
    <div  v-if="datos" class="table-container ">
      <b-table table-variant='info' head-variant="dark" bordered outlined hover responsive :items="datos" :fields="getFields"></b-table>
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
    isSortable(campo){
      console.log(campo, '    CAMPO A BUSCAR');
      let campos = this.getCamposOrdenables()
      return campos.includes(campo)
    }
  },
  computed:{
    getFields(){
      return Object.keys(this.datos[0]).map((field)=>{
        return {key:field, sortable:this.isSortable(field)? true: false }
      })
    }
  }
}
</script>

<style scoped>

</style>
