<template>
  <div>
    <leaflet-map id="map">

    </leaflet-map>
  </div>
</template>
<script>
import LeafletMap from "./components/LeafletMap.vue";

export default {
  name: "app",
  components: {
    LeafletMap
  },
  mounted() {}
};
</script>
<style>
@import "~leaflet/dist/leaflet.css";
#map {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 500px;
  width: 500px;
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
