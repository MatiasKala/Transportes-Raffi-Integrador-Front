import Vue from 'vue'
import VueForm from 'vue-form'
import $store from '../store/index'

var options = {
    validators:{
        'validar-email' : (valor)=>{
            valor
        },
        'no-espacios' : function(value) {
            return !value.includes(' ')
        },
        'no-caracteres' : function(value) {
            return !Array.from(value).some(r=> Array.from($store.state.caracteresNoPermitidosContrasenia).includes(r))
        }
    }
}

Vue.use(VueForm, options)