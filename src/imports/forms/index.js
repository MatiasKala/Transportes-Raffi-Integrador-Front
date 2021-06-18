import Vue from 'vue'
import VueForm from 'vue-form'

var options = {
    validators:{
        'validar-email' : (valor)=>{
            valor
        },
        'no-espacios' : function(value) {
            return !value.includes(' ')
        }
    }
    
}

Vue.use(VueForm, options)