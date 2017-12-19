const bubble = {
  state: {
    properties: {},
    previous_data: {
      x: 3,
      orientation: 'left',
    },
    is_open: false,
  },
  mutations: {
    toggleBubbleVisibility(state, payload) {
      if (payload !== undefined) {
        state.is_open = payload
      } else {
        state.is_open = !state.is_open
      }
    },
    updateBubbleProperties(state, payload) {
      if (payload.x > state.previous_data.x && payload.x > 2) {
        payload.orientation = 'right'
      } else if (payload.x < state.previous_data.x && payload.x < 6) {
        payload.orientation = 'left'
      } else {
        payload.orientation = state.previous_data.orientation
      }
      state.properties = payload
      state.previous_data = {
        x: payload.x,
        orientation: payload.orientation,
      }
    },
  },
  actions: {},
  getters: {},
}

export default bubble
