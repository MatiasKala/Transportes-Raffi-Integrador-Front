<template>
  <div class="Test">
    <Tabla :datos="registros" :nombre="entidad" :isCRUD="true"/>
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
      registros:this.getRegistrosCon(this.getLoggedUserToken())
    }
  },
  methods:{
    getRegistrosCon(token){
      this.registros=this.axios.get(`${this.$store.state.apiDominio}/${this.entidad}`, {
          headers: {
            Authorization: 'Bearer ' + token 
          }
      }).then(response => {
        this.eliminarCamposPrivados(response.data)
        this.registros= response.data
      }).catch(error =>{
        console.log(error);
      })
    },
  },
  computed:{

  },
}
</script>
