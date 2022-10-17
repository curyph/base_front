<template>
    <div id="home">
        <h1>Página Inicial</h1>
        <div class="menus">
            <router-link :to="{name:'map-searcher'}"> sdf</router-link>
        </div>
        <div class="input-files">
            <div class="mb-3">
                <label for="formFile" class="form-label">Importar Shapefile</label>
                <input class="form-control" ref="file" type="file" name="file" id="formFile">
            </div>
            <button type="button" class="btn btn-primary" @click="submitFiles">Enviar</button>
            <button type="button" class="btn btn-primary" @click="mymethod">Atualizar Mapa</button>
        </div>     
    </div>    
</template>

<script>

import { ref, inject } from "vue"
import upload_farms from "../resources/upload_farms"
import load_farms from "../resources/load_farms"
import load_intersections from "../resources/load_intersections"

export default {
    methods: {
        mymethod() {        
            load_farms.get(16).then(
                result => {
                    this.farm_geometry2 = result.data  
                    this.emitter.emit('load_areas', this.farm_geometry2);            
                }
            ) 
        },
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
    setup() {
        const file = ref(null)
        const submitFiles = async() => {
            // debugger;
            console.log("selected file",file.value.files)
            upload_farms.post(file.value.files)
        }
        
        return {
            submitFiles,
            file,
           
        } 
    },
    mounted() {
        this.emitter = inject('emitter')
    }
}
</script>

<style>

</style>