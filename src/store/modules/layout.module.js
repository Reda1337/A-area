export default {
  state: {
    navItem: 'Latest',
    requestPage: true,
    requestPopular: true,
    showVideo: true,
  },
  getters: {
    getNavItem (state) {
      return state.navItem
    },
    getRequestPage (state) {
      return state.requestPage
    },
    getPopularPage (state) {
      return state.requestPopular
    },
    getShowVideo(state) {
      return state.showVideo
    }
  },
  mutations: {
    SET_NAVITEM(state, payload) {
      state.navItem = payload.text
    },
    SET_REQUEST_PAGE(state, payload) {
      state.requestPage = payload.status
    },
    SET_POPULAR_REQUEST(state, payload) {
      state.requestPopular = payload.status
    },
    SET_SHOW_VIDEO(state, payload) {
      state.showVideo = payload.status
    }
  },
  actions: {
    updateNavItem({ commit }, payload) {
      commit('SET_NAVITEM', payload);
    },
    updateRequestPage({ commit }, payload) {
      commit('SET_REQUEST_PAG', payload)
    }
  }
}