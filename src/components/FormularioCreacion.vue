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

      <!-- FECHA CAMPO -->

      <b-col v-if="inputFecha(label)" cols="12">
        <b-card>
          <b-calendar 
            :type="getType(label)" 
            :name="label" 
            :id="label"
            :min="getFechaMin(label)"
            :max="getFechaMax(label)"
            :date-disabled-fn="dateDisabled" 
            v-model.trim="formData[label]"
            show-decade-nav
            required
            today-variant="info"
            nav-button-variant="info"
            selected-variant="success"
            hide-header
            class="m-2 text-center"
            locale="es"
          />
        </b-card>
      </b-col>

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

      <!-- INPUT DROPDOWN ENUMS -->
      <select 
        v-if="esEnum(label)"
        :name="label" 
        :id="label"
        class="custom-select form-control" 
        autocomplete="off"
        required
        v-model.trim="formData[label]"
      >
        <option selected disabled>Elija {{label | primeraMayuscula | separarLabelConEspacios}}...</option>
        <option v-for="(option,index) in getEnumOptions(label)" :key="index">{{option}}</option>
      </select>


      <field-messages :name="label" show="$dirty">
        <div slot="required" class="alert alert-danger mt-2">Campo requerido</div>            
        <div slot="minlength" class="alert alert-danger mt-2">Ingrese como minimo {{getMin(label)}} caracteres</div>            
        <div v-if="formData[label].length == getMax(label) && label == 'CUIT'"  class="alert alert-warning mt-2">El maximo permitido es de {{getMax(label)}} caracteres</div>            
        <div slot="maxlength" class="alert alert-danger mt-2">El maximo permitido es de {{getMax(label)}} caracteres</div>            
        <div slot="no-caracteres" v-if="formData[label].length >= getMin(label)" class="alert alert-danger mt-2">Los caracteres {{getCaracteresInvalidos}} no se permiten en este campo</div>            
        <div slot="solo-numeros" class="alert alert-danger mt-2">En este campo solo se permiten numeros</div>            
      </field-messages>


    </validate>
    <br>    
    <hr>
    <br>
    <b-button disabled v-if="formState.$invalid" class="mt-3 btn-disabled">
      Enviar
    </b-button>
    <b-button v-else class="mt-3 botonEnvio" variant="success" v-b-modal.confirmar-modal>
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
      <hr style="background-color: #17a2b8;">
      <div class="d-block text-center" v-if="!response">
        <b-button class="mt-3 mx-4 botonEnvio text-center" variant="info" @click="enviar()">
          Confirmar
        </b-button >
        <b-button class="mt-3 mx-4 botonEnvio text-center" variant="danger" @click="$bvModal.hide('confirmar-modal')">
          Cancelar
        </b-button >
      </div>
      <div class="d-block text-center mt-2" v-else>
        <b-card bg-variant="success" v-if="response.status >= 200" >Creacion realizada correctamente</b-card>
        <b-card bg-variant="danger" v-else>Error en la creacion <br>
          {{response.response.data.error ? response.response.data.error : response.response.data}}
        </b-card>
      </div>
    </b-modal>
  </vue-form>
</template>

<script>

  import { mixinLocal } from "../imports/mixins/localFormulario";
  export default  {
    name: 'formulario-edicion',
    props: ['entidad'],
    mixins:[mixinLocal],
    data () {
      return {
        formState:{},
        formData:this.estadoInicial(),
        response:'',
        valueCalendar:null,
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
      // DEVUELVE CAMPOS QUE VAMOS A PODER MODIFICAR DESDE EL FORMULARIO, ESCONDEN LOS ATRIBUTOS QUE NO SON Creables
      getLabels(){
        let datosCreables=Object.keys(this.estadoInicial()).filter(dato => dato !='_id' && dato != 'chofer' )
        return datosCreables
      },
      enviar(){
        /* HACER LLAMADA A POST */
        // GET FECHA ACTUAL EN GLOBAL MIXIN
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
          console.log(response.status)
          this.response=response
          setTimeout(() => {
            if (response.status <400) {
              location.reload()              
            }else{
              this.response=''
            }
          }, 6000);
        })
        .catch(error =>{
          this.response=error
          setTimeout(() => {
              this.response=''
          }, 6000);
        })


      },
      agregarCampoSegunEntidad(entidad){
        // COMPLETAR CAMPOS TIPO ARRAY PARA CADA ENTIDAD
        switch (entidad) {
          case 'vehiculos':
            this.formData.chofer=''
            break;
          case 'viajes':
            this.formData.cliente=''
            this.formData.vehiculo=''
            this.formData.estado='PENDIENTE'
            break;
        }
      },
      dateDisabled(ymd, date) {
        console.log(date,' date')
        if(this.entidad == 'choferes'){
          return null
        } else {
          // const weekday = date.getDay()
          // return weekday === 0 || weekday === 6  
          return null
        }
      },
      
    },
    computed: {

    },
}


</script>

<style>
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
  background-color: #007BFF;
}
</style>
