<template>
  <div class="navbar-test">        
        <div class="logo">
            Logo
        </div>  
        <div class="middle">
            <div class="flex-selectors">
                <div class="navbar-options">
                    <select v-model="state_selected" class="main-selectors">
                        <option v-for="state in br_states" :value="state.state" :key="state">
                            {{ state.state }}
                        </option>
                    </select>
                    <select v-model="city_selected" class="main-selectors">
                        <option v-for="city in br_cities" :value="city.city" :key="city">
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
                <button>Search</button>
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