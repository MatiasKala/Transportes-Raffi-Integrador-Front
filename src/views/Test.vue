<template>
  <div class="Test">
    <Tabla :datos="registros" :nombre="entidad"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Tabla from "@/components/Tabla.vue"

export default {
  name: 'TestView',
  components: {
    Tabla
  },
  props:['entidad'],
  data(){
    return{
      registros:this.getRegistros(),
    }
  },
  methods:{
    getRegistros(){
      this.axios.get(`https://stormy-mountain-51560.herokuapp.com/${this.entidad}`).then(response => {
        this.eliminarCamposPrivados(response.data)
        this.registros = response.data
      })
    },
    eliminarCamposPrivados(data){
      return data.forEach(d => {
        delete d.password
        delete d._id
      });
    }
  },
}
</script>
