<template>
    <div id="home">
        <h1>Página Inicial</h1>
        <div class="menus">
            <router-link :to="{name:'map-searcher'}"> Maps</router-link>
        </div>
        <div class="input-files">
            <div class="mb-3">
                <label for="formFile" class="form-label">Importar Shapefile</label>
                <input class="form-control" ref="file" type="file" name="file" id="formFile">                                
            </div>
            <div class="state-select">
                <select v-model="state_id" @click="load_cities">
                    <option v-for="state in states" :value="state.state_id" :key="state" ref="state_id">
                        {{ state.state }}
                    </option>
                </select>
            </div>
            <div class="city-select">
                <select v-model="city_id">
                    <option v-for="city in cities" :value="city.city_id" :key="city" ref="city_id">
                        {{ city.city }}
                    </option>
                </select>
            </div>
            
            <div>
                <button type="button" class="btn btn-primary" @click="submitFiles">Enviar</button>
            <button type="button" class="btn btn-primary" @click="mymethod">Atualizar Mapa</button>
            </div>
            
        </div>     
    </div>    
</template>

<script>

import { ref, inject, reactive} from "vue"
import upload_farms from "../resources/upload_farms"
import load_farms from "../resources/load_farms"
import load_intersections from "../resources/load_intersections"
import states_cities from "../resources/states_cities"
import { none } from 'ol/centerconstraint'

export default {
    data() {
        return {
            states: [],
            state_id: none,
            cities: [],
            city_id: none
        }
    }, 
    methods: {
        mymethod() {        
            load_farms.get(4).then(
                result => {
                    this.farm_geometry2 = result.data  
                    this.emitter.emit('load_areas', this.farm_geometry2);            
                }
            ) 
        },
        load_cities() {
            states_cities.getCities(this.state_id).then(
                result => {
                    this.cities = result.data
                }
            )   
        },
        loadIntersections(){
            load_intersections.get().then(
                result => {
                    this.farm_intersection = result.data                    
                    this.emitter.emit('load_reserve', this.farm_intersection)
                }
            )
        }
    },

    setup() {
        const file = ref(null)
        const state_id = ref(null)
        const city_id = ref(null)
        const data = reactive({
                state_id: '',
                city_id: '',
                file: ''
            })
        const submitFiles = async() => {
            // debugger;            
            data.state_id = state_id.value
            data.city_id = city_id.value     
            data.file = file.value.files             
            upload_farms.post(file.value.files, data.state_id, data.city_id)
        }
        
        return {
            submitFiles,
            file,  
            state_id,
            city_id,          
            data
        } 
    },
    
    mounted() {
        this.emitter = inject('emitter')
         states_cities.getStates().then(
            result => {
                this.states = result.data                                
            }
        )
        
    }
}
</script>

<style>

</style>