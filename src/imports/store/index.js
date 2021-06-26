import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    caracteresNoPermitidosContrasenia:'(),$\'%#"=-+*~[]`^{};:<>|°¬?¡!',
    apiDominio:'https://stormy-mountain-51560.herokuapp.com',
    camposOrdenables:'email,username,apellido',
    camposSoloNumeros:'CUIT,',
    camposValidarLongitud:'',
    camposValidarLongitudNoCaracteresEspeciales:'nombre,apellido',
    labelsLengthMins:{
      "CUIT":11,
      "nombre":3,
      "apellido":3,
      "comision":3,
      "fechaNacimiento":-1,
    },
    labelsLengthMaxs:{
      "CUIT":11,
      "nombre":20,
      "apellido":20,
      "comision":4,
      "fechaNacimiento":-1,
    }
  },
  actions: {
    receiveLoggedUser({commit},data){
      commit('setLoggedUser',data)
    },
  },  
    mutations: {
    setLoggedUser(state,{user,token}) {
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', JSON.stringify(token))
    }
  },
  modules: {
  }
})
