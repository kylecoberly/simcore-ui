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
    // {
    //   id: 3,
    //   step: 3,
    //   componentType: 'SimSlide',
    //   title: 'Hey!',
    //   subtitle: 'Check this out',
    //   content: 'World',
    // },
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
    calendar_display_mode: 'month',
    bubble_meta_data: {},
    previous_bubble_meta_data: {
      x: 3,
      orientation: 'left',
    },
    bubble_is_open: false,
    active_date: moment().format(dateFormatRaw),
    current_user_data: {
      events: {
        '2017-12-12': [
          {
            start: 10,
            duration: 4.5,
          },
          {
            start: 15,
            duration: 1.5,
          },
        ],
        '2017-12-13': [
          {
            start: 9.5,
            duration: 3,
          },
        ],
      },
      availability: {
        last_updated: {},
        '2017-12-11': [
          {
            start: 8,
            duration: 3.5,
          },
          {
            start: 14,
            duration: 2.5,
          },
        ],
        '2017-12-13': [
          {
            start: 8.5,
            duration: 3.5,
          },
        ],
      },
      all_availability: {
        '2017-12-11': [
          {
            start: 2,
            duration: 10.5,
            user_ids: [1, 2, 4, 6, 7, 9, 10, 14, 16],
          },
          {
            start: 15,
            duration: 3.5,
            user_ids: [5, 13, 18, 20, 21, 23],
          },
        ],
        '2017-12-12': [
          {
            start: 8,
            duration: 3.5,
            user_ids: [1, 2, 4, 6, 7, 9, 10, 14, 16],
          },
          {
            start: 14,
            duration: 2.5,
            user_ids: [3, 4, 5, 7, 8, 11],
          },
        ],
        '2017-12-13': [
          {
            start: 8.5,
            duration: 3.5,
            user_ids: [5, 13, 18, 20, 21, 23],
          },
          {
            start: 13,
            duration: 4,
            user_ids: [6, 12, 17, 21, 22, 25],
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
        '2017-12-13': [
          {
            percent: 0,
            start: 0,
            end: 6,
          },
          {
            percent: 100,
            start: 6,
            end: 12,
          },
          {
            percent: 50,
            start: 12,
            end: 18,
          },
          {
            percent: 0,
            start: 18,
            end: 24,
          },
        ],
      },
    },
    slideDeck,
    users: [
      { id: 1, firstname: 'Chevy', lastname: 'Knee' },
      { id: 2, firstname: 'Penny', lastname: 'Chumley' },
      { id: 3, firstname: 'Lonee', lastname: 'Banasevich' },
      { id: 4, firstname: 'Phylys', lastname: 'Hewins' },
      { id: 5, firstname: 'Prescott', lastname: 'Clipston' },
      { id: 6, firstname: 'Rab', lastname: 'Le Pine' },
      { id: 7, firstname: 'Sansone', lastname: 'Peetermann' },
      { id: 8, firstname: 'Thedrick', lastname: 'Glassford' },
      { id: 9, firstname: 'Eadie', lastname: 'Ravel' },
      { id: 10, firstname: 'Allistir', lastname: 'Stride' },
      { id: 11, firstname: 'Brit', lastname: 'Boyen' },
      { id: 12, firstname: 'Alexio', lastname: 'O\'Cleary' },
      { id: 13, firstname: 'Eydie', lastname: 'Campany' },
      { id: 14, firstname: 'Alfie', lastname: 'Athy' },
      { id: 15, firstname: 'Red', lastname: 'Gwalter' },
      { id: 16, firstname: 'Linzy', lastname: 'Josifovitz' },
      { id: 17, firstname: 'Benjie', lastname: 'Niven' },
      { id: 18, firstname: 'Amata', lastname: 'Dilland' },
      { id: 19, firstname: 'Timmy', lastname: 'Lorrain' },
      { id: 20, firstname: 'Latrina', lastname: 'Cosley' },
      { id: 21, firstname: 'Issi', lastname: 'Udey' },
      { id: 22, firstname: 'Alden', lastname: 'Rooze' },
      { id: 23, firstname: 'Felecia', lastname: 'Dahlman' },
      { id: 24, firstname: 'Charleen', lastname: 'Cruikshank' },
      { id: 25, firstname: 'Sal', lastname: 'Mynett' },
    ],
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
    bubbleShouldBeOpen(state, payload) {
      state.bubble_is_open = payload
    },
    updateBubbleMetaData(state, payload) {
      if (payload.x > state.previous_bubble_meta_data.x && payload.x > 2) {
        payload.orientation = 'right'
      } else if (payload.x < state.previous_bubble_meta_data.x && payload.x < 6) {
        payload.orientation = 'left'
      } else {
        payload.orientation = state.previous_bubble_meta_data.orientation
      }
      state.bubble_meta_data = payload
      state.previous_bubble_meta_data = {
        x: payload.x,
        orientation: payload.orientation,
      }
    },
    setActiveDate(state, date) {
      state.active_date = date
    },
    setCalendarDisplayModeToWeek(state) {
      state.calendar_display_mode = 'week'
    },
    setCalendarDisplayModeToMonth(state) {
      state.calendar_display_mode = 'month'
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
