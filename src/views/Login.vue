<template>
  <div class="login">
    <PantallaEntrada :isLogin="true" @envioFormulario="postLogin($event)"/>
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
    postLogin(data){
      this.axios.post(
        `${this.getDominioApi}/${this.entidadApi}/login`, 
      {
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
