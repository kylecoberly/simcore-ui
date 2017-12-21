const events = {
  state: {
    last_updated_blocks: null,
    blocks: {},
    last_updated_pending_blocks: null,
    pendingBlocks: {},
  },
  mutations: {
    setAggregateEventBlocks(state, eventBlocks) {
      state.blocks = eventBlocks
    },
    setPendingEventBlocksForDay(state, event) {
      console.log(event)
      const date = event.date

      if (state.last_updated_pending_blocks !== date) {
        state.last_updated_pending_blocks = date
      }

      if (event.blocks.length === 0) {
        delete state.pendingBlocks[date]
      } else {
        state.pendingBlocks[date] = Object.assign(event.blocks, state.pendingBlocks)
      }
    },
  },
  actions: {},
  getters: {
    getLastUpdatedEventBlocks: (state) => () => {
      return state.last_updated_blocks
    },
    getLastUpdatedPendingEventBlocks: (state) => () => {
      return state.last_updated_pending_blocks
    },
  },
}

export default events
