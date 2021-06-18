import Vue from 'vue'
import VueForm from 'vue-form'

var options = {
    validators:{
        'validar-email' : (valor)=>{
            valor
        }
    }
    
}

Vue.use(VueForm, options)