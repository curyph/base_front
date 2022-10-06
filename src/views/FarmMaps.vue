<template>
  <NavBar />
  <MapContainer />  
  <Sidebar />
  
</template>

<script>
// @ is an alias to /src
import MapContainer from "../components/MapContainer.vue"
import NavBar from "../components/NavBar.vue"
import Sidebar from "../components/Sidebar.vue"

export default {
    components: {
    MapContainer,
    NavBar,
    Sidebar
  }
}
</script>
