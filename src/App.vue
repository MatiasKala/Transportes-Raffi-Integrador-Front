<template>
  <div id="app">
    <Header/>
    <Navbar/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>

import Header from './components/HeaderComponent.vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/FooterComponent.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Header,
    Footer,
  },
  data() {
    return {
      
    }
  },
  methods : {

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
