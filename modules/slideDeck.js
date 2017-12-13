const slideDeck = {
  state: {
    currentSlideIndex: 0,
    currentSlideContent: {},
    slides: [
      {
        title: 'Title Slide',
        subtitle: null,
        componentType: 'SimSlide',
        content: {
          items: [
            { id: 1, name: 'Brian' },
            { id: 2, name: 'Dustin' },
            { id: 3, name: 'Jase' },
            { id: 4, name: 'Chad' },
            { id: 5, name: 'Rick' },
            { id: 6, name: 'Kaiti' },
            { id: 7, name: 'Eric' },
            { id: 8, name: 'Gary' },
            { id: 9, name: 'Mike' },
            { id: 10, name: 'Yaz' },
            { id: 11, name: 'Brian Deux' },
            { id: 12, name: 'Dustin Deux' },
            { id: 13, name: 'Jase Deux' },
            { id: 14, name: 'Chad Deux' },
            { id: 15, name: 'Rick Deux' },
            { id: 16, name: 'Kaiti Deux' },
            { id: 17, name: 'Eric Deux' },
            { id: 18, name: 'Gary Deus' },
            { id: 19, name: 'Mike Deux' },
            { id: 20, name: 'Yaz Deux' },
          ],
        },
      },
      {
        title: 'Selection Slide',
        subtitle: 'Limited User Set',
        componentType: 'SimSlide',
        content: {
          items: [
            { id: 11, name: 'Brian Deux' },
            { id: 12, name: 'Dustin Deux' },
            { id: 13, name: 'Jase Deux' },
            { id: 14, name: 'Chad Deux' },
            { id: 15, name: 'Rick Deux' },
            { id: 16, name: 'Kaiti Deux' },
            { id: 17, name: 'Eric Deux' },
            { id: 18, name: 'Gary Deus' },
            { id: 19, name: 'Mike Deux' },
            { id: 20, name: 'Yaz Deux' },
          ],
        },
      },
    ],
  },
  mutations: {
    appendASlide(state, slide = {}) {
      state.slides.push(slide)
    },
    setASlideAtIndex(state, slide) {
      state.slides[slide.index] = slide.content
    },
    setCurrentSlideContent(state, content) {
      state.currentSlideContent = content
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
  getters: {},
}

export default slideDeck
