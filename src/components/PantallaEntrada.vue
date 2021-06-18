<template>
  <b-container class="pantallaEntrada">
    <b-row>
      <b-col cols="7">
        <h1>Login</h1>
      </b-col>
      <b-col cols="5">
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

</style>
