<template>
    <div class="sidebar-menu">
        <h2>Teste Sidedbar</h2>  
        <div class="input-files">
            <div class="mb-3">
                <label for="formFile" class="form-label">Importar Shapefile</label>
                <input class="form-control" ref="file" type="file" name="file" id="formFile">
            </div>
            <button type="button" class="btn btn-primary" @click="submitFiles">Enviar</button>
        </div>        
    </div>
    
</template>

<script>

import { ref } from "vue"
import upload_farms from "../resources/upload_farms"

export default {
    data() {
        
    },
    // methods: {
    //     submitFiles() {
    //         console.log("files")
    //     }
    // },
    
    setup() {
        const file = ref(null)
        const submitFiles = async() => {
            // debugger;
            console.log("selected file",file.value.files)
            upload_farms.post(file.value.files)
        }
        return {
            submitFiles,
            file
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