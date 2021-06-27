export const mixinLocal = {
    mounted () {
    },
    methods:{
        // ESTADOS INICIALES FORMULARIOS
        estadoInicialEntidad(labels){
          let objeto = {}
          labels.forEach(e => {
            objeto[e] = ''
          });
          return objeto
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
