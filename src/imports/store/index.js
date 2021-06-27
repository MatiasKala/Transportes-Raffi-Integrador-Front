import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    caracteresNoPermitidosContrasenia:'(),$\'%#"=-+*~[]`^{};:<>|°¬?¡!',
    apiDominio:'https://stormy-mountain-51560.herokuapp.com',
    // apiDominio:'http://localhost:3000',
    camposOrdenables:'email,username,apellido',
    camposNoValidar:'fechaNacimiento',
    camposValidarLongitud:'',
    camposValidarLongitudNoCaracteresEspeciales:'nombre,apellido',
    camposValidarSoloNumeros:'CUIT,comision',
    labelsLengthMins:{
      "CUIT":11,
      "nombre":3,
      "apellido":3,
      "comision":2,
    },
    labelsLengthMaxs:{
      "CUIT":11,
      "nombre":20,
      "apellido":30,
      "comision":4,
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
