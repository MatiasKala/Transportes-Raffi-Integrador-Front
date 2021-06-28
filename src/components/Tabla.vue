<template>
  <b-container class="tabla">
    <h1>Tabla de {{entidad | primeraMayuscula}}</h1>
    <div  v-if="!estaVacia && !estaCargando" class="table-container ">
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
          <button class="btn btn-outline-warning" id="toggle-btn" @click="cambiarVisibilidadEditar(data)">Editar</button>
          <b-modal 
            ref="editar-modal" 
            title="Editar"
            header-bg-variant="warning"
            hide-footer
          >
            <div class="d-block text-center">
              <!-- EDITAR -->
              <FormularioEdicion :datosActualesTabla="getData()" :entidad="entidad"/>
            </div>
          </b-modal>
        </template>

        <template #cell(eliminar)="data">
          <button class="btn btn-outline-danger" id="toggle-btn" @click="cambiarVisibilidadEliminar(data)">Eliminar</button>
          <b-modal 
            id="eliminar-modal"
            ref="eliminar-modal"
            centered
            title="Eliminar"
            header-bg-variant="danger"
            header-text-variant="light"
            hide-footer
          >
            <div class="d-block text-center" >
              Seguro que desea eliminar el {{entidad | aSingular}} de id <b>{{getData() ? getData().item._id:''}}</b> 
            </div>
            <div class="d-block text-center" v-if="!responseEliminado">
              <b-button class="mt-3 mx-4 btn-envio text-center" variant="info" @click="eliminar(getData() ? getData().item._id:'')">
                Confirmar
              </b-button >
              <b-button class="mt-3 mx-4 btn-envio text-center" variant="danger" @click="$bvModal.hide('eliminar-modal')">
                Cancelar
              </b-button >
            </div>
            <div class="d-block text-center mt-2"  v-else>
              <b-card bg-variant="success" v-if="responseEliminado.status >= 200" >Eliminacion realizada correctamente</b-card>
              <b-card bg-variant="danger" v-else>Error en la Eliminacion</b-card>
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


      <!-- ASIGNAR CHOFER A VEHICULO -->
      <button v-if="(!estaVacia && !estaCargando) && this.entidad == 'vehiculos'" class="btn btn-outline-info ml-3" id="toggle-btn" @click="cambiarVisibilidadAsignarChofer()">Asignar Chofer</button>
      <b-modal 
        ref="asignar-chofer-modal"
        centered
        title="Asignar Chofer"
        header-bg-variant="info"
        header-text-variant="light"
        hide-footer
      >
        <div class="d-block text-center" v-if="getDataChoferesAsignar">
          <b-form-select v-model="choferElegido" :options="dataChoferesAsignar">
            <template #first>
              <b-form-select-option :value="null" disabled>Elija un Chofer</b-form-select-option>
            </template>
          </b-form-select>
          <div class="mt-2">Selected: <strong>{{ choferElegido }}</strong></div>
          <b-button v-if="choferElegido!=null" class="mt-2" variant="info">Aceptar</b-button>
          <b-button v-else class="mt-2" disabled variant="secondary">Aceptar</b-button>
        </div>
        <b-card text-variant="light" bg-variant="danger " v-else >No hay choferes para asignar</b-card>
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
        responseEliminado:null,
        data:null,
        dataChoferesAsignar:this.getChoferes(),
        choferElegido:null
    }
  },
  methods:{
    cambiarVisibilidadAgregar(){
      this.$refs['agregar-modal'].toggle('#toggle-btn')
    },
    cambiarVisibilidadEditar(data){
      this.setData(data)
      this.$refs['editar-modal'].toggle('#toggle-btn')
    },
    cambiarVisibilidadEliminar(data){
      this.setData(data)
      this.$refs['eliminar-modal'].toggle('#toggle-btn')
    },
    async cambiarVisibilidadAsignarChofer(){
      console.log(this.dataChoferesAsignar);
      this.$refs['asignar-chofer-modal'].toggle('#toggle-btn')
    },
    getChoferes(){
      this.axios.get(`${this.$store.state.apiDominio}/choferes`, {
          headers: {
            Authorization: 'Bearer ' + this.getLoggedUserToken()
          }
      }).then(response => {
        // ESTA EN GLOBAL MIXIN 
        this.eliminarCamposPrivados(response.data)
        response.data=response.data.map(chofer => 
          {
            var obj ={
              value:chofer._id,
              text:chofer.nombre+' '+chofer.apellido
            }
            return obj
          }
        )
        response.data.push({ value: null, text: '' })
        this.dataChoferesAsignar = response.data
      }).catch(error =>{
        console.log(error);
      })
    },
    eliminar(id){
      this.axios.delete(
        `${this.getDominioApi()}/${this.entidad}/${id}`, 
          {
            headers: {Authorization: 'Bearer ' + this.getLoggedUserToken()}
          }
      )
      .then(response=> {
        console.log(response);
        this.responseEliminado=response
        setTimeout(() => {
          location.reload()
        }, 3000);
      })
      .catch(error =>{
        this.response=error
      })
    },
    setData(data){
      this.data = data 
    },
    getData(){
      return this.data 
    },
    isSortable(campo){
      let campos = this.getCamposOrdenables()
      return campos.includes(campo)
    },
  },
  computed:{
    getFields(){
      // if(this.datos.length != 0){
      if(this.datos){
        /* Obtiene los campos estaticos que comparten todas las tablas */
        const staticFields = this.getCRUDStaticFields()

        // Filtra los campos que vamos a renderizar
        const fields= Object.keys(this.datos[0]).map((field)=>{
          if(field != '_id' && field != 'fechaCreacion' && field != 'fechaBaja'){
            // Si son campos que puedan ordenar la tabla les agrega la propiedad sortable
            return {key:field, sortable:this.isSortable(field)? true: false}
          }
        })
        // 
        if (this.entidad == 'viajes') {          
          this.datos.forEach(element => {
            element.vehiculo = element.vehiculo.patente ?  element.vehiculo.patente : {}
            element.cliente = element.cliente.cuit ?  element.cliente.cuit : {}
          })
        } else if (this.entidad == 'vehiculos') {
          this.datos.forEach(element => {
            element.chofer = element.chofer.CUIT ?  element.chofer.CUIT : {}
          })
        }
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
    },
    getDataChoferesAsignar(){
      return this.dataChoferesAsignar
    }
  }
}
</script>

<style scoped>

</style>
