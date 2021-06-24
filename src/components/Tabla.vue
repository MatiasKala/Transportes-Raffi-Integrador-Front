<template>
  <b-container class="tabla">
    <h1>Tabla de {{nombre | primeraMayuscula()}}</h1>
    <div  v-if="!estaVacia" class="table-container ">
      <b-table table-variant='info' head-variant="dark" :busy="estaCargando" bordered outlined hover responsive  :items="datos" :fields="getFields">
        
        <!-- Para cuando la tabla todavia no cargó  -->
        <template #table-busy>
          <div class="text-center text-primary my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>

        <template #cell(eliminar)>
          Elimino
        </template>

        <template #cell(editar)>
          Edito
        </template>



      </b-table>
    </div>
    <div v-else>TABLA SIN DATOS</div>
  </b-container>
</template>

<script>
export default {
  name: 'tabla',
  props: ['datos','nombre','isCRUD'],
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
      let campos = this.getCamposOrdenables()
      return campos.includes(campo)
    }
  },
  computed:{
    getFields(){
      if(this.datos){
       const staticFields = this.getCRUDStaticFields()
  
        const fields= Object.keys(this.datos[0]).map((field)=>{
          return {key:field, sortable:this.isSortable(field)? true: false }
        })
        return fields.concat(staticFields)
      }
      return []
    },
    estaCargando(){
      console.log(this.datos, ' cargando');
      return this.datos == undefined
    },
    estaVacia(){
      console.log(this.datos, ' vacia');
      return this.datos == {}
    }
  }
}
</script>

<style scoped>

</style>
