const bubble = {
  state: {
    data: {},
    previous_data: {
      x: 3,
      orientation: 'left',
    },
    is_open: false,
  },
  mutations: {
    updateBubbleState(state, payload) {
      state.is_open = payload
    },
    updateBubbleData(state, payload) {
      if (payload.x > state.previous_data.x && payload.x > 2) {
        payload.orientation = 'right'
      } else if (payload.x < state.previous_data.x && payload.x < 6) {
        payload.orientation = 'left'
      } else {
        payload.orientation = state.previous_data.orientation
      }
      state.data = payload
      state.previous_data = {
        x: payload.x,
        orientation: payload.orientation,
      }
    },
  },
  actions: {},
  getters: {},
}

export default bubble;

