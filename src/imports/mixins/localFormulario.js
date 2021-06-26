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
        getCamposValidarLongitud(){
            let campos = this.$store.state.camposValidarLongitud
            return campos.split(',')
        },
        getCamposValidarLongitudNoCaracteresEspeciales(){
            let campos = this.$store.state.camposValidarLongitudNoCaracteresEspeciales
            return campos.split(',')
        },
        getCamposValidarSoloNumeros(){
            let campos = this.$store.state.camposValidarSoloNumeros
            return campos.split(',')
        },
        getCamposNoValidar(){
            let campos = this.$store.state.camposNoValidar
            return campos.split(',')
        }
    },
    computed : {
    }
}
