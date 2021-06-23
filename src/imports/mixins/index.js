import Vue from 'vue'

Vue.mixin({
    methods:{
        getDominioApi(){
            return this.$store.state.apiDominio
        },
        getLoggedUserToken(){
            return JSON.parse(localStorage.getItem('token'))
        },
        setLoggedUser(response){
            console.log(response);
            this.$store.dispatch('receiveLoggedUser', response.data)
        },
        getLocalStoreUserUsername(){
            console.log('Pase por get username');
            const username = JSON.parse(localStorage.getItem('user'))
            return username ? username.username : null
        },
        cerrarSesion(){
            localStorage.clear()
            this.$forceUpdate()
        }
    },
    computed : {
        getCaracteresInvalidos() {
            return this.$store.state.caracteresNoPermitidosContrasenia
        },
    }
})
