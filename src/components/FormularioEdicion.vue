<template>
  <vue-form :state="formState" @submit.prevent="enviarEditar(datosActualesTabla.index)">
    <h3>Ingrese los campos que quiere modificar del {{entidad | aSingular}} {{datosActualesTabla.item._id}}</h3>
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
        
        :minlength="getMin(label)"
        :maxlength="getMax(label)"
        
      >
      <!--  lo que vamos a hacer es ponerle 0 cuando no hay limite a min y 9999 a max  -->
    </validate>
    {{formData}} 
    <br>
    <b-button v-if="formState.$invalid || formState.$dirty" class="mt-3 btn-disabled" @click="enviarEditar(datosActualesTabla.index)">
      Enviar
    </b-button>
    <b-button v-else class="mt-3 btn-envio" variant="warning" @click="enviarEditar(datosActualesTabla.index)">
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
        // Va a haber que agregar mas harcodeados o cambiar el metodo
        switch (label) {
          case 'comision':
            return 'number'
          case 'fechaNacimiento':
            return 'date'
          default:
            return 'text'
        }
      },
      getMin(label){
        return this.$store.state.labelsLengthMins[label]
      },
      getMax(label){
        return this.$store.state.labelsLengthMaxs[label]
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
  .btn-disabled{
	text-transform: uppercase;
	text-decoration: none;
	padding: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
	border-radius: 5px;
	display: inline-block;
	border: none;
	transition: all 0.7s ease 0s;
  }
  .btn-envio{
	text-transform: uppercase;
	text-decoration: none;
	padding: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
	border-radius: 5px;
	display: inline-block;
	border: none;
	transition: all 0.7s ease 0s;
  }
</style>
