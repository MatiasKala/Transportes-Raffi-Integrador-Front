import Vue from 'vue'

Vue.mixin({
    methods:{
        getDominioApi(){
            return this.$store.state.apiDominio
        },
        getLoggedUserToken(){
            return JSON.parse(sessionStorage.getItem('token'))
        },
        setLoggedUser(response){
            this.$store.dispatch('receiveLoggedUser', response.data)
        },
        getLocalStoreUserUsername(){
            const username = JSON.parse(sessionStorage.getItem('user'))
            return username ? username.username : null
        },
        cerrarSesion(){
            sessionStorage.clear()
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
        getStaticFields(isCRUD,isHojaDeRuta){
            if (isCRUD) {
                return [
                    { key: 'editar', label: 'Editar' },
                    { key: 'eliminar', label: 'Eliminar' },
                ]
            }else if (isHojaDeRuta) {
                return [
                    { key: 'pasarAenCurso', label: 'Pasar a En Curso' },
                    { key: 'pasarAfinalizado', label: 'Pasar a Finalizado' },
                    { key: 'VerRuta', label: 'Ver Ruta' },
                ]
            }
        },   
        hayUsuarioLogeadoEnStorage(){
            return sessionStorage.user ? true : false 
        },
        getFechaActual(){
            return String(this.$moment().format().slice(0,10))
        },
        async setCodigoIconoClima(){
            this.$store.dispatch('receiveIconoClima',await
            this.axios.get(
                `${this.getDominioApi()}/hojaDeRuta/clima/icono` ,{
                  headers: {
                    Authorization: 'Bearer ' + this.getLoggedUserToken()
                  }
              } 
            ))
        },
        async getDatosClima(){
            this.$store.dispatch('receiveDataClima',await this.axios.get(
                `${this.getDominioApi()}/hojaDeRuta/clima`,{
                  headers: {
                    Authorization: 'Bearer ' + this.getLoggedUserToken()
                  }
              } 
            ))
        },
        enviarPut(datosActualesEntidad,body,entidadCambiada = null){
            /* HACER LLAMADA A PUT */

            if (!entidadCambiada) {
              this.eliminarCamposVaciosParaEnvio()
            }
            this.axios.put(
              `${this.getDominioApi()}/${entidadCambiada ? entidadCambiada : this.entidad}/${entidadCambiada ? datosActualesEntidad.item._id : datosActualesEntidad._id}`, 
                body,
                {
                  headers: {Authorization: 'Bearer ' + this.getLoggedUserToken()}
                }
            )
            .then(response=> {
              console.log(response);
              this.response=response
              setTimeout(() => {
                if (response.status <400) {
                  location.reload()              
                }else{
                  this.response=''
                }
              }, 4000);
            })
            .catch(error =>{
              this.response=error
              setTimeout(() => {
                this.response=''   
              }, 6000);
            })
        },
        eliminarCamposVaciosParaEnvio(){
          let keys=Object.keys(this.formData)
          keys.forEach(element => {
            if (!this.formData[element]) {
              delete this.formData[element]
            }
          })
        },
        getFechaHoy(){
          var d = new Date(),
              month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();
  
          if (month.length < 2) 
              month = '0' + month;
          if (day.length < 2) 
              day = '0' + day;
  
          return ( [year, month, day].join('-'))
        },
        
    },
    computed : {
        getCaracteresInvalidos() {
            return this.$store.state.caracteresNoPermitidosContrasenia
        },
    }
})
