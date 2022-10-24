<template>
  <div class="btn-return">
            <img class="return-svg" src="../assets/icons/back-button-svgrepo-com.svg" alt="">
        </div>
        <div class="farm-details-container">
            <div class="farm-image">
                <img class="img-detail" @click="back" src="../assets/images/farm1.png" alt="">
            </div>            
            <div class="price">R$ 20.000.000</div>
            <div class="farm-name">Fazenda Piracicaba</div>
            <div class="flex-tags">
                <img src="../assets/icons/location-sign-svgrepo-com.svg" alt="">
                <p class="farm-city-state">Piracicaba - SP</p>
                <img src="../assets/icons/area-svgrepo-com.svg" alt="">
                <p class="farm-city-state">400.000 ha</p>
                <img src="../assets/icons/location-sign-svgrepo-com.svg" alt="">
                <p class="farm-city-state">Piracicaba - SP</p>
                <img src="../assets/icons/location-sign-svgrepo-com.svg" alt="">
                <p class="farm-city-state">1800 R$/ha</p>
            </div> 
        </div>   
        <div class="farm-details-container">
            <p class="container-title">Teste</p>
            <div class="flex-tags">
                <p>&#183; sdfs</p>
                <p>&#183; sdfs</p>
                <p>&#183; sdfs</p>
                <p>&#183; sdfs</p>
                <p>&#183; sdfs</p>
                <p>&#183; sdfs</p>                
            </div>
            <div class="flex-tags">
                <p>&#183; sdfs</p>
                <p>&#183; sdfs</p>
                <p>&#183; sdfs</p>
                <p>&#183; sdfs</p>
                <p>&#183; sdfs</p>
                <p>&#183; sdfs</p>
            </div>
        </div>
        <div class="farm-details-container">
            <p class="container-title">Teste</p>
            <div class="flex-tags">
                <p>&#183; sdfs</p>
                <p>&#183; sdfs</p>
                <p>&#183; sdfs</p>
                <p>&#183; sdfs</p>
                <p>&#183; sdfs</p>
                <p>&#183; sdfs</p>
            </div>
            <div class="flex-tags">
                <p>&#183; sdfs</p>
                <p>&#183; sdfs</p>
                <p>&#183; sdfs</p>
                <p>&#183; sdfs</p>
                <p>&#183; sdfs</p>
                <p>&#183; sdfs</p>                
            </div>
        </div>
        <div class="flex-btn-container">
            
            <button class="flex-btn">
                <img src="../assets/icons/trees-forest-svgrepo-com.svg" alt="" class="flex-btn-icon">
                <div class="desc-btn">
                    APP
                </div>
            </button>
            <button class="flex-btn">ABC</button>
            <button class="flex-btn">ABC</button>
        </div>
</template>

<script>
export default {
    data() {
            return {
                state: this.$route.params.state,
                city: this.$route.params.city,               
            }
        },
        methods: {
            back() {
                this.$router.go(-1)
            }
        }
        
}
</script>

<style>
    /* #app {
        text-align: left;
    } */

 .farm-details-container {        
        padding-top: 10px;
        padding-left: 10px;
        margin-bottom: 10px;
        background-color: white;
        
    }

    .img-detail {
        width: 530px;
        height: 271px;
        object-fit: cover;
        margin-bottom: 15px;
    }

    .price {
        padding-right: 10px;
        text-align: right;
    }
    .farm-name {
        font-size: 18px;
        text-align: left;
        margin-left: 15px;
        margin-bottom: 15px;
    }
    .flex-tags {
        display: flex;
        flex-direction: row;
        margin-left: 25px;
        

    }
    .flex-tags img {
        width: 20px;
    }

    .flex-tags p {
        margin: 0 0 0 0 ;
        width: 25%;  
        color: rgb(94, 94, 94); 
        font-size: 15px;    
        overflow: hidden;
        text-overflow: ellipsis;
        overflow-wrap: normal;
    }

    .container-title {
        font-size: 15px;
        margin-left: 15px;
        margin-bottom: 15px;
        text-align: left;
    }

    .btn-return {
        position: absolute;
        z-index: 2000;
        margin-top: 20px;
        margin-left: 10px;
        cursor: pointer;
    }

    .flex-btn-container {
        display: flex;
        flex-direction: row;      
        justify-content: space-between;
        padding: 0 30px 0 30px; 
    }
    .flex-btn {
        background-color: white;
        width: 60px;
        height: 60px;
        margin-top: 50px;        
        position: relative;
        border-width: 1px;
        border-color: white;
        border-radius: 8px;
    } 

    .flex-btn-icon {
        width: 30px;
    }

    /* .flex-btn:hover .tooltip {
        opacity: 1;
    } */

    .desc-btn {
        font-size: 12px;      
        opacity: 1;  
    }

    .return-svg {
        margin-left: 10px;
        width: 40px;
    }
</style>