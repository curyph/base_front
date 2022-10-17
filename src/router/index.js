import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import FarmMaps from '../views/FarmMaps'
import FarmDetail from '../components/FarmDetail'
import FarmResult from '../components/FarmResult'
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
    component: FarmMaps,
    children: [
      {
        path: 'farm-results',
        name: 'farm-results',
        component: FarmResult
      },
      {
        path: 'farm-details',
        name: 'farm-details',
        component: FarmDetail
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
