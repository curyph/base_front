import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import FarmMaps from '../views/FarmMaps'
//import MapContainer from '../components/MapContainer'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },  
  {
    path: '/map-searcher',
    name: 'map-searcher',
    component: FarmMaps
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
