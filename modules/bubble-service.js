export default {
  namespaced: true,
  state: {
    isOpen: false,
  },
  mutations: {
    setOpen(state, value) {
      console.log('bubble', value)
      state.isOpen = value
    },
  },
  actions: {
    setOpen({commit}, value) {
      commit('setOpen', value)
    },
  }
}
