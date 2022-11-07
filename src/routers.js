import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import WatchAnime from './components/watchAnime.vue'
import Search from  './components/Animes.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/watch/:animeId/:episodeId',
    name: 'watch',
    component: WatchAnime
  },
  {
    path: '/watch/:tag',
    name: 'search',
    component: Search
  }
]

const router = createRouter({
  history: createWebHistory("http://localhost:5173/"),
  routes
})

export default router