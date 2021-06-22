<template>
  <div class="Test">
    <Tabla :datos="registros1" :nombre="entidad"/>
    <Tabla :datos="registros" :nombre="'Choferes'"/>
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
      registros1:this.getRegistros(),
      registros:this.getRegistrosConToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGNlYWJhYjc1MGI1MzAwMTVjZGMzNjIiLCJpYXQiOjE2MjQzMjc4NjEsImV4cCI6MTYyNDM0MjI2MX0.thS18LhBsE_PFbphzeWKXRfbrasZG5BR7vOzxOXu8FU')
    }
  },
  methods:{
    getRegistros(){
      this.axios.get(`${this.getDominioApi()}/${this.entidad}`).then(response => {
        this.eliminarCamposPrivados(response.data)
        this.registros1 = response.data
      })
    },
    eliminarCamposPrivados(data){
      return data.forEach(d => {
        delete d.password
        delete d._id
      });
    },
    getRegistrosConToken(token){
      this.registros=this.axios.get(`${this.$store.state.apiDominio}/choferes`, {
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
