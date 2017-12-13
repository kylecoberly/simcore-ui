const availabilities = {
  state: {
    last_updated: {},
    blocks: {},
    density_blocks: {
      '2017-12-12': [
        {
          percent: 100,
          start: 0,
          end: 6,
        },
        {
          percent: 35,
          start: 6,
          end: 12,
        },
        {
          percent: 65,
          start: 12,
          end: 18,
        },
        {
          percent: 10,
          start: 18,
          end: 24,
        },
      ],
    },
  },
  mutations: {
    setAllAvailabilityBlocks(state, availabilityBlocks) {
      state.last_updated = '12-10-17'

      state.blocks = availabilityBlocks
    },
    setAvailabilityBlocksForDay(state, availability) {
      const date = availability.date

      if (state.last_updated !== date) {
        state.last_updated = date
      }

      if (availability.blocks.length === 0) {
        delete state.blocks[date]
      } else {
        state.blocks[date] = Object.assign(availability.blocks, state.blocks)
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

export default availabilities
