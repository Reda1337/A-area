import axios from "axios";

const baseURL = "https://gogoanime.consumet.org/";

export default {
  state: {
    recentEpsiods: [],
    animeDetails: {},
    urls: {},
  },
  getters: {
    getLatestAnimeList(state) {
      return state.recentEpsiods;
    },
    getAnimeDetails(state) {
      return state.animeDetails;
    },
    getEpisodeUrls(state) {
      return state.urls;
    },
  },
  mutations: {
    SAVE_RECENT_EPISODES(state, episodes) {
      if (!state.recentEpsiods.length) {
        state.recentEpsiods = episodes;
      } else {
        state.recentEpsiods = state.recentEpsiods.concat(episodes);
      }

      console.log(state.recentEpsiods);
    },
    SAVE_ANIME_DETAILS(state, animeDetails) {
      state.animeDetails = animeDetails;
    },
    SAVE_EPISODE_URLS(state, urls) {
      state.urls = urls;
    },
    RESET_DETAILS(state) {
      state.recentEpsiods = []
    },
  },
  actions: {
    async loadLatestEpisodes({ commit }, page) {
      console.log(baseURL + "recent-release?type=1:[" + page.toString());
      await axios
        .get(baseURL + "recent-release?type=1&page=" + page.toString())
        .then((res) => {
          commit("SAVE_RECENT_EPISODES", res.data);
          commit("SET_REQUEST_PAGE", { status: true });
        })
        .catch((err) => {
          commit("SET_REQUEST_PAGE", { status: true });
          console.log(err);
        });
    },
    async loadAnimeDetails({ commit }, animeName) {
      return new Promise(async (resolve, reject) => {
        await axios
          .get(baseURL + "anime-details/" + animeName)
          .then((res) => {
            commit("SAVE_ANIME_DETAILS", res.data);
            resolve(res.data);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    async loadAnimeWatchingUrls({ commit }, episodeId) {
      return new Promise(async (resolve, reject) => {
        await axios
          .get(baseURL + "vidcdn/watch/" + episodeId)
          .then((res) => {
            commit("SAVE_EPISODE_URLS", res.data);
            resolve(res.data);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
  },
};
