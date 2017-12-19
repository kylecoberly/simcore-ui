const availabilities = {
  state: {
    last_updated: null,
    blocks: {},
  },
  mutations: {
    setAggregateAvailabilityBlocks(state, availabilityBlocks) {
      const date = availabilityBlocks.date

      if (state.last_updated !== date) {
        state.last_updated = date
      }

      state.blocks = availabilityBlocks
    },
  },
  actions: {},
  getters: {
    getLastUpdatedAggregateAvailabilityBlocks: (state) => () => {
      return state.last_updated
    },
  },
}

export default availabilities
