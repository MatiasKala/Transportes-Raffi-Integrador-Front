import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    caracteresNoPermitidosContrasenia:'(),$\'%#"=-+*~[]`^{};:<>|°¬?¡!',
    apiDominio:'https://stormy-mountain-51560.herokuapp.com',
    loggedUser:{}
  },
  actions: {
    recieveLoggedUser({commit},data){
      commit('setLoggedUser',data.user,data.token)
    },
  },  
    mutations: {
    setLoggedUser(state,user,token) {
      state.loggedUser = {user:user,token:token}
    }
  },
  modules: {
  }
})
