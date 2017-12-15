const slideDeck = {
  state: {
    slideTemplates: {}, // The pre-set templates to use.
    slideHistory: {
      size: 0,
      currentSlide: {},
      slides: [],       // The history of 'templates + content' which produces an individual slide.
    },
  },
  mutations: {
    resetHistory(state) {
      state.slideHistory = {
        size: 0,
        currentSlide: {},
        slides: [],
      }
    },
    setSlideTemplates(state, slideTemplates = {}) {
      state.slideTemplates = slideTemplates
    },
    setCurrentSlide(state, slide) {
      state.slideHistory.slides[state.slideHistory.size -1] = slide
      state.slideHistory.currentSlide = state.slideHistory.slides[state.slideHistory.size - 1]
    },
    addASlide(state, slide = {}) {
      state.slideHistory.slides.push(slide)

      state.slideHistory.size = state.slideHistory.slides.length
      state.slideHistory.currentSlide = state.slideHistory.slides[state.slideHistory.size - 1]
    },
    navigateToThePreviousSlide(state) {
      state.slideHistory.slides.pop()

      state.slideHistory.size = state.slideHistory.slides.length
      state.slideHistory.currentSlide = state.slideHistory.slides[state.slideHistory.size - 1]
    },
  },
  actions: {
  },
  getters: {
    currentSlide: (state) => () => {
      return state.slideHistory.currentSlide
    },
  },
}

export default slideDeck
