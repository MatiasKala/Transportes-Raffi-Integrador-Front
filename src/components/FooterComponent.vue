<template>
  <b-container fluid class="footerComponent">
    <b-row>
      <b-col cols="12">
        <b-card header="Gracias por confiar en nosotros" header-border-variant="dark" header-bg-variant="secondary" header-text-variant="light" text-variant="info" no-body class="overflow-hidden m-3"  style="max-width: 15000px;">
          <b-row no-gutters>
            <b-col md="6">
              <b-img :src="require('@/assets/safeDelivery.png')" alt="SafeDelivery" style="max-width: 400px;"></b-img>
              <b-card-body  title="Mas sobre nuestro trabajo">
                <b-card-text >
                  Para conocer en detalle nuestro proyecto hace 
                  <b-link href="https://github.com/MatiasKala/Transportes-Raffi-Integrador-Front">click aca</b-link>
                </b-card-text>
              </b-card-body>
            </b-col>
            <b-col md="6">
              <b-card-body  title="Seguimiento">
                <b-card-text >
                  Ahora vas a poder monitorear pedido en <b>tiempo real</b>
                </b-card-text>
              </b-card-body>
              <b-img :src="require('@/assets/envio.jpg')" rounded="circle" style="max-width: 180px;" class="mt-3 m-2" alt="Envio"></b-img>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <hr>
    <b-row>
      <b-col id="seccion" sm="6">
        <b-row>
            <b-col cols="12">
                <h2 id="titulofooter"><b>Contactanos</b></h2>
            </b-col>
            <br />
            <b-col cols="12">
                <ul id="lista">
                    <li id="item">Wpp: 11-1111-1111    &nbsp;&nbsp;&nbsp;&nbsp;
                      <b-iconstack>
                        <b-icon stacked icon="chat-dots" style="color: 	white;"></b-icon>
                        <b-icon stacked icon="chat-dots-fill" style="color:  #4dc247;"></b-icon>
                      </b-iconstack>
                    </li>
                    <li id="item">Mail: tRaffi@ort.com &nbsp;&nbsp;   
                    <b-iconstack>
                      <b-icon stacked icon="envelope-open" scale="1.15" style="color:white;"></b-icon>
                      <b-icon stacked icon="envelope-open" style="color:  #ff2e00;"></b-icon>
                      <b-icon stacked icon="envelope-open-fill" style="color: #ff8282;"></b-icon>
                    </b-iconstack>
                    </li>
                    <li id="item">Tel: 0800-0000-0000 &nbsp;&nbsp;
                      <b-icon icon="phone-fill" style="color: white"></b-icon>
                    </li>
                </ul>
            </b-col>
        </b-row>
      </b-col>
      <b-col id="seccion2" sm="6">
        <b-row>
          <b-col cols="12">
            <h2 id="titulofooter"><b>Seguinos</b></h2>
          </b-col>
          <b-col cols="12" sm="6">
            <div>
              <ul id="lista">
                <li>
                    <a href="#"><b-icon icon="twitter" style="color: #009eff;"></b-icon></a> &nbsp;&nbsp;Twitter
                </li>
                <li>
                    <a href="#"><b-icon icon="facebook" style="color:	#3b5998"></b-icon></a> &nbsp;&nbsp;Facebook
                </li>
              </ul>
            </div>
          </b-col>
          <b-col cols="12" sm="6">
            <div>
              <ul id="lista">
                <li>
                    <a href="https://github.com/MatiasKala/Transportes-Raffi-Integrador-Front"><b-icon icon="github" style="color:	white"></b-icon></a> &nbsp;&nbsp;GitHub
                </li>
                <li>
                    <a href="#"><b-icon icon="instagram" style="color:#ec0075	"></b-icon></a> &nbsp;&nbsp;Instagram
                </li>
              </ul>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>


export default {
  name: 'footerComponent',
  props: {
  }
}
</script>

<style scoped>
.footerComponent {
    color: whitesmoke;
    background-color:rgb(64, 64, 64);
    margin-top: 50px;
    width: 100%;
    height: 100%;
    text-align: center;
    border-top: 10px double rgb(100, 100, 100);
}

#titulofooter {
    color:white;
    margin-top: 4%;
    font-family: 'Trebuchet MS';
    font-size: 30px;
    text-shadow: 1px 1px silver;
    text-align: center;
}

#titulofooter:after {    
    background: none repeat scroll 0 0 transparent;
    bottom: 0;
    content: "";
    display: block;
    height: 2px;
    left: 50%;
    position: absolute;
    background:lightgrey;
    transition: width 1s ease 0s, left 1s ease 0s;
    width: 0;
  }

#titulofooter:hover:after { 
    width: 95%; 
    left: 0; 
}

#seccion {
    align-items: center;
}

#seccion2 {
    align-items: center;
    padding-left:0;
}

#lista {
    margin-top: 5%;
    padding-left: 0px;
    color: silver;
    font-size: 15px;
    text-align: center;
    list-style-type:none;
}
 
#item {
    padding-bottom: 10px;
}

#redes {
    color: white;
    font-size: 20px;
    padding-bottom: 10px;
}

#redes:hover {
    color: silver;
}

hr{
  background-color: rgb(139, 139, 139);
}
</style>
