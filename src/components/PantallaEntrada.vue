<template>
  <b-container class="pantallaEntrada">
    <b-row>
      <b-col cols="8">
        <b-card border-variant="info" header="Transportes Raffi" header-bg-variant="info" header-text-variant="white" title="Ingresá y obtené toda la información sobre tu pedido">      
          <hr style="background-color:silver;">
          <b-carousel
            id="carousel-1"
            :interval="5000"
            controls
            indicators
            background="#ababab"
            img-width="1024"
            img-height="480"
            style="text-shadow: 1px 1px 2px #333;"
          >
            <b-carousel-slide
              caption="A cualquier rincón del pais"
              text="Región Norte de Salta"
            >
              <template #img>
                <b-img
                  :src="require('@/assets/desierto.webp')"
                  class="d-block img-fluid w-100 estiloCarousel"
                  alt="Desierto de Salta"
                >
                </b-img> 
              </template>
            </b-carousel-slide>

            <b-carousel-slide
              text="Gracias por confiar en nosotros"
            >
              <template #img> 
                <b-img
                  :src="require('@/assets/scania.jpg')"
                  class="d-block img-fluid w-100 estiloCarousel"
                  alt="Scania">
                </b-img>
              </template> 
            </b-carousel-slide>

            <b-carousel-slide               
              text="Seguí tu pedido dondequiera que estés"
              
            >
              <template #img>
                <b-img
                  :src="require('@/assets/seguimiento.jpg')"
                  class="d-block img-fluid w-100 estiloCarousel"
                  alt="Seguimiento"
                >
                </b-img> 
              </template>
            </b-carousel-slide>

            <b-carousel-slide               
              caption="A cualquier rincón del pais"
              text="Santa Cruz"
            >
              <template #img>
                <b-img
                  :src="require('@/assets/rutaSantaCruz.jpg')"
                  class="d-block img-fluid w-100 estiloCarousel"
                  alt="Ruta 40, Santa Cruz"
                >
                </b-img> 
              </template>
            </b-carousel-slide>
          </b-carousel>
        </b-card>
      </b-col>

      <!-- COMIENZO DEL FORMULARIO -->
      
      <b-col cols="4">
        <b-card :title="obtenerTituloFormulario()">
          <hr>
              <vue-form :state="formState" @submit.prevent="enviar()">
                <!-- USERNAME -->
                <validate v-if="!isLogin" tag="div">
                  <label for="username"
                    v-if="formState.username" :style="labelColor(formState.username.$valid,formState.$dirty,formData.username)">Nombre de Usuario
                  </label>
                  <input 
                    type="text" 
                    name="username" 
                    id="username"
                    class="form-control"
                    autocomplete="off"
                    v-model.trim="formData.username"
                    required
                    :minlength="minimoPermitido"
                    :maxlength="maximoPermitido"
                  >
                  <field-messages name="username" show="$dirty">
                    <div slot="required" class="alert alert-danger mt-2">Campo requerido</div>            
                    <div slot="username" class="alert alert-danger mt-2">Nombre de usuario no válido</div>            
                    <div slot="minlength" class="alert alert-danger mt-2">Ingrese como minimo {{minimoPermitido}} caracteres</div>            
                    <div v-if="formData.username.length == maximoPermitido" class="alert alert-danger mt-2">El maximo permitido es de {{maximoPermitido}} caracteres</div>            
                  </field-messages>
                </validate>
                <br>
                <!-- EMAIL -->
                <validate tag="div">
                  <label for="email"
                    v-if="formState.email" :style="labelColor(formState.email.$valid,formState.$dirty,formData.email)">Email
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    id="email"
                    class="form-control"
                    autocomplete="off"
                    v-model.trim="formData.email"
                    required
                  >
                  <field-messages name="email" show="$dirty">
                    <div slot="required" class="alert alert-danger mt-2">Campo requerido</div>            
                    <div slot="email" class="alert alert-danger mt-2">Email no válido</div>            
                    <div slot="no-espacios" class="alert alert-danger mt-2">No se permiten espacios en este campo</div>         
                    <div slot="minlength" class="alert alert-danger mt-2">Ingrese como minimo {{minimoPermitido}} caracteres</div>            
                  </field-messages>
                </validate>
                <br>
                <b-row>
                  <b-col cols="10"> 
                    <!-- CONTRASEÑA -->
                    <validate tag="div">
                      <label for="password"
                        v-if="formState.password" :style="labelColor(formState.password.$valid,formState.$dirty,formData.password)">Password
                      </label>
                      <input 
                        size="1"
                        :type="getType" 
                        name="password" 
                        id="password"
                        class="form-control"
                        autocomplete="off"
                        v-model.trim="formData.password"
                        :minlength="minimoPermitido"
                        :maxlength="maximoPermitido"
                        required
                        no-caracteres
                        no-espacios
                      >
                      <field-messages name="password" show="$dirty">
                        <div slot="required" class="alert alert-danger mt-2">Campo requerido</div>            
                        <div slot="no-espacios" class="alert alert-danger mt-2">No se permiten espacios en este campo</div>            
                        <div slot="no-caracteres" class="alert alert-danger mt-2">Los caracteres {{getCaracteresInvalidos}} no se permiten en este campo</div>            
                        <div slot="minlength" class="alert alert-danger mt-2">Ingrese como minimo {{minimoPermitido}} caracteres</div>            
                        <div v-if="formData.password.length == maximoPermitido" class="alert alert-danger mt-2">El maximo permitido es de {{maximoPermitido}} caracteres</div>            
                      </field-messages>
                    </validate>
                  </b-col>
                  <b-col cols="2" style="padding-left:2px">
                    <b-button class="botonVisibilidad" :variant="obtenerClaseBotonVisibilidad" @click="cambiarVisibilidad()">
                      <b-icon-eye-slash v-if="!esVisibleContrasenia"></b-icon-eye-slash>
                      <b-icon-eye v-if="esVisibleContrasenia"></b-icon-eye>
                    </b-button></b-col>
                </b-row>
                <br>
                <hr>

                <!-- ENVIO FORMULARIO -->
                <b-container>
                  <b-row align-h="center">                 
                    <b-col cols="12"> 
                      <button class="btn-secondary btn-disabled" disabled v-if="formState.$invalid && !estaCargando" @click="enviar()">Enviar</button>
                      <button class="botonEnvio" v-else-if="formState.$valid && !estaCargando" @click="enviar()">Enviar</button>
                      <b-skeleton type="input" width="100%" class=" btn-disabled" v-if="estaCargando"></b-skeleton>
                    </b-col>
                  </b-row>
                </b-container>

              </vue-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'pantallaEntrada',
  props: ['isLogin'],
  data(){
    return{
      formData:this.isLogin? this.estadoInicialLogin(): this.estadoInicialRegister(),
      formState:{},
      minimoPermitido:5,
      maximoPermitido:30,
      esVisibleContrasenia:false,
      estaCargando:false
    }
  },
  filters:{

  },
  methods:{
    estadoInicialLogin(){
      return{
        email:'',
        password:'',
      }
    },
    estadoInicialRegister(){
      return{
        username:'',
        email:'',
        password:'',
      }
    },
    enviar(){
      this.estaCargando = true
      this.$emit('envioFormulario',this.formData)  
      this.formData=this.isLogin? this.estadoInicialLogin(): this.estadoInicialRegister()
      this.formState._reset()
    },
    labelColor:(valid,dirty,value)=>{
      return {
          color:value? dirty? valid?'#22BB33':'red' :'black':'black',
      }
    },
    cambiarVisibilidad(){
      this.esVisibleContrasenia=!this.esVisibleContrasenia
    },
    obtenerTituloFormulario(){
      return this.isLogin ? 'Ingresá' :  'Registrate'
    }
  },
  computed:{
    getType(){
      return this.esVisibleContrasenia ? 'text':'password'
    },
    obtenerClaseBotonVisibilidad(){
      return this.esVisibleContrasenia ? 'info' : 'dark'
    }
  }
}
</script>

<style scoped>
.estiloCarousel{
  max-height:364px
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
	transition: all 0.4s ease 0s;
}
.botonEnvio {
	color: #fff !important;
	text-transform: uppercase;
	text-decoration: none;
	background: #35c535;
	padding: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
	border-radius: 5px;
	display: inline-block;
	border: none;
	transition: all 0.4s ease 0s;
}
.botonEnvio:hover {
	background: #008300;
	letter-spacing: 1.5px;
	-webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
	-moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
	box-shadow: 5px 40px -10px rgba(0,0,0,0.57);
	transition: all 0.4s ease 0s;
}
.botonVisibilidad{
  margin-top:32px; 
  padding-right: 10px;
}
</style>
