<template>
  <b-container class="tabla">
    <h1>Tabla de {{entidad | primeraMayuscula}}</h1>
    <div  v-if="!estaVacia" class="table-container ">
      <b-table table-variant='light' head-variant="dark" :busy="estaCargando" outlined hover responsive  :items="datos" :fields="getFields">
        
        <!-- Para cuando la tabla todavia no cargó  -->
        <template #table-busy>
          <div class="text-center text-primary my-2">
            <b-spinner class="align-middle"></b-spinner>
            <p ><b> Loading... </b></p>
          </div>
        </template>

        <!-- Campos personalizados EDITAR Y ELIMINAR -->
        
        <template #cell(editar)="data">
          <button class="btn btn-outline-warning" id="toggle-btn" @click="cambiarVisibilidadEditar()">Editar</button>
          <b-modal 
            ref="editar-modal" 
            title="Editar"
            header-bg-variant="warning"
            hide-footer
          >
            <div class="d-block text-center">
              <!-- EDITAR -->
              <FormularioEdicion :datosActualesTabla="data" :entidad="entidad"/>
            </div>
          </b-modal>
        </template>

        <template #cell(eliminar)="data">
          <button class="btn btn-outline-danger" id="toggle-btn" @click="cambiarVisibilidadEliminar()">Eliminar</button>
          <b-modal 
            ref="eliminar-modal"
            centered
            title="Eliminar"
            header-bg-variant="danger"
            hide-footer
          >
            <div class="d-block text-center">
              <h3>Hello From My Modal! {{data}}</h3>
            </div>
          </b-modal>
        </template>

      </b-table>
    </div>

    <!-- Si no hay datos en la tabla -->
    <div v-else>TABLA SIN DATOS</div>

    <!-- CREAR REGISTRO -->
    <b-row>
      <button class="btn btn-outline-primary ml-3" id="toggle-btn" @click="cambiarVisibilidadAgregar()">Agregar {{this.entidad | aSingular }}</button>
      <b-modal 
        ref="agregar-modal"
        centered
        title="Agregar"
        header-bg-variant="primary"
        header-text-variant="light"
        hide-footer
      >
        <div class="d-block text-center">
          <FormularioCreacion :entidad="entidad" />
        </div>
      </b-modal>
    </b-row>
    
  </b-container>
</template>

<script>

import FormularioCreacion from "../components/FormularioCreacion.vue";
import FormularioEdicion from "../components/FormularioEdicion.vue";

export default {
  name: 'tabla',
  props: ['datos','entidad','isCRUD'],
  components:{
    FormularioCreacion,
    FormularioEdicion,
    
  },
  data(){
    return{

    }
  },
  methods:{
    isSortable(campo){
      let campos = this.getCamposOrdenables()
      return campos.includes(campo)
    },
    cambiarVisibilidadAgregar(){
      this.$refs['agregar-modal'].toggle('#toggle-btn')
    },
    cambiarVisibilidadEditar(){
      this.$refs['editar-modal'].toggle('#toggle-btn')
    },
    cambiarVisibilidadEliminar(){
      this.$refs['eliminar-modal'].toggle('#toggle-btn')
    },
  },
  computed:{
    getFields(){
      if(this.datos){
        /* Obtiene los campos estaticos que comparten todas las tablas */
        const staticFields = this.getCRUDStaticFields()

        // Filtra los campos que vamos a renderizar
        const fields= Object.keys(this.datos[0]).map((field)=>{
          if(field!='_id'){
            // Si son campos que puedan ordenar la tabla les agrega la propiedad sortable
            return {key:field, sortable:this.isSortable(field)? true: false}
          }
        })
        // Devuelve los campos propios de cada entidad + los campos estaticos
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
