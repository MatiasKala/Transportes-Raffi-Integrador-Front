import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    caracteresNoPermitidosContrasenia:'(),$\'%#"=-+*~[]`^{};:<>|°¬?¡!',
 
    apiDominio:'https://stormy-mountain-51560.herokuapp.com',
    // apiDominio:'http://localhost:3000',
    viajeElegidoRuta:{},

    camposOrdenables:'email,username,apellido,patente,tipo,tipoCobro,CUIT,fechaNacimiento,fechaEntrega,estado',
    // ACA EMPIEZAN INPUTS
    camposNoValidar:'',
    camposFecha:'fechaNacimiento,fechaEntrega',
    camposValidarLongitud:'',
    camposValidarLongitudNoCaracteresEspeciales:'nombre,apellido,patente,marca,modelo,seguro,direccion,domicilioEntrega,descripcionPaquete',
    camposValidarSoloNumeros:'CUIT,comision,anio',
    camposEnum:'tipo,tipoCobro',

    labelsLengthMins:{
      'CUIT':11,
      'nombre':3,
      'apellido':3,
      'comision':2,
      'patente':6,
      'marca':3,
      'modelo':3,
      'seguro':3,
      'direccion':3,
      'domicilioEntrega':3,
      'descripcionPaquete':3,
    },
    labelsLengthMaxs:{
      'CUIT':11,
      'nombre':20,
      'apellido':30,
      'comision':4,
      'patente':7,
      'marca':20,
      'modelo':20,
      'seguro':20,
      'direccion':40,
      'domicilioEntrega':40,
      'descripcionPaquete':40,
    },
    enumOptions:{
      'tipo':['UTILITARIO','CAMIONETA','AUTO','MOTO','CAMION','BICICLETA'],
      'tipoCobro':['EFECTIVO','TARJETA CREDITO','TARJETA DEBITO','CRIPTO']
    },
    codigoIconoClima: '',
    dataClima: '',
  },
  actions: {
    receiveLoggedUser({commit},data){
      commit('setLoggedUser',data)
    },
    receiveIconoClima({commit},responseCodigo){
      commit('setIconoClima',responseCodigo.data)
    },
    receiveDataClima({commit},responseCodigo){
      commit('setDataClima',responseCodigo.data)
    },
    receiveViajeVerRuta({commit},viaje){
      commit('setViajeVerRuta',viaje.item)
    }
  },  
    mutations: {
    setLoggedUser(state,{user,token}) {
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', JSON.stringify(token))
    },
    setIconoClima(state,codigo) {
      state.codigoIconoClima = codigo
    },
    setDataClima(state,data) {
      state.dataClima = data
    },
    setViajeVerRuta(state,viaje){
      state.viajeElegidoRuta=viaje
    }
  },
  modules: {
  }
})
