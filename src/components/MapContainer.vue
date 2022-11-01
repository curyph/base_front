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
import XYZSource from 'ol/source/XYZ';
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import WKT from "ol/format/WKT"
import { Fill, Stroke, Style } from "ol/style";
import upload_farms from "../resources/upload_farms";

export default {
  data() {
    return {
      addedLayer: false,
      map: null,
      basemap: null,
      satelliteLayer: null
    }
  },

  methods: {    
    add_farm_wkt(geometry){
      const wkt = geometry
      const format = new WKT()
      const feature = format.readFeature(wkt, {
        dataProjection: 'EPSG:3857',
        featureProjection: 'EPSG:3857'
      });
      const source = new VectorSource({
          features: [feature]
        })
      const vector = new VectorLayer({        
        source: source,   
        opacity: 0.7,            
        style: new Style({
          // fill: new Fill({
          //   color: 'white'
          // }),  
          stroke: new Stroke({
            color: 'white',
            width: 3
          }),          
        })
      })
      
      this.map.addLayer(vector)

      const source_feature = source.getFeatures()[0];
      const polygon = source_feature.getGeometry();      
  
      this.view.fit(polygon, {padding: [0, 0, 0, 0]});

      //var layerExtent = vector.getSource().getExtent();
      //this.map.getView().fit(layerExtent);
      
    },
    
    add_farm_reserve(geometry) {
      const wkt = geometry
      const format = new WKT()
      const feature = format.readFeature(wkt, {
        dataProjection: 'EPSG:3857',
        featureProjection: 'EPSG:3857'
      });
      const source = new VectorSource({
          features: [feature]
        })
      const reserves_vector = new VectorLayer({        
        source: source,         
        opacity: 0.7,
        style: new Style({
          fill: new Fill({
            color: 'green'
          }),
          stroke: new Stroke({
            color: 'green',
            width: 1
          }),          
        })
      })
      this.map.addLayer(reserves_vector)
    }
  },

  mounted() {
    upload_farms.get().then((result) => {
      this.res = result;
    });

    this.satelliteLayer = new TileLayer({
      source: new XYZSource({
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      }),
      minResolution: 1,
      maxZoom: 20
    });

    this.view = new View({
        center: [0, 0],
        zoom: 2,
      })

    this.basemap = new TileLayer({
      source: new XYZ({
        url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      }),
    }),

    this.map = new Map({
      target: "map",
      layers: [this.satelliteLayer],
      view: this.view
    });
    
    const emitter = inject("emitter");

    emitter.on("load_areas", (area) => {          
      this.map.getLayers().forEach(layer => {
        if (layer != this.satelliteLayer) {
          //layer.setVisible(false)
          console.log(layer)
          this.map.removeLayer(layer)
          //console.log('TESTE')
        }        
      })
      this.add_farm_wkt(area.geometry)
      this.addedLayer = false
    });
    
    emitter.on("load_reserves", (reserve) => {
      if (!this.addedLayer) {
        for (var area in reserve) {        
          this.add_farm_reserve(reserve[area].geometry);        
        }
      }
      this.addedLayer = true
    })
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
  bottom: 20px;
  left: 570px;
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