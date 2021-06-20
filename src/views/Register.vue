<template>
  <div class="login">
    <PantallaEntrada :isLogin="false" @envioFormulario="postRegister($event)"/>
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
    }
  },
  methods:{
    postRegister(data){
      this.axios.post(
        `${this.getDominioApi}/${this.entidadApi}/`, 
      {        
        username: data.username,
        email: data.email,
        password: data.password,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
    }
  }
}
</script>
