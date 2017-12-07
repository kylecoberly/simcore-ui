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

const _dateFormatRaw = 'YYYY-MM-DD'
const _dateFormatDisplay = 'dddd, MMMM Do'

const store = new Vuex.Store({
  state: {
    calendar_settings: {
      date_format: {
        raw: _dateFormatRaw,
        display: _dateFormatDisplay,
        month_name: 'MMMM',
        year: 'Y',
        month_short_day_ordinal: 'MMM Do',
      },
      day_names: ['Sun', 'Mon','Tue','Wed','Thu','Fri','Sat'],
      weekend_days: [0,6],
    },
    active_date: moment().format(_dateFormatRaw),
    current_user_data: {
      events: {},
      availability: {
        '2017-12-04': [
          {
            start: 8,
            duration: 3.5
          },
          {
            start: 14,
            duration: 2.5
          }
        ],
        '2017-12-05': [
          {
            start: 8.5,
            duration: 3.5
          },
        ],
      },
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
  },
})
