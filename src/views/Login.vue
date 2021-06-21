<template>
  <div class="login">
    <PantallaEntrada :isLogin="true" :recursoCargado="recursoCargado" :response="response" @envioFormulario="postLogin($event)"/>
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
    postLogin(data){
      this.recursoCargado=false
      this.axios.post(
        `${this.getDominioApi}/${this.entidadApi}/login`, 
      {
        email: data.email,
        password: data.password,
      })
      .then(response=> {
        this.response=response
      })
      .catch(error =>{
        Object.keys(error)
        this.response={mensaje:error.response.data , status:error.response.status}
      })
      this.recursoCargado=true
    },
  },
  computed:{
  }
}
</script>
