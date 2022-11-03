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
import LayerGroup from "ol/layer/Group";
import VectorSource from "ol/source/Vector";
import WKT from "ol/format/WKT"
import { Fill, Stroke, Style } from "ol/style";
import upload_farms from "../resources/upload_farms";

export default {
  data() {
    return {
      addedFarmLayer: false,
      addedFarmReserve: false,
      map: null,
      basemap: null,
      satelliteLayer: null,
      vector: null,
      reserves_vector: null
    }
  },

  methods: {    
    add_farm_wkt(vector_layer, geometry){     
      vector_layer.getSource().clear()
      const wkt = geometry
      const format = new WKT()
      const feature = format.readFeature(wkt, {
        dataProjection: 'EPSG:3857',
        featureProjection: 'EPSG:3857'
      });      
      vector_layer.getSource().addFeature(feature)
      if (!this.addedFarmLayer) {
        this.map.addLayer(this.OverlaysGroup)    
        this.OverlaysGroup.getLayers().array_.push(vector_layer)    
        this.addedFarmLayer = true
      }   
      const source_feature = vector_layer.getSource().getFeatures()[0];
      const polygon = source_feature.getGeometry();      
      this.view.fit(polygon, {padding: [0, 0, 0, 0]});     
    },
    
    add_farm_reserve(reserves_vector, geometries) {
      reserves_vector.getSource().clear()
      const features = []
      const format = new WKT()

      for (var geometry in geometries) {        
        features.push(
          format.readFeature(geometries[geometry], {
            dataProjection: 'EPSG:3857',
            featureProjection: 'EPSG:3857'
          }),
        )
      }
      if(!this.addedFarmReserve) {
        reserves_vector.getSource().addFeatures(features)
        this.map.addLayer(this.reserves_vector)        
        this.addedFarmReserve = !this.addedFarmReserve
      } else {
        this.map.removeLayer(reserves_vector)
        this.addedFarmReserve = !this.addedFarmReserve
      }
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

    this.BaseLayerGroup = new LayerGroup({
      layers: [this.satelliteLayer]
    })

    this.OverlaysGroup = new LayerGroup({
      layers: []
    })

    this.vector = new VectorLayer({        
      source: new VectorSource(),
      opacity: 0.7,            
      style: new Style({
        fill: new Fill({
          color: 'white'
        }),  
        stroke: new Stroke({
          color: 'white',
          width: 3
        }),          
      })
    })

    this.reserves_vector = new VectorLayer({
      source: new VectorSource(),
      opacity: 0.5,            
      style: new Style({
        fill: new Fill({
          color: 'green'
        }),  
        stroke: new Stroke({
          color: 'green',
          width: 3
        }),          
      })
    })

    this.map = new Map({
      target: "map",
      //layers: [this.satelliteLayer],
      view: this.view
    });

    this.map.addLayer(this.basemap)
    
    const emitter = inject("emitter");

    emitter.on("load_areas", (area) => {        
      this.add_farm_wkt(this.vector, area.geometry)
    });
    
    emitter.on("load_reserves", (reserve) => {
      
        var reserves_geometry = [];
        for (var area in reserve) {       
          reserves_geometry.push(reserve[area].geometry)           
        }
        this.add_farm_reserve(this.reserves_vector, reserves_geometry);
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