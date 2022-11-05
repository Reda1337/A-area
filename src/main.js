import { createApp } from 'vue'

import './style.css';

import mdiVue from "mdi-vue/v3";

import * as mdijs from "@mdi/js";

import router from './routers.js'

// Create a new store instance.

import store from './store'
import App from './App.vue'
import Vue3VideoPlayer from '@cloudgeek/vue3-video-player'
import '@cloudgeek/vue3-video-player/dist/vue3-video-player.css'


const app = createApp(App).use(mdiVue, {icons:mdijs}).use(store).use(Vue3VideoPlayer).use(router)
app.mount('#app')