import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"


import { createApp } from "vue";
import App from "./App.vue";
import { store } from './store'

// window.axios=require('axios');


const vueAPP = createApp(App);
vueAPP.use(store);

vueAPP.mount("#app");


