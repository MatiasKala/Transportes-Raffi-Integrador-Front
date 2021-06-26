import Vue from 'vue'

const entidadesSingular = {
    "choferes":"chofer",
    "viajes":"viaje",
    "vehiculos":"vehiculos",
    "clientes":"clientes",
}

Vue.filter('primeraMayuscula', function(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
})

Vue.filter('separarLabelConEspacios', function(value) {
    if(value == value.toUpperCase()) return value
    return value.match(/([A-Z]?[^A-Z]*)/g).join(" ")
})

Vue.filter('aSingular', function(value) {
    return entidadesSingular[value]
})
