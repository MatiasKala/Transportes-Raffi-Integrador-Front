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
        inputFecha(label){
          return this.$store.state.camposFecha.split(',').includes(label)
        },
        esEnum(label){
          return this.$store.state.camposEnum.split(',').includes(label)
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
            // 'fechaNacimiento':'date',
            // 'fechaEntrega':'date',
          }
          
          return labels[label] ? labels[label] : 'text'
          
        },
        getEnumOptions(label){
          return this.$store.state.enumOptions[label]
        },
        getFechaMin(label){
          if(label == 'fechaEntrega'){
            return this.getFechaHoy()
          } else {
            return undefined
          }
        },
        getFechaHoy(){
          var d = new Date(),
              month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();
  
          if (month.length < 2) 
              month = '0' + month;
          if (day.length < 2) 
              day = '0' + day;
  
          return ( [year, month, day].join('-'))
        }
    },
    computed : {
    }
}
