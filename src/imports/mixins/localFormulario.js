export const mixinLocal = {
    mounted () {
    },
    methods:{
        // ESTADOS INICIALES FORMULARIOS
        estadoInicialEntidad(labels){
          let objeto = {}
          labels.forEach(e => objeto[e] = '');
          return objeto
        },        
        estadoInicialChoferes(){
            return {
              CUIT:'',
              nombre:'',
              apellido:'',
              fechaNacimiento:'',
              comision:'',
            }
        },
          estadoInicialVehiculos(){
            return {
              patente:'',
              marca:'',
              modelo:'',
              anio:'',
              seguro:'',
              tipo:'',
            }
        },
          estadoInicialClientes(){
            return {
              CUIT:'',
              nombre:'',
              direccion:'',
              tipoCobro:'',
            }
        },
          estadoInicialViajes(){
            return {
              fechaEntrega:'',
              domicilioEntrega:'',
              descripcionPaquete:'',
            }
        },
        //DECIDEN EL TIPO DE INPUT QUE SE VA A RENDERIZAR
        inputValidarLongitud(label){
            return this.$store.state.camposValidarLongitud.split(',').includes(label)
        },
        inputLongitudNoCaracteresEspeciales(label){
            return this.$store.state.camposValidarLongitudNoCaracteresEspeciales.split(',').includes(label)
        },
        inputLongitudSoloNumeros(label){
            return this.$store.state.camposValidarSoloNumeros.split(',').includes(label)
        },
        inputNoValidar(label){
            return this.$store.state.camposNoValidar.split(',').includes(label)
        },
        // VALIDACIONES FORMULARIOS
        getMin(label){
            return this.$store.state.labelsLengthMins[label]
        },
        getMax(label){    
            return this.$store.state.labelsLengthMaxs[label]
        },
        getType(label){
            // Va a haber que agregar mas harcodeados o cambiar el metodo
            const labels = {
              'comision':'number',
              'CUIT':'number',
              'anio':'number',
              'viajes':this.estadoInicialViajes(),
              'fechaNacimiento':'date',
              'fechaEntrega':'date',
            }

            return labels[label] ? labels[label] : 'text'

        },
        enviarPut(datosActualesEntidad,body){
          /* HACER LLAMADA A PUT */

          this.eliminarCamposVaciosParaEnvio()
  
          this.axios.put(
            `${this.getDominioApi()}/${this.entidad}/${datosActualesEntidad._id}`, 
              body
              ,
              {
                headers: {Authorization: 'Bearer ' + this.getLoggedUserToken()}
              }
          )
          .then(response=> {
            console.log(response);
            this.response=response
            setTimeout(() => {
              if (response.status <400) {
                location.reload()              
              }else{
                this.response=''
              }
            }, 4000);
          })
          .catch(error =>{
            this.response=error
            setTimeout(() => {
              this.response=''   
            }, 6000);
          })
        },
    },
    computed : {
    }
}
