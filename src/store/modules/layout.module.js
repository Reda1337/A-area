export default {
  state: {
    navItem: 'Latest',
    requestPage: true,
  },
  getters: {
    getNavItem (state) {
      return state.navItem
    },
    getRequestPage (state) {
      return state.requestPage
    }
  },
  mutations: {
    SET_NAVITEM(state, payload) {
      state.navItem = payload.text
    },
    SET_REQUEST_PAGE(state, payload) {
      state.requestPage = payload.status
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