const user = {
  state: {
    last_updated: {},
    availabilities: {},
    events: {},
  },
  mutations: {
    setAvailabilityBlocksForDay(state, availability) {
      const date = availability.date

      if (state.last_updated !== date) {
        state.last_updated = date
      }

      if (availability.blocks.length === 0) {
        delete state.availabilities[date]
      } else {
        state.availabilities[date] = Object.assign(availability.blocks, state.availabilities)
      }
    },
  },
  actions: {},
  getters: {
    getLastUpdated: (state) => () => {
      return state.last_updated
    },
  },
}

export default user
