<template>
    <div id="map"></div>
</template>

<script>
import L from '../leafletWrapper';

export default {
  name: 'leafletMap',
  props: ['center', 'zoom', 'minZoom', 'maxZoom', 'markers'],
  data() {
    return {
      mapObject: {
      },
      markerLayer: {

      },
    };
  },
  mounted() {
    this.mapObject = L.map('map', {
      center: this.center,
      zoom: this.zoom,
      minZoom: this.minZoom,
      maxZoom: this.maxZoom,
      markers: this.markers,
    });
    const baseMaps = {
    };
    const overlayMaps = {

    };

    // initialize up the L.control.layers
    L.control.layers(baseMaps, overlayMaps).addTo(this.mapObject);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.mapObject);
  },
};
</script>

<style scoped>

</style>
