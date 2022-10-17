<template>
    <div class="sidebar">
        <router-view></router-view>     
    </div> 
</template>

<script>

import { ref, inject } from "vue"
import load_intersections from "../resources/load_intersections"

export default {
    data() {
        return {
            farm_geometry2: {},
            farm_intersection: {}
        }        
    },
    
    methods: {
        loadIntersections(){
            load_intersections.get().then(
                result => {
                    this.farm_intersection = result.data
                    //console.log(this.farm_intersection)
                    this.emitter.emit('load_reserve', this.farm_intersection)
                }
            )
        }
        
    },
    mounted() {
        this.emitter = inject('emitter')
    },    
}
</script>

<style>
    .sidebar {
        position: fixed;
        top: 76px;
        left: 0;
        width: 550px;
        height: 100%;
        opacity: 0.85;
        background-color: #f5f7fb;
        box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3);
        z-index: 1000;
    }

    

    
</style>