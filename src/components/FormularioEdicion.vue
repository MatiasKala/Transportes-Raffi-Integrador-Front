<template>
  <vue-form :state="formState" @submit.prevent="enviarEditar(datosActualesTabla.index)">
    <h3>Ingrese los campos que quiere modificar de {{datosActualesTabla}}</h3>
    <validate v-for="(label,index) in getLabels" :key="index" tag="div">
      <label :for="label">{{label | primeraMayuscula | separarLabelConEspacios}}
      </label>
      <input 
        :type="getType(label)" 
        :name="label" 
        :id="label"
        class="form-control"
        autocomplete="off"
        v-model.trim="formData[label]"
      >
    </validate>
    {{formData}}
    <br>
    <b-button class="mt-3" variant="warning" @click="enviarEditar(datosActualesTabla.index)">
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
        const estados = {
          'choferes':this.estadoInicialChoferes(),
          'vehiculos':this.estadoInicialVehiculos(),
          'clientes':this.estadoInicialClientes(),
          'viajes':this.estadoInicialViajes(),
        }
        return estados[this.entidad]
      },
      estadoInicialChoferes(){
        return {
          CUIT:'',
          nombre:'',
          apellido:'',
          fechaNacimiento:'',
          comision:'',
        }
      },
      estadoInicialVehiculos(){
        return {
        }
      },
      estadoInicialClientes(){
        return {
        }
      },
      estadoInicialViajes(){
        return {
        }
      },
      enviarEditar(index){
        console.log('index ',index);
        console.log('id',this.datosActualesTabla['item']._id)
        console.log(this.formData);
      },
      getType(label){
        switch (label) {
          case 'comision':
            return 'number'
          case 'fechaNacimiento':
            return 'date'
          default:
            return 'text'
        }
      }
    },
    computed: {
      getLabels(){
        let datosModificables=Object.keys(this.datosActualesTabla.item).filter(dato => dato !='_id' && dato !='vehiculosAsignados' )
        return datosModificables
      }
    }
}


</script>

<style scoped>
  .formulario-edicion {

  }
</style>
