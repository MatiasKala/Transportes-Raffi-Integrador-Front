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
            console.log(response)
            this.$store.dispatch('receiveLoggedUser', response.data)
        },
        getLocalStoreUserUsername(){
            const username = JSON.parse(localStorage.getItem('user'))
            return username ? username.username : null
        },
        cerrarSesion(){
            localStorage.clear()
            location.reload()
        },
        getCamposOrdenables(){
            let campos = this.$store.state.camposOrdenables
            return campos.split(',')
        },
        eliminarCamposPrivados(data){
            return data.forEach(d => {
              delete d.password
              delete d._id
            });
        },
        getCRUDStaticFields(){
            return [
                {key:'Eliminar' }
            ]
        }
    },
    computed : {
        getCaracteresInvalidos() {
            return this.$store.state.caracteresNoPermitidosContrasenia
        },
    }
})
