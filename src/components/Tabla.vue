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

    <b-row>
      <!-- CREAR REGISTRO -->
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

          <b-form-select v-model="idChoferElegido" :options="dataChoferesAsignar">
            <template #first>
              <b-form-select-option :value="null" disabled>Elija un Chofer</b-form-select-option>
            </template>
          </b-form-select>

          <b-form-select class="mt-4" v-model="idVehiculoElegido" :options="getVehiculosBindeados()">
            <template #first>
              <b-form-select-option :value="null" disabled>A qué vehículo se le asignará</b-form-select-option>
            </template>
          </b-form-select>

          <b-button v-if="idChoferElegido!=null && idVehiculoElegido!=null"  class="mt-2" variant="info" v-b-modal.asignar-chofer-confirmar-modal>Aceptar</b-button>
          <b-button v-else class="mt-2" disabled variant="secondary">Aceptar</b-button>
        </div>
        <b-card class="mt-2" text-variant="light" bg-variant="danger " v-else >No hay choferes para asignar</b-card>
      </b-modal>
      
      <!-- CONFIRMACION ASIGNACION CHOFER VEHICULO -->
      <b-modal 
      id="asignar-chofer-confirmar-modal" 
      title="Confirmar"
      header-bg-variant="info"
      header-text-variant="light"
      centered
      hide-footer
      size="sm"
      >
        <div class="d-block text-center" v-if="idChoferElegido!=null && idVehiculoElegido!=null">
          El chofer de id <strong> {{idChoferElegido}}</strong> sera asignado al vehiculo de id <strong>{{idVehiculoElegido}}</strong>
        </div>
        <div class="d-block text-center" v-if="!response">
          <b-button class="mt-3 mx-4 btn-envio text-center" variant="info" @click="asignarChoferAvehiculo()">
            Confirmar
          </b-button >
          <b-button class="mt-3 mx-4 btn-envio text-center" variant="danger" @click="$bvModal.hide('asignar-chofer-confirmar-modal')">
            Cancelar
          </b-button >
        </div>
        <div class="d-block text-center mt-2" v-else>
          <b-card bg-variant="success" v-if="response.status >= 200" >Modificacion realizada correctamente</b-card>
          <b-card bg-variant="danger" v-else>Error en la modificacion</b-card>
        </div>
        
      </b-modal>


      <!-- ASIGNAR CLIENTE A VIAJE -->
      <button v-if="(!estaVacia && !estaCargando) && this.entidad == 'viajes'" class="btn btn-outline-info ml-3" id="toggle-btn" @click="cambiarVisibilidadAsignarCliente()">Asignar Cliente</button>
      <b-modal 
        ref="asignar-cliente-modal"
        centered
        title="Asignar Cliente"
        header-bg-variant="info"
        header-text-variant="light"
        hide-footer
      >
        <div class="d-block text-center" v-if="getDataClientesAsignar">

          <b-form-select v-model="idClienteElegido" :options="dataClientesAsignar">
            <template #first>
              <b-form-select-option :value="null" disabled>Elija un Cliente</b-form-select-option>
            </template>
          </b-form-select>

          <b-form-select class="mt-4" v-model="idViajeElegido" :options="getViajesBindeados()">
            <template #first>
              <b-form-select-option :value="null" disabled>A qué viaje se le asignará</b-form-select-option>
            </template>
          </b-form-select>

          <b-button v-if="idClienteElegido!=null && idViajeElegido!=null"  class="mt-2" variant="info" v-b-modal.asignar-cliente-confirmar-modal>Aceptar</b-button>
          <b-button v-else class="mt-2" disabled variant="secondary">Aceptar</b-button>
        </div>
        <b-card class="mt-2" text-variant="light" bg-variant="danger" v-else >No hay cliente para asignar</b-card>
      </b-modal>
      
      <!-- CONFIRMACION ASIGNACION CLIENTE VIAJE -->
      <b-modal 
      id="asignar-cliente-confirmar-modal" 
      title="Confirmar"
      header-bg-variant="info"
      header-text-variant="light"
      centered
      hide-footer
      size="sm"
      >
        <div class="d-block text-center" v-if="idClienteElegido!=null && idViajeElegido!=null">
          El cliente de id <strong> {{idClienteElegido}}</strong> sera asignado al viaje de id <strong>{{idViajeElegido}}</strong>
        </div>
        <div class="d-block text-center" v-if="!response">
          <b-button class="mt-3 mx-4 btn-envio text-center" variant="info" @click="asignarClienteAviaje()">
            Confirmar
          </b-button >
          <b-button class="mt-3 mx-4 btn-envio text-center" variant="danger" @click="$bvModal.hide('asignar-cliente-confirmar-modal')">
            Cancelar
          </b-button >
        </div>
        <div class="d-block text-center mt-2" v-else>
          <b-card bg-variant="success" v-if="response.status >= 200" >Modificacion realizada correctamente</b-card>
          <b-card bg-variant="danger" v-else>Error en la modificacion</b-card>
        </div>
        
      </b-modal>

      <!-- ASIGNAR VEHICULO A VIAJE -->
      <button v-if="(!estaVacia && !estaCargando) && this.entidad == 'viajes'" class="btn btn-outline-info ml-3" id="toggle-btn" @click="cambiarVisibilidadAsignarVehiculo()">Asignar Vehiculo</button>
      <b-modal 
        ref="asignar-vehiculo-modal"
        centered
        title="Asignar Vehiculo"
        header-bg-variant="info"
        header-text-variant="light"
        hide-footer
      >
        <div class="d-block text-center" v-if="getDataVehiculosAsignar">

          <b-form-select v-model="idVehiculoElegido" :options="getDataVehiculosAsignar">
            <template #first>
              <b-form-select-option :value="null" disabled>Elija un Vehiculo</b-form-select-option>
            </template>
          </b-form-select>

          <b-form-select class="mt-4" v-model="idViajeElegido" :options="getViajesBindeados()">
            <template #first>
              <b-form-select-option :value="null" disabled>A qué viaje se le asignará</b-form-select-option>
            </template>
          </b-form-select>

          <b-button v-if="idVehiculoElegido!=null && idViajeElegido!=null"  class="mt-2" variant="info" v-b-modal.asignar-vehiculo-confirmar-modal>Aceptar</b-button>
          <b-button v-else class="mt-2" disabled variant="secondary">Aceptar</b-button>
        </div>
        <b-card class="mt-2" text-variant="light" bg-variant="danger" v-else >No hay vehiculo para asignar</b-card>
      </b-modal>
      
      <!-- CONFIRMACION ASIGNACION VEHICULO VIAJE -->
      <b-modal 
      id="asignar-vehiculo-confirmar-modal" 
      title="Confirmar"
      header-bg-variant="info"
      header-text-variant="light"
      centered
      hide-footer
      size="sm"
      >
        <div class="d-block text-center" v-if="idVehiculoElegido!=null && idViajeElegido!=null">
          El vehiculo de id <strong> {{idVehiculoElegido}}</strong> sera asignado al viaje de id <strong>{{idViajeElegido}}</strong>
        </div>
        <div class="d-block text-center" v-if="!response">
          <b-button class="mt-3 mx-4 btn-envio text-center" variant="info" @click="asignarVehiculoAviaje()">
            Confirmar
          </b-button >
          <b-button class="mt-3 mx-4 btn-envio text-center" variant="danger" @click="$bvModal.hide('asignar-vehiculo-confirmar-modal')">
            Cancelar
          </b-button >
        </div>
        <div class="d-block text-center mt-2" v-else>
          <b-card bg-variant="success" v-if="response.status >= 200" >Modificacion realizada correctamente</b-card>
          <b-card bg-variant="danger" v-else>Error en la modificacion</b-card>
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
        responseEliminado:null,
        data:null,
        dataChoferesAsignar:this.getChoferes(),
        idChoferElegido:null,
        idVehiculoElegido:null,
        idClienteElegido:null,
        idViajeElegido:null,
        response:null,
        dataClientesAsignar:this.getClientes(),
        dataVehiculosAsignar:this.getVehiculos()
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
    cambiarVisibilidadAsignarChofer(){
      this.$refs['asignar-chofer-modal'].toggle('#toggle-btn')
    },
    cambiarVisibilidadAsignarCliente(){
      this.$refs['asignar-cliente-modal'].toggle('#toggle-btn')
    },
    cambiarVisibilidadAsignarVehiculo(){
      this.$refs['asignar-vehiculo-modal'].toggle('#toggle-btn')
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
        this.dataChoferesAsignar = response.data
      }).catch(error =>{
        console.log(error);
      })
    },
    getVehiculosBindeados(){
      let vehiculos=this.datos.map(vehiculo => 
        {
          var obj ={
            value:vehiculo._id,
            text:vehiculo.marca+' '+vehiculo.patente
          }
          return obj
        }
      )
      return vehiculos
    },
    getViajesBindeados(){
      let viajes=this.datos.map(viaje => 
        {
          var obj ={
            value:viaje._id,
            text:'Viaje del '+viaje.fechaEntrega+' hacia '+viaje.domicilioEntrega
          }
          return obj
        }
      )
      return viajes
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
    asignarChoferAvehiculo(){
      let token = this.getLoggedUserToken()
      this.axios.put(
        `${this.getDominioApi()}/${this.entidad}/${this.idVehiculoElegido}/${this.idChoferElegido}`, 
          {
            header: {Authorization: 'Bearer ' + token}
          }
      )
      .then(response=> {
        this.response=response
        setTimeout(() => {
          location.reload()
        }, 3000);
      })
      .catch(error =>{
        console.log(error);
        this.response=error
      })
    },
    getClientes(){
      this.axios.get(`${this.$store.state.apiDominio}/clientes`, {
          headers: {
            Authorization: 'Bearer ' + this.getLoggedUserToken()
          }
      }).then(response => {
        // ESTA EN GLOBAL MIXIN 
        this.eliminarCamposPrivados(response.data)
        response.data=response.data.map(cliente => 
          {
            var obj ={
              value:cliente._id,
              text:'Nombre '+cliente.nombre+' CUIT '+cliente.CUIT
            }
            return obj
          }
        )
        this.dataClientesAsignar = response.data
      }).catch(error =>{
        console.log(error);
      })
    },
    asignarClienteAviaje(){
      let token = this.getLoggedUserToken()
      this.axios.put(
        `${this.getDominioApi()}/${this.entidad}/${this.idClienteElegido}/${this.idViajeElegido}`, 
          {
            header: {Authorization: 'Bearer ' + token}
          }
      )
      .then(response=> {
        this.response=response
        setTimeout(() => {
          location.reload()
        }, 3000);
      })
      .catch(error =>{
        console.log(error);
        this.response=error
      })
    },
    getVehiculos(){
      this.axios.get(`${this.$store.state.apiDominio}/vehiculos`, {
          headers: {
            Authorization: 'Bearer ' + this.getLoggedUserToken()
          }
      }).then(response => {
        // ESTA EN GLOBAL MIXIN 
        this.eliminarCamposPrivados(response.data)
        response.data=response.data.map(vehiculo => 
          {
            var obj ={
              value:vehiculo._id,
              text:'Patente '+vehiculo.patente+' Marca '+vehiculo.marca
            }
            return obj
          }
        )
        this.dataVehiculosAsignar = response.data
      }).catch(error =>{
        console.log(error);
      })
    },
    asignarVehiculoAviaje(){
      let token = this.getLoggedUserToken()
      this.axios.put(
        `${this.getDominioApi()}/${this.entidad}/${this.idVehiculoElegido}/${this.idViajeElegido}`, 
          {
            header: {Authorization: 'Bearer ' + token}
          }
      )
      .then(response=> {
        this.response=response
        setTimeout(() => {
          location.reload()
        }, 3000);
      })
      .catch(error =>{
        console.log(error);
        this.response=error
      })
    }
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
        // ACA PARA CAMBIAR COMO SE VEN LOS CAMPOS DE LAS TABLAS QUE ESTAN RELACIONADOS A OTROS
        if (this.entidad == 'viajes') {          
          this.datos.forEach(element => {
            element.vehiculo = element.vehiculo ?  element.vehiculo : {}
            element.cliente = element.cliente?  element.cliente : {}
            console.log(this.datos);
          })
        } else if (this.entidad == 'vehiculos') {
          this.datos.forEach(element => {
            element.chofer = element.chofer ?  element.chofer : {}
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
    },
    getDataClientesAsignar(){
      return this.dataClientesAsignar
    },
    getDataVehiculosAsignar(){
      return this.dataVehiculosAsignar
    }
  }
}
</script>

<style scoped>

</style>
