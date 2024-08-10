import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.js";

import { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './App.vue';
import router from './router'
import axios from "axios";
axios.defaults.baseURL = "http://192.168.60.100:8080/";

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')