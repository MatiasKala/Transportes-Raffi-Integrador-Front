<template>
  <b-container class="tabla">
    <h1>Tabla de {{entidad | primeraMayuscula | separarLabelConEspacios}}</h1>

    <!-- Si la tabla todavia no cargó -->
    <div class="text-center my-5" v-if="!datos">
      <div >
        <div class="text-center mb-3 ">
          <h3><b class="mr-3"> Cargando tabla... </b></h3>
          <b-spinner
          variant="dark"
          ></b-spinner>
        </div>
      </div>
    </div>


    <div  v-if="datos && datos.length != 0" class="table-container my-5">
      <b-table table-variant='light' head-variant="dark" outlined hover responsive  :items="datos" :fields="getFields">

        <!-- CHOFER Campo personalizado -->
        <template v-if="this.entidad == 'vehiculos'" #cell(chofer)="data">
          <b v-if="data.item.chofer._id">{{ '_id: '+data.item.chofer._id }}</b>
          <b v-else>{{'---------'}}</b>
        </template>

        <!-- CLIENTE Campo personalizado -->
        <template v-if="this.entidad == 'viajes' || this.entidad == 'hojaDeRuta'" #cell(cliente)="data">
          <b v-if="data.item.cliente._id">{{ '_id: '+data.item.cliente._id }}</b>
          <b v-else>{{'---------'}}</b>
        </template>

        <!-- VEHICULO Campo personalizado -->
        <template v-if="this.entidad == 'viajes' || this.entidad == 'hojaDeRuta'" #cell(vehiculo)="data">
          <b v-if="data.item.vehiculo._id">{{ '_id: '+data.item.vehiculo._id }}</b>
          <b v-else>{{'---------'}}</b>
        </template>     

        <!-- EDITAR Y ELIMINAR Campos personalizados -->
          
          <!-- EDITAR -->
  
        <template v-if="isCRUD" #cell(editar)="data">
          <button class="btn btn-outline-warning" id="toggle-btn" @click="cambiarVisibilidadEditar(data)">Editar</button>
          <b-modal 
            ref="editar-modal" 
            title="Editar"
            header-bg-variant="warning"
            hide-footer
          >
            <div class="d-block text-center">
              <FormularioEdicion :datosActualesTabla="getData()" :entidad="entidad"/>
            </div>
          </b-modal>
        </template>
          
          <!-- ELIMINAR -->

        <template v-if="isCRUD" #cell(eliminar)="data">
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
            <hr style="background-color:#dc3545">
            <div class="d-block text-center" v-if="!responseEliminado">
              <b-button class="mt-3 mx-4 botonEnvio text-center" variant="info" @click="eliminar(getData() ? getData().item._id:'')">
                Confirmar
              </b-button >
              <b-button class="mt-3 mx-4 botonEnvio text-center" variant="danger" @click="$bvModal.hide('eliminar-modal')">
                Cancelar
              </b-button >
            </div>
            <div class="d-block text-center mt-2"  v-else>
              <b-card bg-variant="success" v-if="responseEliminado.status >= 200" >Eliminacion realizada correctamente</b-card>
              <b-card bg-variant="danger" v-else>Error en la Eliminacion</b-card>
            </div>
          </b-modal>
          
          
          
        </template>

        <!-- CAMPOS HOJA DE RUTA -->
        <template v-if="isHojaDeRuta" #cell(pasarAenCurso)="data">
          <button class="btn btn-outline-info" id="toggle-btn" @click="cambioEstado(data,{estado:'EN CURSO'})">A En Curso</button>
        </template>

        <template v-if="isHojaDeRuta" #cell(pasarAfinalizado)="data">
          <button class="btn btn-outline-secondary" id="toggle-btn" @click="cambioEstado(data,{estado:'FINALIZADO'})">A Finalizado</button>
        </template>
      </b-table>
    </div>


    <!-- CAMPOS CREAR Y ASIGNAR -->
    <b-row>
      
      <!-- CREAR REGISTRO -->
      <button v-if="this.entidad != 'hojaDeRuta'" class="btn btn-outline-primary ml-3 mt-2" id="toggle-btn" @click="cambiarVisibilidadAgregar()">Agregar {{this.entidad | aSingular }}</button>
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
      <button v-if="datos && datos.length != 0  && this.entidad == 'vehiculos'" class="btn btn-outline-info ml-3 mt-2" id="toggle-btn" @click="cambiarVisibilidadAsignarChofer()">Asignar Chofer</button>
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

          <b-form-select class="mt-4" v-model="idVehiculoElegido" :options="dataVehiculosAsignar">
            <template #first>
              <b-form-select-option :value="null" disabled>A qué vehículo se le asignará</b-form-select-option>
            </template>
          </b-form-select>
          <hr class="hr-verdeAgua">
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
        <hr class="hr-verdeAgua">
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
      <button v-if="datos && datos.length != 0 && this.entidad == 'viajes'" class="btn btn-outline-info ml-3 mt-2" id="toggle-btn" @click="cambiarVisibilidadAsignarCliente()">Asignar Cliente</button>
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
          <hr class="hr-verdeAgua">
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
        <hr class="hr-verdeAgua">
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
      <button v-if="(datos && datos.length != 0 && this.entidad == 'viajes') && responseVehiculos " class="btn btn-outline-info ml-3 mt-2" id="toggle-btn" @click="cambiarVisibilidadAsignarVehiculo()">Asignar Vehiculo</button>
      <b-modal 
        ref="asignar-vehiculo-modal"
        centered
        title="Asignar Vehiculo"
        header-bg-variant="info"
        header-text-variant="light"
        hide-footer
      >
        <div v-if="responseVehiculos.error">
          <b-card class="mt-2" text-variant="light" bg-variant="danger" >Usted no esta autorizado para hacer asignaciones</b-card>
        </div>

        <div v-else>        
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

            <hr class="hr-verdeAgua">
            <b-button v-if="idVehiculoElegido!=null && idViajeElegido!=null"  class="mt-2" variant="info" v-b-modal.asignar-vehiculo-confirmar-modal>Aceptar</b-button>
            <b-button v-else class="mt-2" disabled variant="secondary">Aceptar</b-button>
          </div>
          <b-card class="mt-2" text-variant="light" bg-variant="danger" v-else >No hay vehiculo para asignar</b-card>
        </div>

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
        <hr class="hr-verdeAgua">
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

  <!-- Si no hay datos en la tabla -->
  <div class="my-5" v-if="datos && datos.length == 0">TABLA SIN DATOS</div>
    
    
  </b-container>
</template>

<script>
import FormularioCreacion from "../components/FormularioCreacion.vue";
import FormularioEdicion from "../components/FormularioEdicion.vue";
import { mixinLocal } from "../imports/mixins/localTabla";

export default {
  name: 'tabla',
  props: ['datos','entidad','isCRUD','isHojaDeRuta'],
  components:{
    FormularioCreacion,
    FormularioEdicion,
    
  },
  mixins:[mixinLocal],
  data(){
    return{
        responseEliminado:null,
        data:null,
        idChoferElegido:null,
        idVehiculoElegido:null,
        idClienteElegido:null,
        idViajeElegido:null,
        response:null,
        responseChoferes:null,
        responseClientes:null,
        responseVehiculos:null,
        dataChoferesAsignar:this.getChoferes(),
        dataClientesAsignar:this.getClientes(),
        dataVehiculosAsignar:this.getVehiculos()
    }
  },
  methods:{
    getChoferes(){
      console.log('GET CHOFERES');
      this.axios.get(`${this.$store.state.apiDominio}/choferes`, {
          headers: {
            Authorization: 'Bearer ' + this.getLoggedUserToken()
          }
      }).then(response => {
        // ESTA EN GLOBAL MIXIN 
        this.responseChoferes = response 
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
        this.responseChoferes = error
        console.log(error);
      })
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
      console.log('GET CLIENTES');
      this.axios.get(`${this.$store.state.apiDominio}/clientes`, {
        headers: {
          Authorization: 'Bearer ' + this.getLoggedUserToken()
          }
      }).then(response => {
        // ESTA EN GLOBAL MIXIN 
        this.responseClientes = response 
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
        this.responseClientes = error
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
      console.log('GET VEHICULOS');
      this.axios.get(`${this.$store.state.apiDominio}/vehiculos`, {
        headers: {
          Authorization: 'Bearer ' + this.getLoggedUserToken()
          }
      }).then(response => {
        // ESTA EN GLOBAL MIXIN 
        this.responseVehiculos = response 
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
        this.responseVehiculos = error 
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
    },
   
    getViajesBindeados(){
      console.log('GET VIAJES BINDEADOS');
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

    setData(data){
      this.data = data 
    },
    getData(){
      return this.data 
    },

    cambioEstado(data,body){
      // HACER VALIDACIONES PARA VER SI 
      // SE PUEDE HACER EL CAMBIO DE ESTADO

      // enviarPut ESTA EN GLOBAL MIXIN 
      this.enviarPut(data,body,'viajes')
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
  },
  computed:{
    getFields(){
      if(this.datos.length != 0){
      // if(this.datos){
        /* Obtiene los campos estaticos que comparten todas las tablas */
        // ESTAN EN MIXIN GLOBAL
        const staticFields = this.getCRUDStaticFields(this.isCRUD,this.isHojaDeRuta)

        // Filtra los campos que vamos a renderizar
        const fields= Object.keys(this.datos[0]).map((field)=>{
          if(field != '_id' && field != 'fechaCreacion' && field != 'fechaBaja'){
            // Si son campos que puedan ordenar la tabla les agrega la propiedad sortable
            return {key:field, sortable:this.isSortable(field)? true: false}
          }
        })
        // Devuelve los campos propios de cada entidad + los campos estaticos
        return fields.concat(staticFields)
      }
      return []
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

<style>
.hr-verdeAgua{
  background-color: #17a2b8;
}
</style>
