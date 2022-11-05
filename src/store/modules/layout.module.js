export default {
  state: {
    navItem: 'Latest'
  },
  getters: {
    getNavItem (state) {
      return state.navItem
    }
  },
  mutations: {
    SET_NAVITEM(state, payload) {
      state.navItem = payload.text
    }
  },
  actions: {
    updateNavItem({ commit }, payload) {
      commit('SET_NAVITEM', payload);
    }
  }
}