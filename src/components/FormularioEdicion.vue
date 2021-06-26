<template>
  <vue-form :state="formState" @submit.prevent="enviarEditar(datosActualesTabla.index)">
    <h3>Ingrese los campos que quiere modificar del {{entidad | aSingular}} {{datosActualesTabla.item._id}}</h3>
    <validate v-for="(label,index) in getLabels" :key="index" tag="div">
      <label :for="label">{{label | primeraMayuscula | separarLabelConEspacios}}
      </label>

      <!-- SOLO LONGITUD -->
     
      <input 
        v-if="inputValidarLongitud(label)"
        :type="getType(label)" 
        :name="label" 
        :id="label"
        class="form-control"
        autocomplete="off"
        v-model.trim="formData[label]"
        :minlength="getMin(label)"
        :maxlength="getMax(label)"
      >
      <field-messages :name="label" show="$dirty">
        <div slot="minlength" class="alert alert-danger mt-2">Ingrese como minimo {{getMin(label)}} caracteres</div>            
        <div v-if="formData[label].length == getMax(label) && label!='CUIT' " class="alert alert-warning mt-2">El maximo permitido es de {{getMax(label)}} caracteres</div>            
      </field-messages>

      <!-- CARACTERES ESPECIALES -->
     
     
      <input 
        v-if="inputLongitudNoCaracteresEspeciales(label)"
        :type="getType(label)" 
        :name="label" 
        :id="label"
        class="form-control"
        autocomplete="off"
        v-model.trim="formData[label]"
        :minlength="getMin(label)"
        :maxlength="getMax(label)"
        no-caracteres
        solo-numeros
      >
      <field-messages :name="label" show="$dirty">
        <div slot="minlength" class="alert alert-danger mt-2">Ingrese como minimo {{getMin(label)}} caracteres</div>            
        <div v-if="formData[label].length == getMax(label)" class="alert alert-warning mt-2">El maximo permitido es de {{getMax(label)}} caracteres</div>            
        <div slot="no-caracteres" v-if="formData[label].length >= getMin(label)" class="alert alert-danger mt-2">Los caracteres {{getCaracteresInvalidos}} no se permiten en este campo</div>            
      </field-messages>


      <!-- SOLO NUMEROS -->
     
     
      <input 
        v-if="inputLongitudSoloNumeros(label)"
        :type="getType(label)" 
        :name="label" 
        :id="label"
        class="form-control"
        autocomplete="off"
        v-model.trim="formData[label]"
        :minlength="getMin(label)"
        :maxlength="getMax(label)"
        no-caracteres
        solo-numeros
      >
      <field-messages :name="label" show="$dirty">
        <div slot="minlength" class="alert alert-danger mt-2">Ingrese como minimo {{getMin(label)}} caracteres</div>            
        <div v-if="formData[label].length == getMax(label)" class="alert alert-warning mt-2">El maximo permitido es de {{getMax(label)}} caracteres</div>            
        <div slot="solo-numeros" class="alert alert-danger mt-2">En este campo solo se permiten numeros</div>            
        <div v-if="formData[label].length >= getMin(label)" slot="no-caracteres" class="alert alert-danger mt-2">Los caracteres {{getCaracteresInvalidos}} no se permiten en este campo</div>            
      </field-messages>
    </validate>
    {{formData}} 
    <br>
    <br>
    {{formState.nombre}}
    <br>
    <b-button disabled v-if="formState.$invalid && formState.$dirty" class="mt-3 btn-disabled" @click="enviarEditar(datosActualesTabla.index)">
      Enviar
    </b-button>
    <b-button v-else class="mt-3 btn-envio" variant="warning" @click="enviarEditar(datosActualesTabla.index)">
      Enviar
    </b-button>
  </vue-form>
</template>

<script>

  import { mixinLocal } from "../imports/mixins/localFormulario";
  export default  {
    name: 'formulario-edicion',
    props: ['datosActualesTabla','entidad'],
    mounted () {
    
    },
    mixins:[mixinLocal],
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
      enviarEditar(index){
        console.log('index ',index);
        console.log('id',this.datosActualesTabla['item']._id)
        console.log(this.formData);
      },
      getType(label){
        // Va a haber que agregar mas harcodeados o cambiar el metodo
        switch (label) {
          case 'comision' || 'CUIT':
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
      },
      inputValidarLongitud(label){
        return this.getCamposValidarLongitud().includes(label)
      },
      inputLongitudNoCaracteresEspeciales(label){
        return this.getCamposValidarLongitudNoCaracteresEspeciales().includes(label)
      },
      inputLongitudSoloNumeros(label){
        return this.getCamposValidarL().includes(label)
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
