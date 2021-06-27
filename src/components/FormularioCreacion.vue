<template>
  <vue-form :state="formState" @submit.prevent="enviar()">
    <h3>Ingrese los datos del nuevo {{entidad | aSingular}}</h3>
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
        required
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
        required
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
        required
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
        required
        v-model.trim="formData[label]"
      >

      <field-messages :name="label" show="$dirty">
        <div slot="required" class="alert alert-danger mt-2">Campo requerido</div>            
        <div slot="minlength" v-if="label != 'CUIT'" class="alert alert-danger mt-2">Ingrese como minimo {{getMin(label)}} caracteres</div>            
        <div slot="minlength" v-else class="alert alert-danger mt-2">El CUIT debe tener {{getMin(label)}} numeros</div>            
        <div v-if="formData[label].length == getMax(label) && label != 'CUIT'"  class="alert alert-warning mt-2">El maximo permitido es de {{getMax(label)}} caracteres</div>            
        <div slot="maxlength" v-else-if="label == 'comision'" class="alert alert-danger mt-2">El maximo permitido es de {{getMax(label)}} caracteres</div>            
        <div slot="no-caracteres" v-if="formData[label].length >= getMin(label)" class="alert alert-danger mt-2">Los caracteres {{getCaracteresInvalidos}} no se permiten en este campo</div>            
        <div slot="solo-numeros" class="alert alert-danger mt-2">En este campo solo se permiten numeros</div>            
      </field-messages>


    </validate>
    {{formData}} 
    <br>    
    <b-button disabled v-if="formState.$invalid" class="mt-3 btn-disabled">
      Enviar
    </b-button>
    <b-button v-else class="mt-3 btn-envio" variant="success" v-b-modal.confirmar-modal>
      Enviar
    </b-button>

    <!-- MODAL DE CONFIRMACION -->
    <b-modal 
      id="confirmar-modal" 
      title="Confirmar Creacion"
      header-bg-variant="info"
      centered
      hide-footer
    >
      <div class="d-block text-center">
        El {{entidad | aSingular}} quedara de la siguiente manera 
      </div>
      <div class="d-block text-center mt-2">
        <b-card>
          <p v-for="(label,index) in getLabels()" :key="index">
            {{label | primeraMayuscula}} : {{label=='comision'?'$':''}} {{formData[getLabels()[index]]}}
          </p>
        </b-card>
      </div>
      
      <div class="d-block text-center" v-if="!response">
        <b-button class="mt-3 mx-4 btn-envio text-center" variant="info" @click="enviar()">
          Confirmar
        </b-button >
        <b-button class="mt-3 mx-4 btn-envio text-center" variant="danger" @click="$bvModal.hide('confirmar-modal')">
          Cancelar
        </b-button >
      </div>
      <div class="d-block text-center" v-else>
        <b-card bg-variant="success" v-if="response.status >= 200" >Creacion realizada correctamente</b-card>
        <b-card bg-variant="danger" v-else>Error en la creacion</b-card>
      </div>
    </b-modal>
  </vue-form>
</template>

<script>

  import { mixinLocal } from "../imports/mixins/localFormulario";
  export default  {
    name: 'formulario-edicion',
    props: ['entidad'],
    mounted () {
    
    },
    mixins:[mixinLocal],
    data () {
      return {
        formState:{},
        formData:this.estadoInicial(),
        response:''
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
      // DEVUELVE CAMPOS QUE VAMOS A PODER MODIFICAR DESDE EL FORMULARIO, ESCONDEN LOS ATRIBUTOS QUE NO SON MODIFICABLES
      getLabels(){
        let datosModificables=Object.keys(this.estadoInicial()).filter(dato => dato !='_id' && dato !='vehiculosAsignados' )
        return datosModificables
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
      enviar(){
        /* HACER LLAMADA A POST */

        this.formData.fechaCreacion = this.getFechaActual()
        this.formData.fechaBaja = null

        this.agregarCampoSegunEntidad(this.entidad)

        this.axios.post(
          `${this.getDominioApi()}/${this.entidad}`, 
            this.formData
            ,
            {
              headers: {Authorization: 'Bearer ' + this.getLoggedUserToken()}
            }
        )
        .then(response=> {
          console.log(response);
          this.response=response
          setTimeout(() => {
            location.reload()
          }, 4000);
        })
        .catch(error =>{
          this.response=error
        })


      },
      agregarCampoSegunEntidad(entidad){
        // COMPLETAR CAMPOS TIPO ARRAY PARA CADA ENTIDAD
        console.log('LLegue a metodo');
        switch (entidad) {
          case 'choferes':
            this.formData.vehiculosAsignados=[]
            break;
          default:
            break;
        }
        console.log(this.formData);
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
