<template>
  <div class="headerComponent container-fluid">
    <div class="row">
        <div class="col-5 col-sm-4 col-md-3 col-lg-2">
            <router-link to="/">
              <img src="@/assets/logo.png" class="img-thumbnail mx-auto d-block" alt="Logo" id="logo">
            </router-link>
        </div>
        <div class="col-7 col-sm-8 col-md-9 col-lg-10">
            <h2 id="tituloheader"><b>Transportes Raffi</b></h2>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'headerComponent',
  props: {
  }
}
</script>

<style scoped>
.headerComponent {
  background-color:rgb(64, 64, 64);
  /* background-image: url("../fotos/headerback.jpg"); */
  /*background-size: 50%;
  background-repeat: no-repeat;*/
  width: 100%;
  height: 100px;
  text-align: center;
  margin: 0px 0px 10px 0px;
  font-family: 'Lucida Sans';
  border-bottom: 10px double rgb(100, 100, 100);
}

#tituloheader {
  margin: 2% 10% 3% 0%;
  font-family: 'Trebuchet MS';
  font-size: 30px;
  color: rgb(218, 218, 218);
  text-shadow: 2px 4px 3px black;
  text-align: left;
}

#logo {
  width: 90%;
  margin-top: 5px;
  margin-left: 5px;
  text-align: center;
}
</style>
