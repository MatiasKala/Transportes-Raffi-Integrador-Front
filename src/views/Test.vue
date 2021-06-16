<template>
  <div class="Test">
    <Tabla :datos="usuarios"/>
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
  data(){
    return{
      usuarios:this.getUsuarios(),
    }
  },
  methods:{
    getUsuarios(){
      this.axios.get('https://stormy-mountain-51560.herokuapp.com/usuarios').then(response => {
        this.eliminarCamposPrivados(response.data)
        this.usuarios = response.data
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
