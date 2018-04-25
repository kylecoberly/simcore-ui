const bubble = {
  state: {
    position: {},
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
    updateBubblePosition(state, { domPosition, offset, shouldBeOpen = undefined }) {
      if (shouldBeOpen === true || !state.is_open) {
        state.is_open = true
      }

      const position = {}
      position.dinkY = domPosition.top + domPosition.height / 2
      position.dinkX = domPosition.left + domPosition.width / 2

      position.x = offset.x
      position.y = offset.y

      if (state.position && position.x > state.position.x && position.x > 2) {
        position.orientation = 'right'
      } else if (state.position && position.x < state.position.x && position.x < 6) {
        position.orientation = 'left'
      } else if (state.position.orientation) {
        position.orientation = state.position.orientation
      } else {
        position.orientation = 'right'
      }

      state.position = position
    },
  },
  actions: {},
  getters: {},
}

export default bubble
