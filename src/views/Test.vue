<template>
  <div class="Test">
    <Tabla :datos="getUsuarios"/>
    <button @click="getUsuarios">AAAAAA</button>
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
  methods:{
    getUsuarios(){
      this.axios.get('https://stormy-mountain-51560.herokuapp.com/usuarios').then((response) => {
        console.log(response.data)
      })
    }
  }
}
</script>
