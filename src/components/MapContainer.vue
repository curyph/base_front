<template>
  <!-- <h2>My Map</h2> -->
  <div id="map" class="map"></div>
</template>

<script>
import { inject } from "vue";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style } from "ol/style";
import upload_farms from "../resources/upload_farms";

export default {
  methods: {
    add_vector() {
      const style = new Style({
        fill: new Fill({
          color: "#eeeeee",
        }),
      });
      const vectorLayer = new VectorLayer({
        background: "#1a2b39",
        source: new VectorSource({
          url: "https://openlayers.org/data/vector/ecoregions.json",
          format: new GeoJSON(),
        }),
        style: function (feature) {
          const color = feature.get("COLOR") || "#eeeeee";
          style.getFill().setColor(color);
          return style;
        },
      });
      this.map.addLayer(vectorLayer);
    },
  },

  mounted() {
    upload_farms.get().then((result) => {
      this.res = result;
    });
    this.map = new Map({
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
    const emitter = inject("emitter");

    emitter.on("load_areas", (value) => {
      console.log("myevent received!", `value: ${value}`);
      this.add_vector();
    });
    // this.emitter.on('generate_vectors'), msg => {
    //   console.log(msg)
    // }
  }
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