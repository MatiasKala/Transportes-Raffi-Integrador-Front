<template>
  <b-container class="tabla">
    <h1>Tabla de {{nombre | primeraMayuscula()}}</h1>
    <div  v-if="!estaVacia" class="table-container ">
      <b-table table-variant='light' head-variant="dark" :busy="estaCargando" outlined hover responsive  :items="datos" :fields="getFields">
        
        <!-- Para cuando la tabla todavia no cargó  -->
        <template #table-busy>
          <div class="text-center text-primary my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong> Loading...</strong>
          </div>
        </template>

        <template #cell(editar)="data">
          <button class="btn btn-outline-warning" id="toggle-btn" @click="cambiarVisibilidadEditar()">Editar</button>
          <b-modal ref="editar-modal" hide-footer title="Editar">
            <div class="d-block text-center">
              <h3>Hello From My Modal! {{data}}</h3>
            </div>
          </b-modal>
        </template>

        <template #cell(eliminar)="data">
          <button class="btn btn-outline-danger" id="toggle-btn" @click="cambiarVisibilidadEliminar()">Eliminar</button>
          <b-modal ref="eliminar-modal" title="Eliminar">
            <div class="d-block text-center">
              <h3>Hello From My Modal! {{data}}</h3>
            </div>
          </b-modal>
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
    },
    eliminar(data){
      console.log(data);
    },
    editar(data){
      console.log(data);
    },
    cambiarVisibilidadEditar(){
      this.$refs['editar-modal'].toggle('#toggle-btn')
    },
    cambiarVisibilidadEliminar(){
      this.$refs['eliminar-modal'].toggle('#toggle-btn')
    }
  },
  computed:{
    getFields(){
      if(this.datos){
       const staticFields = this.getCRUDStaticFields()
  
        const fields= Object.keys(this.datos[0]).map((field)=>{
          if(field!='_id'){
            return {key:field, sortable:this.isSortable(field)? true: false}
          }
        })
        return fields.concat(staticFields)
      }
      return []
    },
    estaCargando(){
      return this.datos == undefined
    },
    estaVacia(){
      return this.datos == {}
    }
  }
}
</script>

<style scoped>

</style>
