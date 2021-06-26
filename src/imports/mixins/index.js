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
            this.$store.dispatch('receiveLoggedUser', response.data)
        },
        getLocalStoreUserUsername(){
            const username = JSON.parse(localStorage.getItem('user'))
            return username ? username.username : null
        },
        cerrarSesion(){
            localStorage.clear()
            this.$router.push({ path: `/` })
            location.reload()
        },
        getCamposOrdenables(){
            let campos = this.$store.state.camposOrdenables
            return campos.split(',')
        },
        eliminarCamposPrivados(data){
            return data.forEach(d => {
              delete d.password
            });
        },
        getCRUDStaticFields(){
            return [
                { key: 'editar', label: 'Editar' },
                { key: 'eliminar', label: 'Eliminar' },
            ]
        },   
        hayUsuarioLogeadoEnStorage(){
            return localStorage.user ? true : false 
        }
    },
    computed : {
        getCaracteresInvalidos() {
            return this.$store.state.caracteresNoPermitidosContrasenia
        },
    }
})
