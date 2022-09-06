<template>
    <div class="sidebar-menu">
        <h2>Teste Sidedbar</h2>  
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
import load_farms from "../resources/load_farms"

export default {
    data() {
        return {
            farm_geometry2: {}
        }        
    },
    
    methods: {
        
        mymethod() {        
            load_farms.get(1).then(
                result => {
                    this.farm_geometry2 = result.data  
                    this.emitter.emit('load_areas', this.farm_geometry2);            
                }
            ) 
        }
    },
    mounted() {
        this.emitter = inject('emitter')
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
        
        
    }
}
</script>

<style>
    .sidebar-menu {
        height: 100%;
        width: 25%;
        position: fixed;
        background: white;
    }
    .input-files {
        padding: 10px;
    }
</style>