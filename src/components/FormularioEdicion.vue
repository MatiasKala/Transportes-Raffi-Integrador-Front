<template>
  <vue-form :state="formState" @submit.prevent="confirmarEnvio(datosActualesTabla.index)">
    <h3>Ingrese los campos que quiere modificar del {{entidad | aSingular}} {{datosActualesTabla.item._id}}</h3>
    <validate v-for="(label,index) in getLabels()" :key="index" tag="div">
      <label class="mt-2" :for="label">{{label | primeraMayuscula | separarLabelConEspacios}}
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
      >

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
        solo-numeros
      >

      <!-- INPUT NO VALIDAR -->
     
      <input 
        v-if="inputNoValidar(label)"
        :type="getType(label)" 
        :name="label" 
        :id="label"
        class="form-control"
        autocomplete="off"
        v-model.trim="formData[label]"
      >

      <field-messages :name="label" show="$dirty">
        <div slot="minlength" class="alert alert-danger mt-2">Ingrese como minimo {{getMin(label)}} caracteres</div>            
        <div v-if="formData[label] && formData[label].length == getMax(label) &&  label != 'CUIT'"  class="alert alert-warning mt-2">El maximo permitido es de {{getMax(label)}} caracteres</div>            
        <div slot="maxlength" class="alert alert-danger mt-2">El maximo permitido es de {{getMax(label)}} caracteres</div>            
        <div slot="no-caracteres" v-if="formData[label] && formData[label].length >= getMin(label)" class="alert alert-danger mt-2">Los caracteres {{getCaracteresInvalidos}} no se permiten en este campo</div>            
        <div slot="solo-numeros" class="alert alert-danger mt-2">En este campo solo se permiten numeros</div>            
      </field-messages>

    </validate>
    <br>    
    <hr>
    <b-button disabled v-if="formState.$invalid || !formState.$dirty" class="mt-3 btn-disabled">
      Enviar
    </b-button>
    <b-button v-else class="mt-3 botonEnvio" variant="warning" v-b-modal.confirmar-modal>
      Enviar
    </b-button>

    <!-- MODAL DE CONFIRMACION -->
    <b-modal 
      id="confirmar-modal" 
      title="Confirmar Modificacion"
      header-bg-variant="info"
      centered
      hide-footer
    >
      <div class="d-block text-center">
        El {{entidad | aSingular}} de id <b>{{datosActualesTabla.item._id}}</b> quedara de la siguiente manera 
      </div>
      <div class="d-block text-center mt-2">
        <b-card>
          <p v-for="(label,index) in getLabels()" :key="index">
            {{label | primeraMayuscula}} : {{label=='comision'?'$':''}} {{formData[getLabels()[index]] ? formData[getLabels()[index]] : datosActualesTabla.item[getLabels()[index]]}}
          </p>
        </b-card>
      </div>
      <hr style="background-color: #17a2b8;">
      <div class="d-block text-center" v-if="!response"> 
        <!-- ENVIAR PUT ESTA DENTRO DEL MIXIN LOCAL FORMULARIO -->
        <b-button class="mt-3 mx-4 botonEnvio text-center" variant="info" @click="enviarPut(datosActualesTabla.item,formData)">
          Confirmar
        </b-button >
        <b-button class="mt-3 mx-4 botonEnvio text-center" variant="danger" @click="$bvModal.hide('confirmar-modal')">
          Cancelar
        </b-button >
      </div>
      <div class="d-block text-center mt-2" v-else>
        <b-card bg-variant="success" v-if="response.status >= 200" >Creacion realizada correctamente</b-card>
        <b-card bg-variant="danger" v-else>Error en la creacion <br> {{response.response.data.error}}</b-card>
      </div>
    </b-modal>
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
        response:'',
      }
    },
    methods: {
      estadoInicial(){
        return this.estadoInicialEntidad(this.getLabels())
      },
      // DEVUELVE CAMPOS QUE VAMOS A PODER MODIFICAR DESDE EL FORMULARIO, ESCONDEN LOS ATRIBUTOS QUE NO SON MODIFICABLES
      getLabels(){
        let datosModificables=Object.keys(this.datosActualesTabla.item)
                                    .filter(dato => dato !='_id' && dato !='vehiculosAsignados' 
                                                 && dato !='cliente' && dato != 'chofer' && dato != 'vehiculo' 
                                                 && dato !='fechaCreacion' && dato != 'fechaBaja'  
                                                 && dato != 'estado'
                                    )
        return datosModificables
      },
    },
    computed: {

    },
}


</script>

<style scoped>
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
.botonEnvio {
	color: #fff !important;
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
.botonEnvio:hover {
	letter-spacing: 5px;
	-webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
	-moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
	box-shadow: 5px 40px -10px rgba(0,0,0,0.57);
	transition: all 0.7s ease 0s;
}
hr{
  background-color: #ffc107;
}
</style>
