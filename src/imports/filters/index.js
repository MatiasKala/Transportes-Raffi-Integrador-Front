import Vue from 'vue'

Vue.filter('primeraMayuscula', function(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
})

Vue.filter('separarLabelConEspacios', function(value) {
    if(value == value.toUpperCase()) return value
    return value.match(/([A-Z]?[^A-Z]*)/g).join(" ")
})