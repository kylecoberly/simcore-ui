// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'

import moment from 'moment'
import VueHighlightJS from 'vue-highlightjs'

import App from './App'
import router from './router'
import common from './mixins'

Vue.config.productionTip = false

// helpers
Vue.use(Vuex)
Vue.use(VueHighlightJS)

const dateFormatRaw = 'YYYY-MM-DD'
const dateFormatDisplay = 'dddd, MMMM Do'

const slideAlphabetStart = {
  state: {
    componentType: 'SimSlide',
    title: 'None',
    subtitle: 'bot',
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
  actions: {
    setItems(items = []) {
      this.state.items = items
    },
  },
}

const slideDeck = {
  currentSlideIndex: 0,
  currentSlideContent: {},
  slides: [
    slideAlphabetStart.state,
    {
      id: 2,
      step: 2,
      componentType: 'SimSlide',
      title: 'Hey!',
      content: 'World',
    },
    {
      id: 3,
      step: 3,
      componentType: 'SimSlide',
      title: 'Hey!',
      subtitle: 'Check this out',
      content: 'World',
    },
  ],
}

const store = new Vuex.Store({
  state: {
    calendar_settings: {
      date_format: {
        raw: dateFormatRaw,
        display: dateFormatDisplay,
        month_name: 'MMMM',
        year: 'Y',
        month_short_day_ordinal: 'MMM Do',
      },
      day_names: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      weekend_days: [0, 6],
    },
    bubble_data: {},
    previous_bubble_data: {
      x: 3,
      orientation: 'left',
    },
    bubble_is_open: false,
    active_date: moment().format(dateFormatRaw),
    current_user_data: {
      events: {},
      availability: {
        last_updated: {},
        '2017-12-04': [
          {
            start: 8,
            duration: 3.5,
          },
          {
            start: 14,
            duration: 2.5,
          },
        ],
        '2017-12-07': [
          {
            start: 8.5,
            duration: 3.5,
          },
        ],
      },
      availability_density: {
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
    slideDeck,
  },
  mutations: {
    // TODO: Set these in a separate file. - Chad/Jase
    setCurrentSlideContent(state, content) {
      state.slideDeck.currentSlideContent = content
    },
    updateCurrentSlideIndex(state, payload) {
      state.slideDeck.currentSlideIndex = payload
    },
    nextSlideIndex(state) {
      state.slideDeck.currentSlideIndex += 1
    },
    prevSlideIndex(state) {
      state.slideDeck.currentSlideIndex -= 1
    },
    updateBubbleState(state, payload) {
      state.bubble_is_open = payload
    },
    updateBubbleData(state, payload) {
      if (payload.x > state.previous_bubble_data.x && payload.x > 2) {
        payload.orientation = 'right'
      } else if (payload.x < state.previous_bubble_data.x && payload.x < 6) {
        payload.orientation = 'left'
      } else {
        payload.orientation = state.previous_bubble_data.orientation
      }
      state.bubble_data = payload
      state.previous_bubble_data = {
        x: payload.x,
        orientation: payload.orientation,
      }
    },
    setActiveDate(state, date) {
      state.active_date = date
    },
    setAvailabilityBlocksForDay(state, availability) {
      const UserAvailability = state.current_user_data.availability
      const date = availability.date
      if (UserAvailability.last_updated !== date) {
        UserAvailability.last_updated = date
      }

      if (availability.blocks.length === 0) {
        delete UserAvailability[date]
      } else {
        UserAvailability[date] = Object.assign(availability.blocks, UserAvailability)
      }
    },
  },
  getters: {
    getLastUpdated: state => () => { return state.current_user_data.availability.last_updated },
    getActiveDate: (state) => () => { return state.active_date },
  },
})

/* eslint-disable no-new, import/prefer-default-export */
new Vue({
  el: '#app',
  router,
  mixins: [common],
  template: '<App/>',
  components: { App },
  store,
  methods: {
    toggleOverlay(callback) {
      this.$emit('toggle-overlay', callback)
    },
    openOverlay(callback) {
      this.$emit('open-overlay', callback)
    },
    closeOverlay(callback) {
      this.$emit('close-overlay', callback)
    },
    togglePanel(callback) {
      this.$emit('toggle-panel', callback)
    },
    openPanel(callback) {
      this.$emit('open-panel', callback)
    },
    closePanel(callback) {
      this.$emit('close-panel', callback)
    },
    toggleModal(callback) {
      this.$emit('toggle-modal', callback)
    },
    openModal(callback) {
      this.$emit('open-modal', callback)
    },
    closeModal(callback) {
      this.$emit('close-modal', callback)
    },
    closeBubble(callback) {
      this.$emit('close-bubble', callback)
    },
  },
})
