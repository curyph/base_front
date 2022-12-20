<template>
  <router-link
    :to="{ name: 'farm-details', params: { state: state_id, city: city_id } }"
    aria-current="page"
    title="Detalhes"
  >
    <div v-if="farm_areas.length">
      <div
        class="farm-container"
        @click="loadFarms(farm)"
        v-for="farm in farm_areas"
        :key="farm"
        :value="farm"
      >
        <img src="../assets/images/farm1.png" alt="" class="farm-thumbnail" />
        <div class="farm-info">
          <div class="price">R$ 20.000.000</div>
          <div class="short">{{ farm.nome_fazenda }}</div>
          <div class="farm-attributes">
            <img src="../assets/icons/location-sign-svgrepo-com.svg" alt="" />
            <p class="farm-city-state">Piracicaba-SP</p>
            <img src="../assets/icons/area-svgrepo-com.svg" alt="" />
            <p class="farm-city-state">50.000 ha</p>
          </div>
          <div class="farm-attributes">
            <img src="../assets/icons/location-sign-svgrepo-com.svg" alt="" />
            <p class="farm-city-state">fsdfsdf</p>
            <img src="../assets/icons/location-sign-svgrepo-com.svg" alt="" />
            <p class="farm-city-state">50.000 ha</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>Area não encontrada</div>
  </router-link>
</template>

<script>
import { ref, inject } from "vue";
import load_intersections from "../resources/load_intersections";
import load_farms from "../resources/load_farms";

export default {
  data() {
    return {
      state_id: this.$route.params.state,
      city_id: this.$route.params.city,
      farm_areas: [],
    };
  },
  methods: {
    loadIntersections() {
      load_intersections.get().then((result) => {
        this.farm_intersection = result.data;
        this.emitter.emit("load_reserve", this.farm_intersection);
      });
    },
    loadFarms(farm) {
      this.emitter.emit("load_areas", farm);
      this.emitter.emit("testing", farm);
    },
    searchFarms(state_id, city_id) {
      var abc = {
        "Teste1": "Pedro",
        "Teste2": "Jose"
      }
      load_farms.get(state_id, city_id).then((result) => {
        this.farm_areas = result.data;
      });
    },
    bind_params(state, city) {
      this.state_id = state;
      this.city_id = city;
    },
  },
  mounted() {
    this.emitter = inject("emitter");
    this.searchFarms(this.state_id, this.city_id);
  },

  beforeRouteEnter(to, from, next) {
    // if (from.path === '')
    if (from.path === "/map-searcher") {
      next();
    } else {
      next((vm) => {
        //this.state_id = from.params.state
        //this.city_id = from.params.state
        vm.bind_params(to.params.state, to.params.city);
        vm.searchFarms(to.params.state, to.params.city);
      });
    }
  },

  beforeRouteUpdate(to, from, next) {
    this.searchFarms(to.params.state, to.params.city);
    next();
  },
  // created() {
  //     this.$watch(
  //     () => this.$route.params,
  //         (toParams, previousParams) => {
  //             this.searchFarms(toParams.state, toParams.city)
  //         }
  //     )
  // },
  watch: {},
};
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
  margin: 0 50px 0 0;
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