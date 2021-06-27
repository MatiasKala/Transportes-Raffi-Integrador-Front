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
              chofer:'',
            }
        },
          estadoInicialClientes(){
            return {
              cuit:'',
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
              vehiculo:'',
              cliente:'',
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
            switch (label) {
              case 'comision' || 'CUIT':
                return 'number'
              case 'fechaNacimiento':
                return 'date'
              default:
                return 'text'
            }
        },
    },
    computed : {
    }
}
