<template>
  <div class="login">
    <PantallaEntrada :isLogin="true"/>
  </div>
</template>

<script>
// @ is an alias to /src
import PantallaEntrada from '@/components/PantallaEntrada.vue'

export default {
  name: 'loginComponent',
  components: {
    PantallaEntrada
  }
}
</script>
