const slideDeck = {
  state: {
    currentSlideIndex: 0,
    slides: [
      {
        title: 'Title Slide',
        subtitle: null,
        componentType: 'SimSlideWithAList',
        content: {
          items: [],
        },
      },
      {
        title: 'Selection Slide',
        subtitle: 'Limited User Set',
        componentType: 'SimSlideWithHTML',
        content:
          `<div>
            <h2>Big Stuff</h2>
            <p>For little guys.</p>
          </div>`,
      },
    ],
  },
  mutations: {
    appendASlide(state, slide = {}) {
      state.slides.push(slide)
    },
    setASlideAtIndex(state, slide) {
      state.slides.splice(slide.index, 1, slide.content)
    },
    setContentForTheSlideAtIndex(state, newSlide) {
      const slide = state.slides[newSlide.index]

      if (slide) {
        slide.content = Object.assign(slide.content, newSlide.content)
      }
    },
    updateCurrentSlideIndex(state, payload) {
      state.currentSlideIndex = payload
    },
    nextSlideIndex(state) {
      state.currentSlideIndex += 1
    },
    prevSlideIndex(state) {
      state.currentSlideIndex -= 1
    },
  },
  actions: {},
  getters: {
    currentSlide: (state) => () => {
      return state.slides[state.currentSlideIndex]
    },
  },
}

export default slideDeck
