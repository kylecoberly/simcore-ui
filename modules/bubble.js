const bubble = {
  state: {
    position: {},
    previous_position: {
      x: 3,
      orientation: 'left',
    },
    is_open: false,
  },
  mutations: {
    toggleBubbleVisibility(state, shouldBeVisible) {
      if (shouldBeVisible !== undefined) {
        state.is_open = shouldBeVisible
      } else {
        state.is_open = !state.is_open
      }
    },
    updateBubblePosition(state, position) {
      if (position.x > state.previous_position.x && position.x > 2) {
        position.orientation = 'right'
      } else if (position.x < state.previous_position.x && position.x < 6) {
        position.orientation = 'left'
      } else {
        position.orientation = state.previous_position.orientation
      }
      state.position = position
      state.previous_position = {
        x: position.x,
        orientation: position.orientation,
      }
    },
  },
  actions: {},
  getters: {},
}

export default bubble
