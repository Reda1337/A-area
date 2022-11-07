import axios from "axios";

const baseURL = "https://gogoanime.consumet.org/";

export default {
  state: {
    recentEpsiods: [],
    animeDetails: {},
    popularAnime: {},
    urls: {},
    searchList: {}
  },
  getters: {
    getLatestAnimeList(state) {
      return state.recentEpsiods;
    },
    getPopularAnime(state) {
      return state.popularAnime;
    },
    getAnimeDetails(state) {
      return state.animeDetails;
    },
    getEpisodeUrls(state) {
      return state.urls;
    },
    getSearchList(state) {
      return state.searchList;
    }
  },
  mutations: {
    SAVE_RECENT_EPISODES(state, episodes) {
      if (!state.recentEpsiods.length) {
        state.recentEpsiods = episodes;
      } else {
        state.recentEpsiods = state.recentEpsiods.concat(episodes);
      }
    },
    SAVE_POPULAR_ANIME(state, animes) {
      if (!state.popularAnime.length) {
        state.popularAnime = animes;
      } else {
        state.popularAnime = state.popularAnime.concat(animes);
      }
    },
    SAVE_SEARCH_LIST(state, searchList) {
      if (!state.searchList.length) {
        state.searchList = searchList;
      } else {
        state.searchList = state.searchList.concat(searchList);
      }
    },
    SAVE_ANIME_DETAILS(state, animeDetails) {
      state.animeDetails = animeDetails;
    },
    SAVE_EPISODE_URLS(state, urls) {
      state.urls = urls;
    },
    RESET_DETAILS(state) {
      state.recentEpsiods = [];
      state.popularAnime = [];
    },
    RESET_SEARCH(state) {
      state.searchList = [];
    },
  },
  actions: {
    async loadLatestEpisodes({ commit }, page) {
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
      commit("SET_SHOW_VIDEO", {status: true});
      return new Promise(async (resolve, reject) => {
        await axios
          .get(baseURL + "vidcdn/watch/" + episodeId)
          .then((res) => {
            commit("SAVE_EPISODE_URLS", res.data);
            if (res.data.sources === undefined)
              commit("SET_SHOW_VIDEO", {status: false});
            resolve(res.data);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    async loadPopularAnime({ commit }, page) {
      await axios
        .get(baseURL + "popular?page=" + page.toString())
        .then((res) => {
          commit("SAVE_POPULAR_ANIME", res.data);
          commit("SET_POPULAR_REQUEST", { status: true });
        })
        .catch((err) => {
          commit("SET_POPULAR_REQUEST", { status: true });
          console.log(err);
        });
    },
    async searchTag({ commit }, payload) {
      await axios
        .get(baseURL + "search?keyw=" + payload.tag + '&page=' + payload.index)
        .then((res) => {
          commit("SAVE_SEARCH_LIST", res.data);
          commit("SET_REQUEST_PAGE", { status: true });
        })
        .catch((err) => {
          commit("SET_REQUEST_PAGE", { status: true });
          console.log(err);
        });
    }
  },
};
