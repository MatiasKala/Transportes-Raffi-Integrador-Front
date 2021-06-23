import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    caracteresNoPermitidosContrasenia:'(),$\'%#"=-+*~[]`^{};:<>|°¬?¡!',
    apiDominio:'https://stormy-mountain-51560.herokuapp.com',
  },
  actions: {
    receiveLoggedUser({commit},data){
      commit('setLoggedUser',data)
    },
  },  
    mutations: {
    setLoggedUser(state,{user,token}) {
      console.log('Usuario seteado');
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', JSON.stringify(token))
      console.log('Local Storage ',localStorage);
    }
  },
  modules: {
  }
})
