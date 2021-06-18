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
            <!-- Text slides with image -->
            <b-carousel-slide
              caption="Envíos a cualquier extremo del país"
              text="Región Noroeste de Salta"
            >
              <template #img>
                <b-img
                  :src="require('@/assets/desierto.webp')"
                  class="d-block img-fluid w-100"
                  style="max-height:400px"
                  alt="Desierto de Salta"
                >
                </b-img> 
              </template>
            </b-carousel-slide>

            <!-- Slides with image only -->
            <b-carousel-slide
              text="Gracias por confiar en nosotros"
            >
              <template #img> 
                <b-img
                  :src="require('@/assets/scania.jpg')"
                  class="d-block img-fluid w-100"
                  style="max-height:384px"
                  alt="Scania">
                </b-img>
              </template> 
            </b-carousel-slide>

            <!-- Slides with img slot -->
            <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
            <b-carousel-slide               
              text="Seguí tu pedido dondequiera que estés"
              
            >
              <template #img>
                <b-img
                  :src="require('@/assets/seguimiento.jpg')"
                  class="d-block img-fluid w-100"
                  style="max-height:384px"
                  alt="Seguimiento"
                >
                </b-img> 
              </template>
            </b-carousel-slide>

            <b-carousel-slide               
              caption="Envíos a cualquier extremo del país"
              text="Santa Cruz"
            >
              <template #img>
                <b-img
                  :src="require('@/assets/rutaSantaCruz.jpg')"
                  class="d-block img-fluid w-100"
                  style="max-height:384px"
                  alt="Ruta 40, Santa Cruz"
                >
                </b-img> 
              </template>
            </b-carousel-slide>
          </b-carousel>
        </b-card>
      </b-col>
      <b-col cols="4">
        <b-card title="Ingresa">
          <hr>
          <vue-form :state="formState" @submit.prevent="enviar()">
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
              >
              <field-messages name="email" show="$dirty">
                <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>            
                <div slot="email" class="alert alert-danger mt-1">Email no válido</div>            
              </field-messages>
            </validate>
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
      formState:{}
      
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
    }
  },
}
</script>

<style scoped>
info{
  background-color: red;
}
</style>
