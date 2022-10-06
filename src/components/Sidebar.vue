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
        <div class="farms-list">
            <div class="farm-container">
                <div class="farm-thumbnail">
                    <img src="../images/farm1.png" class="img-thumbnail" alt="...">
                </div>
                <div class="farm-info">
                    <div class="price">
                        <h3>R$ 50.000.000</h3>
                    </div>
                    <div class="board-info">
                        <div class="container text-center">
                            <div class="row">
                                <div class="col">
                                    Piracicaba
                                </div>
                                <div class="col">
                                    15000
                                </div>                                
                            </div>
                            <div class="row">
                                <div class="col">
                                    Cana
                                </div>
                                <div class="col">
                                    R$ 1500 / ha
                                </div>                                
                            </div>                            
                        </div>
                    </div>                    
                </div>                
            </div>            
        </div>   
    </div>
    
</template>

<script>

import { ref, inject } from "vue"
import upload_farms from "../resources/upload_farms"
import load_farms from "../resources/load_farms"

export default {
    data() {
        return {
            farm_geometry2: {}
        }        
    },
    
    methods: {
        
        mymethod() {        
            load_farms.get(5).then(
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
        overflow: auto;
    }
    .input-files {
        padding: 10px;
    }
    .farm-container {
        padding: 20px;
        display: flex;
        box-shadow: 10px;
        cursor: pointer;
    }
    .farm-thumbnail {
        flex: 40%;
    }
    .farm-info {        
        flex: 60%
        
    }
</style>