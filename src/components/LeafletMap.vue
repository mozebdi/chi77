<template>
    <div id="map"></div>
</template>

<script>
import L from "../leafletWrapper";

export default {
  name: "leafletMap",
  data() {
    return {
      mapObject: {},
      markerLayer: {},
      loadCensusTracts: null,
      neighborhoods: null,
      precincts: null,
      wards: null,
      zipcodes: null
    };
  },
  mounted() {
    this.mapObject = L.map("map", {
      center: [41.81, -87.6298],
      zoom: 11
    });
    const baseMaps = {};
    const overlayMaps = {};

    // initialize up the L.control.layers
    L.control.layers(baseMaps, overlayMaps).addTo(this.mapObject);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      this.mapObject
    );
  }
};
</script>

<style scoped>
#map {
  height: 100%;
  width: 100%;
  position: absolute;
}
</style>
