import Vue from 'vue'

Vue.mixin({
    methods:{
        getDominioApi(){
            return this.$store.state.apiDominio
        }
    },
    computed : {
        getCaracteresInvalidos() {
            return this.$store.state.caracteresNoPermitidosContrasenia
        },
    }
})
