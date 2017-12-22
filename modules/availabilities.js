const availabilities = {
  state: {
    last_updated: null,
    blocks: {},         // TODO: Rename to 'filtered' blocks. - Chad
    total_blocks: {},
  },
  mutations: {
    filterBlocks(state, filteredSelection) {
      // where duration > = filter.event length
      // where in (filter.facilities)
      // where in (filter.departments)
      // where in (filter.professionalTitles
      // where in (filter.instructors)
    },
    setAggregateAvailabilityBlocks(state, availabilityBlocks) {
      const date = availabilityBlocks.date

      if (state.last_updated !== date) {
        state.last_updated = date
      }

      state.blocks = availabilityBlocks.blocks
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
