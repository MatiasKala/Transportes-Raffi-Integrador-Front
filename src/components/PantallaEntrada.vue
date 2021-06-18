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
        <b-card title="Ingresa">
          <hr>
          <vue-form :state="formState" @submit.prevent="enviar()">
            <!-- EMAIL -->
            <validate tag="div">
              <label for="email">Email</label>
              <input 
                type="email" 
                name="email" 
                id="email"
                class="form-control"
                autocomplete="off"
                v-model.trim="formData.email"
                required
                no-espacios
              >
              <field-messages name="email" show="$dirty">
                <div slot="required" class="alert alert-danger mt-2">Campo requerido</div>            
                <div slot="email" class="alert alert-danger mt-2">Email no válido</div>            
                <div slot="no-espacios" class="alert alert-danger mt-2">No se permiten espacios en este campo</div>            
              </field-messages>
            </validate>
            <br>
            <!-- CONTRASEÑA -->
            <validate tag="div">
              <label for="password">Contraseña</label>
              <input 
                type="password" 
                name="password" 
                id="password"
                class="form-control"
                autocomplete="off"
                v-model.trim="formData.password"
                :minlength="minContrasenia"
                required
                no-espacios
              >
              <field-messages name="password" show="$dirty">
                <div slot="required" class="alert alert-danger mt-2">Campo requerido</div>            
                <div slot="no-espacios" class="alert alert-danger mt-2">No se permiten espacios en este campo</div>            
                <div slot="minlength" class="alert alert-danger mt-2">Ingrese como minimo {{minContrasenia}} caracteres</div>            
              </field-messages>
            </validate>

            <br>
            <br>
            <hr>

            <!-- ENVIO FORMULARIO -->
            <div v-if="!formState.$dirty" class="alert alert-secondary">Completa todos los campos</div>
            <div v-else-if="formState.$dirty && formState.$invalid " class="alert alert-warning">Completa todos los campos</div>
            <button class="example_a" align="center" v-else @click="enviar()">Enviar</button>
            
          </vue-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'pantallaEntrada',
  props: [],
  data(){
    return{
      formData:this.estadoInicial(),
      formState:{},
      minContrasenia:5,
    }
  },
  filters:{

  },
  methods:{
    estadoInicial(){
      return{
        email:'',
        password:''
      }
    },
    enviar(){
      console.log(this.formData);
    },
  },
}
</script>

<style scoped>
.estiloCarousel{
  max-height:364px
}
.example_a {
	color: #fff !important;
	text-transform: uppercase;
	text-decoration: none;
	background: #35c535;
	padding: 50px;
  padding-top: 10px;
  padding-bottom: 10px;
	border-radius: 5px;
	display: inline-block;
	border: none;
	transition: all 0.4s ease 0s;
}
.example_a:hover {
	background: #008300;
	letter-spacing: 5px;
	-webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
	-moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
	box-shadow: 5px 40px -10px rgba(0,0,0,0.57);
	transition: all 0.4s ease 0s;
}
</style>
