<template>
  <div class="container p-5">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Navegacion</b-navbar-brand>

      <b-navbar-toggle target="navbar-toggle-collapse">
        <template #default="{ expanded }">
          <b-icon v-if="expanded" animation="spin" icon="list-nested"></b-icon>
          <b-icon v-else  animation="fade" icon="list"></b-icon>
        </template>
      </b-navbar-toggle>

      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav class="mr-auto ml-auto">
          <b-nav-item href="#">
              <router-link to="/test/usuarios">
                <a class="nav-link" href="#">TestView</a>
              </router-link>
          </b-nav-item>
          <b-nav-item href="#">
              <router-link to="/">
                <a class="nav-link" href="#">Test1</a>
              </router-link>
          </b-nav-item>
          <b-nav-item href="#">
              <router-link to="/">
                <a class="nav-link" href="#">Test2</a>
              </router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  props: {
  }
}
</script>

<style scoped>

</style>
