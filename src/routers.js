import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import watchAnime from './components/watchAnime.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/watch/:animeId/:episodeId',
    name: 'watch',
    component: watchAnime
  }
]

const router = createRouter({
  history: createWebHistory("http://localhost:5173/"),
  routes
})

export default router