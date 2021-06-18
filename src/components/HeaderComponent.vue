<template>
  <b-container fluid class="headerComponent">
    <b-row>
        <b-col cols="4" sm="3" md="3" lg="3">
            <router-link to="/">
              <b-img :src="require('@/assets/logo.png')" fluid rounded thumbnail class="m-1 d-block" style="max-width: 250px;" alt="Logo" id="logo"></b-img>
            </router-link>
        </b-col>
        <b-col cols="7" sm="8" md="9" lg="9">
          <b-row>
            <b-col cols="9" sm="7" md="9" lg="10"><h2 id="tituloheader"><b>Transportes Raffi</b></h2></b-col>
            <b-col cols="3" sm="5" md="3" lg="2">
              <b-row> 
                <b-col sm="6" lg="5" class="p-1 pt-2">
                  <router-link to="/login">
                    <b-button size="sm" variant="primary">
                      Login
                    </b-button>
                  </router-link>
                </b-col>    
                <b-col sm="6" lg="7" class="px-2 pt-2">
                  <router-link to="/">
                    <b-button size="sm" variant="primary">
                        Register
                    </b-button>
                  </router-link>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'headerComponent',
  props: {
  },
}
</script>

<style scoped>
.headerComponent {
  background-color:rgb(64, 64, 64);
  height: 120px;
  text-align: center;
  margin-bottom:10px;
  font-family: 'Lucida Sans';
  border-bottom: 15px double rgb(163, 163, 163);
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
