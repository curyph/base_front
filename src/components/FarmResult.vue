<template>
    <!-- <router-link :to="{name: 'farm-details'}" aria-current="page" title="Detalhes"> -->
        <div class="farm-container" @click="loadFarms(farm.id)" v-for="farm in farm_area" :key="farm" :value="farm.id">                    
            <img src="../images/farm1.png" alt="" class="farm-thumbnail">
            <div class="farm-info">
                <div class="price">R$ 20.000.000</div>
                <div class="short">{{ farm.nome_fazenda }}</div>
                <div class="farm-attributes">
                    <img src="../images/location-sign-svgrepo-com.svg" alt="">
                    <p class="farm-city-state">Piracicaba-SP</p>
                    <img src="../images/area-svgrepo-com.svg" alt="">
                    <p class="farm-city-state">50.000 ha</p>
                </div>  
                <div class="farm-attributes">
                    <img src="../images/location-sign-svgrepo-com.svg" alt="">
                    <p class="farm-city-state">fsdfsdf</p>
                    <img src="../images/location-sign-svgrepo-com.svg" alt="">
                    <p class="farm-city-state">50.000 ha</p>
                </div>                     
            </div>                    
        </div>
    <!-- </router-link> -->
</template>

<script>

import { ref, inject } from "vue"
import load_intersections from "../resources/load_intersections"
import load_farms from "../resources/load_farms"

export default {
    data() {
        return {
            state_id: this.$route.params.state,
            city_id: this.$route.params.city,
            farm_area: []
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
        },
        loadFarms(id) {
            console.log(id)
        },
        searchFarms(state_id, city_id) {
            load_farms.get(state_id, city_id).then(
                result => {
                    this.farm_area = result.data
                    console.log(this.farm_area)
                }
            )
        }
    },
    mounted() {
        this.emitter = inject('emitter'),        
        this.searchFarms(this.state_id, this.city_id)
        
    },    
}
</script>

<style>
.farm-container {
        display: flex;
        flex-direction: row;
        flex: 1;
        padding-top: 10px;
        padding-left: 10px;
        margin-bottom: 10px;
        background-color: white;
        cursor: pointer;
        
    }

    .farm-info {
       padding-left: 20px;
       padding-right: 20px;
       padding-top: 15px;
       padding-bottom: 15px;
       flex: 1;
    }

    .farm-thumbnail {
        width: 150px;
        height: 150px;
        object-fit: cover;
    }    

    .price {
        color: green;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;        
    }

    .farm-attributes {
        display: flex;
        flex-direction: row;
        margin-bottom: 20px;
        
    }

    .farm-attributes p {
        margin: 0 50px 0 0 ;
        width: 35%;  
        color: rgb(94, 94, 94); 
        font-size: 15px;  
        text-align: left;  
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .short {
        margin-bottom: 20px;
        font-size: 17px;
        font-weight: bold;
    }

    .farm-attributes img {
        width: 20px;
    }    
</style>