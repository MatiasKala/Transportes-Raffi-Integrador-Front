<template>
  <div class="login">
    <PantallaEntrada :isLogin="false" :recursoCargado="recursoCargado" :response="response" @envioFormulario="postRegister($event)"/>
  </div>
</template>

<script>
// @ is an alias to /src
import PantallaEntrada from '@/components/PantallaEntrada.vue'

export default {
  name: 'loginComponent',
  components: {
    PantallaEntrada
  },
  data(){
    return{
      entidadApi:'usuarios',
      recursoCargado:true,
      response:null
    }
  },
  methods:{
    postRegister(data){
      this.recursoCargado=false
      
      this.axios.post(
        `${this.getDominioApi()}/${this.entidadApi}/`, 
        data,
      )
      .then(response => {
        response.isRegister = true
        this.response=response
      })
      .catch(error => {
        this.response={mensaje:error.response.data , status:error.response.status}
      })
      this.recursoCargado=true
    }
  }
}
</script>
