<template>
  <div id="app">
    <v-map>

    </v-map>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
import { InfoControl, ReferenceChart, ChoroplethLayer } from 'vue-choropleth';
import Vue2Leaflet from 'vue2-leaflet';

export default {
  name: 'app',
  components: {
    'v-map': Vue2Leaflet.map,
    'v-info-control': InfoControl,
    'v-reference-chart': ReferenceChart,
    'v-choropleth-layer': ChoroplethLayer,
  },
  mounted() {

  },
};
</script>
<style>
@import '~leaflet/dist/leaflet.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
