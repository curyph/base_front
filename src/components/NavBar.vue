<template>
  <div class="navbar-test">        
        <div class="logo">
            Logo
        </div>  
        <div class="middle">
            <div class="flex-selectors">
                <div class="navbar-options">
                    <select v-model="state_id" class="main-selectors" @click="load_cities">
                        <option v-for="state in states" :value="state.state_id" :key="state">
                            {{ state.state }}
                        </option>
                    </select>
                    <select v-model="city_id" class="main-selectors">
                        <option v-for="city in cities" :value="city.city_id" :key="city">
                            {{ city.city }}
                        </option>
                    </select>
                </div> 
                <div class="submenu">
                    <select class="sub-selectors">
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                    <select class="sub-selectors">
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                    <select class="sub-selectors">
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                    <select class="sub-selectors">
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </div>  
                
            </div>   
            <div class="search">
                <button @click="sidebarToggle">
                    <router-link :to="{name: 'farm-results', params: {state: state_id, city: city_id} }" aria-current="page" title="Resultados">
                        <div>Search</div>
                    </router-link>
                </button>
                <!-- <button @click="sidebarToggle" >Search</button> -->
                <!-- <Sidebar  v-if="load_sidebar" /> -->
            </div> 
        </div>
                   
        
        <div class="new-menu">
            <!-- <router-link :to="{name: 'farm-results', params: {farms: farm_area} }" aria-current="page" title="Detalhes">
                <button @click="logcity">1</button>
             </router-link> -->
            <button>1</button>
            <button>1</button>
            <button>1</button>
            <button>1</button>
        </div>  
    </div>
    
    
</template>

<script>

import states_cities from "../resources/states_cities"
import Sidebar from "./Sidebar.vue"

export default {
    components: {
        Sidebar
    },
    data() {
        return {
            states: [],
            state_id: null,
            cities: [],
            city_id: null,
            farm_area: null,
            load_sidebar: false
        }
    }, 
    methods: {
        load_cities() {
            states_cities.getCities(this.state_id).then(
                result => {
                    this.cities = result.data
                    
                }
            )   
        },    
        sidebarToggle() {
            this.load_sidebar = true

        }   
    },
    mounted() {
        states_cities.getStates().then(
            result => {
                this.states = result.data                                
            }
        )
    }
    
}
</script>

<style>   
    .navbar-test {
        position: fixed;        
        top: 0;
        right: 0;
        left: 0;
        height: 75px;   
        background-color: #f5f7fb;     
        display: flex;
        flex-direction: row;        
        align-items: center;        
        padding: 5px;
        box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3);  
        z-index: 3000;      
    }       
    
    .logo {                
        margin-right: 40px;        
        flex:1;
        text-align: left;
    }    
    .main-selectors {
        width: 310px;
        height: 25px;
        color: gray;
        background-color: white;
        margin-right: 10px;
        border: 1px;
        border-radius: 5px;
    }
    .sub-selectors {
        width: 150px;
        height: 25px;
        margin-right: 10px;
        color: gray;
        border: 1px;
        border-radius: 5px;
    }
    
    .navbar-options, .submenu {
        display: flex;
        flex-direction: row;        
        margin-bottom: 5px;        
        color: gray;
        border: 1px;
    }

    .middle {
        display: flex;
        flex: 3;
    }    
</style>