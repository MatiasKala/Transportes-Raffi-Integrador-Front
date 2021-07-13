export const mixinLocal = {
    mounted () {
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
          console.log(this.dataChoferesAsignar);
        }).catch(error =>{
          this.responseErrorChoferes = error
          console.log(error);
        })
      },
      asignarChoferAvehiculo(){
        this.axios.put(
          `${this.getDominioApi()}/${this.entidad}/${this.idVehiculoElegido}/${this.idChoferElegido}`, 
          {

          },
          {
            headers: {
              Authorization: 'Bearer ' + this.getLoggedUserToken()
            }
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
          this.responseErrorClientes = error
          console.log(error);
        })
      },
      asignarClienteAviaje(){
        this.axios.put(
          `${this.getDominioApi()}/${this.entidad}/${this.idClienteElegido}/${this.idViajeElegido}`, 
          {
            
          },
          {
            headers: {
              Authorization: 'Bearer ' + this.getLoggedUserToken()
            }
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
          this.responseErrorVehiculos = error 
          console.log(error);
        })
      },
      asignarVehiculoAviaje(){
        this.axios.put(
          `${this.getDominioApi()}/${this.entidad}/${this.idVehiculoElegido}/${this.idViajeElegido}`, 
          {
            
          },
          {
            headers: {
              Authorization: 'Bearer ' + this.getLoggedUserToken()
            }
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
      cambiarVisibilidadCambioEstado(){
        this.$refs['cambio-estado-confirmar-modal'].toggle('#toggle-btn')
      },
      isSortable(campo){
        let campos = this.getCamposOrdenables()
        return campos.includes(campo)
      },
    },
    computed : {
    }
}
