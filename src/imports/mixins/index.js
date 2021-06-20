import Vue from 'vue'

var mixin = {
    mounted () {
    },
    computed : {
        getCaracteresInvalidos() {
            return this.$store.state.caracteresNoPermitidosContrasenia
        },
        getDominioApi(){
            return this.$store.state.apiDominio
        }
    }
}

Vue.mixin(mixin)
