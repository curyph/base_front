import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css" 
import mitt from 'mitt'
const emitter = mitt();

const app = createApp(App)
//app.config.globalProperties.eventBus = emitter
app.provide('emitter', emitter);
app.use(store).use(router).mount('#app')
//createApp(App).use(store).use(router).mount('#app')