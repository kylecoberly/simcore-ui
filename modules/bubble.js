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
      window.console.log('updateBubbleProperties', payload)
      if (payload.position.x > state.previous_data.x && payload.position.x > 2) {
        payload.position.orientation = 'right'
      } else if (payload.position.x < state.previous_data.x && payload.position.x < 6) {
        payload.position.orientation = 'left'
      } else {
        payload.position.orientation = state.previous_data.orientation
      }
      state.properties = payload
      state.previous_data = {
        x: payload.position.x,
        orientation: payload.position.orientation,
      }
    },
  },
  actions: {},
  getters: {},
}

export default bubble
