import Vue from 'vue'

Vue.mixin({
    methods:{
        getDominioApi(){
            return this.$store.state.apiDominio
        },
        getLoggedUserToken(){
            return this.$store.state.loggedUser['token']
        },
        setLoggedUser(response){
            this.$store.dispatch('receiveLoggedUser', response.data)
        },
    },
    computed : {
        getCaracteresInvalidos() {
            return this.$store.state.caracteresNoPermitidosContrasenia
        },
    }
})
