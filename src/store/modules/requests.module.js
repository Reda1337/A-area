import axios from 'axios'

const baseURL = "https://gogoanime.consumet.org/";


export default {
  state: {
    recentEpsiods: {},
    animeDetails: {},
    urls: {}
  },
  getters: {
    getLatestAnimeList(state) {
      return state.recentEpsiods
    },
    getAnimeDetails(state) {
      return state.animeDetails
    },
    getEpisodeUrls(state) {
      return state.urls
    }
  },
  mutations: {
    SAVE_RECENT_EPISODES (state, episodes) {
      state.recentEpsiods = episodes;
    },
    SAVE_ANIME_DETAILS (state, animeDetails) {
      state.animeDetails = animeDetails;
    },
    SAVE_EPISODE_URLS (state, urls) {
      state.urls = urls;
    },
    RESET_DETAILS (state) {
      this.animeDetails = {};
      this.urls = {};
    }
  },
  actions: {
    resetAnimeDetails ({ commit }) {
      commit("RESET_DETAILS");
    },
    async loadLatestEpisodes({ commit }) {
      await axios.get(baseURL + 'recent-release')
      .then(res => {
        commit("SAVE_RECENT_EPISODES", res.data)
      })
      .catch(err => {
        console.log(err);
      })
    },
    async loadAnimeDetails({ commit }, animeName) {
      return new Promise(async (resolve, reject) => {
        await axios.get(baseURL + "anime-details/" + animeName)
        .then(res => {
          commit("SAVE_ANIME_DETAILS", res.data)
          resolve(res.data)
        })
        .catch(err => {
          console.log(err);
          reject(err)
        })
      })
    },
    async loadAnimeWatchingUrls({ commit }, episodeId) {
      console.log("id : ", episodeId);
      await axios.get(baseURL + "vidcdn/watch/" + episodeId)
      .then(res => {
        commit("SAVE_EPISODE_URLS", res.data)
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
}