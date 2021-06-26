export const mixinLocal = {
    mounted () {
    },
    methods:{
        // ESTADOS INICIALES FORMULARIOS
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
            }
          },
          estadoInicialClientes(){
            return {
            }
          },
          estadoInicialViajes(){
            return {
            }
          },
        // VALIDACIONES FORMULARIOS
        getCamposOrdenables(){
            let campos = this.$store.state.camposOrdenables
            return campos.split(',')
        },
        getCamposValidarLongitud(){
            let campos = this.$store.state.camposSoloValidarLongitud
            return campos.split(',')
        },
        getCamposValidarLongitudNoCaracteresEspeciales(){
            let campos = this.$store.state.camposValidarLongitudNoCaracteresEspeciales
            return campos.split(',')
        },
        getCamposSoloNumeros(){
            let campos = this.$store.state.camposSoloNumeros
            return campos.split(',')
        },
    },
    computed : {
    }
}
