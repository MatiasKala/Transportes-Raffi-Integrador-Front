<template>
  <vue-form :state="formState" @submit.prevent="enviarEditar(data.index)">
    <h3>Hello From My Modal!</h3>
    <validate tag="div">
      <label for="nombre">Mail
      </label>
      <input 
        type="text" 
        name="nombre" 
        id="nombre"
        class="form-control"
        autocomplete="off"
        v-model.trim="formData.nombre"
        required
      >
    </validate>
    <b-button class="mt-3" variant="warning" @click="enviarEditar(data.index)">
      Enviar
    </b-button>
  </vue-form>
</template>

<script>

  export default  {
    name: 'formulario-edicion',
    props: ['datosActualesTabla','entidad'],
    mounted () {
    
    },
    data () {
      return {
        formState:{},
        formData:this.estadoInicial(),
      }
    },
    methods: {
      estadoInicial(){
        if (this.entidad == 'choferes') {
          return this.estadoInicialChoferes()
        }
        return null
      },
      estadoInicialChoferes(){
        console.log(this.datos);
        return {
          CUIT:'',
          nombre:'',
          apellido:'',
          fechaNacimiento:'',
          comision:'',
        }
      },
      enviarEditar(index){
        console.log('index ',index);
        console.log('id',this.datos[index]._id)
        console.log(this.formData);
      }
    },
    computed: {

    }
}


</script>

<style scoped>
  .formulario-edicion {

  }
</style>
