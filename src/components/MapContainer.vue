<template>
  <h2>My Map</h2>
  <div id="map" class="map"></div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import first_res from "../resources/first_res"

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
    first_res.get().then(
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
  height: 800px;
  width: 100%;
}
</style>