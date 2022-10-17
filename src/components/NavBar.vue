<template>
  <div class="navbar">        
        <div class="logo">
            Logo
        </div>  
        <div class="selectors1">
            <div class="navbar-options">
                <select v-model="state_selected">
                    <option v-for="state in br_states" :value="state.state" :key="state">
                        {{ state.state }}
                    </option>
                </select>
                <select v-model="city_selected">
                    <option v-for="city in br_cities" :value="city.city" :key="city">
                        {{ city.city }}
                    </option>
                </select>
            </div> 
            <div class="submenu">
                <select class="selector-sale-type">
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
                <select class="selector-price">
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
                <select class="selector-area">
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
                <select class="selector-x">
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </div> 
        </div>      
        <div class="new-menu">
            <router-link :to="{name: 'farm-results', params: {state: state_selected, city: city_selected} }" aria-current="page" title="Detalhes">
                <button @click="logcity">1</button>
             </router-link>
            <button>1</button>
            <button>1</button>
            <button>1</button>
            <button>1</button>
        </div>  
    </div>
</template>

<script>
import { none } from 'ol/centerconstraint'
export default {

    data() {
        return {
            state_selected: '',
            city_selected: '',
            br_states: [
                { state: 'São Paulo - SP', id: '1' },
                { state: 'Mato Grosso - MT', value: '2' },
                { state: 'Bahia - BA', value: '3' }
            ],
            br_cities: [
                {city: 'Piracicaba', state_id: 1, city_id: 22},
                {city: 'Americana', state_id: 1, city_id: 22},
                {city: 'São Paulo', state_id: 1, city_id: 22},
                {city: 'Ribeirão Preto', state_id: 1, city_id: 22}
            ]
        }
    }, 
    methods: {
        logcity() {
            console.log(this.city_selected, this.state_selected)
        }
    }
    
}
</script>

<style> 

    .navbar {
        position: fixed;        
        top: 0;
        right: 0;
        left: 0;
        height: 75px;   
        background-color: #f5f7fb;     
        display: flex;
        flex-direction: row;
        padding: 5px;
        box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3);
        /* justify-content: space-between; */
    }       
    
    .logo {                
        margin-right: 40px;
    }
    .selector-state {
        width: 250px;
        margin-right: 10px;
        height: 25px;
        color: gray;
        border: 1px;
    }
    .selector-city {
        width: 300px;
        height: 25px;
        color: gray;
        border: 1px;
        border-radius: 5px;
    }
    .selector-sale-type, 
    .selector-price,
    .selector-area,
    .selector-x {
        width: 125px;
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
</style>