import Vue from 'vue'
import VueForm from 'vue-form'
import $store from '../store/index'

var options = {
    validators:{
        'no-espacios' : function(value) {
            return !value.includes(' ')
        },
        'no-caracteres' : function(value) {
            return !Array.from(value).some(r=> Array.from($store.state.caracteresNoPermitidosContrasenia).includes(r))
        },
        'validar-email' : function(value) {
            return value.match(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)
        },
    }
}

Vue.use(VueForm, options)