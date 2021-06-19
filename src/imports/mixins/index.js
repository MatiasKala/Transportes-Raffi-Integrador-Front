import Vue from 'vue'

var mixin = {
    mounted () {
    },
    computed : {
        getCaracteresInvalidos() {
            return this.$store.state.caracteresNoPermitidosContrasenia
        },
    }
}

Vue.mixin(mixin)
