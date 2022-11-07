export default {
  state: {
    show: false
  },
  getters: {
    getLoaderShow (state) {
      return state.show
    }
  },
  mutations: {
    SET_LOADER(state, data) {
      state.show = data.show
    }
  },
  actions: {
    DISPLAY_LOADER({ commit }, data) {
      commit('SET_LOADER', data);
    }
  }
}