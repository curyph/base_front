<template>
  <!-- <h2>My Map</h2> -->
  <div id="map" class="map"></div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import upload_farms from "../resources/upload_farms"

export default {
  methods: {
    initMap() {
      new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new XYZ({
              url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            }),
          }),
        ],
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });
    },
  },

  mounted() {
    upload_farms.get().then(
      result => {
        this.res = result
      }
    )
    this.initMap()
  },
};
</script>

<style>
  .map {
    height: 100%;
    width: 100%;
    position: fixed;
  }
  .ol-zoom {
      top: auto;
      right: auto;
      bottom: 100px;
      left: 500px;
      transition: left 0.4s ease-in-out;
    }

  .ol-center-map {
    position: absolute;
    top: auto;
    right: auto;
    left: 370px;
    padding: 2px;
    bottom: 126px;
    transition: left 0.4s ease-in-out;
    
  }
  
</style>