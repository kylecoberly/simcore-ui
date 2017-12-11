// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueHighlightJS from 'vue-highlightjs'

import App from './App'
import router from './router'
import common from './mixins'

Vue.config.productionTip = false

// helpers
Vue.use(Vuex)
Vue.use(VueHighlightJS)

window.moment = require('moment')

const dateFormatRaw = 'YYYY-MM-DD'
const dateFormatDisplay = 'dddd, MMMM Do'

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
    active_date: window.moment().format(dateFormatRaw),
    current_user_data: {
      events: {},
      availability: {
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
        '2017-12-05': [
          {
            start: 8.5,
            duration: 3.5,
          },
        ],
      },
    },
    slides: [
      {
        id: 1,
        step: 1,
        componentType: 'SimSlide',
        items: [
          { id: 1, name: 'Dustin' },
          { id: 2, name: 'Jase' },
          { id: 3, name: 'Chad' },
          { id: 4, name: 'Rick' },
          { id: 5, name: 'Kaiti' },
          { id: 6, name: 'Eric' },
        ],
      },
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
    currentSlideIndex: 0,
  },
  mutations: {
    updateCurrentSlideIndex(state, payload) {
      state.currentSlideIndex = payload
    },
    nextSlideIndex(state) {
      state.currentSlideIndex += 1
    },
    prevSlideIndex(state) {
      state.currentSlideIndex -= 1
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
